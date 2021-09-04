import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import Chat from "../components/Chat";
import { normalize } from "../components/DefaultText";

const MessagesScreen = (props) => {
  const [userId, setUserId] = useState();
  const [chats, setChats] = useState([]);

  // get locally stored userId
  useEffect(() => {
    async function load() {
      const uid = await AsyncStorage.getItem("userId");
      setUserId(uid);
      await updateChats(uid);
    }
    load();
    setRefreshing(false);
  }, []);

  // state for refreshing
  const [refreshing, setRefreshing] = useState(true);

  const updateChats = async (uid) => {
    setRefreshing(true);
    let y = [];
    firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", uid)
      .orderBy("lasttime", "desc")
      .onSnapshot((querySnapshot) => {
        y = [];
        querySnapshot.forEach((doc) => {
          let ob = {
            mostRecentMessage: doc.get("lastmessage"),
            userIds: doc.get("users"),
          };
          y.push(ob);
        });
        setChats(y);
      });
    setRefreshing(false);
  };

  const renderChat = (itemData) => {
    let postUserId;
    if (userId == itemData.item.userIds[0]) {
      postUserId = itemData.item.userIds[1];
    } else {
      postUserId = itemData.item.userIds[0];
    }

    return (
      <Chat
        postUserId={postUserId}
        recentMessage={itemData.item.mostRecentMessage.text}
        timestamp={timeDifference(
          new Date(),
          itemData.item.mostRecentMessage.createdAt
        )}
        onSelectChat={() => {
          props.navigation.navigate({
            routeName: "Chat",
            params: {
              currUserId: userId,
              postUserId: postUserId,
            },
          });
        }}
      />
    );
  };

  function timeDifference(current, previous) {
    var previous = previous.toDate();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerWeek = msPerDay * 7;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + "s";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + "m";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + "h";
    } else if (elapsed < msPerWeek) {
      return Math.round(elapsed / msPerDay) + "d";
    } else {
      return Math.round(elapsed / msPerWeek) + "w";
    }
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => await updateChats(userId)}
          tintColor={"white"}
        />
      }
      data={chats}
      keyExtractor={(item) => item.mostRecentMessage._id}
      renderItem={renderChat}
      style={{
        width: Dimensions.get("window").width,
        padding: normalize(15, "width"),
      }}
    />
  );
};

MessagesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Messages",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessagesScreen;
