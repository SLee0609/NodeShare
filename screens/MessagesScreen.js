import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";

import Chat from "../components/Chat";
import { DefaultText, normalize } from "../components/DefaultText";
import { enterChatScreen, exitChatScreen } from "../functions/notifications";

const MessagesScreen = (props) => {
  const [userId, setUserId] = useState();
  const [chats, setChats] = useState([]);

  // state for refreshing
  const [refreshing, setRefreshing] = useState(true);

  const [firstRender, setFirstRender] = useState(true);

  // get locally stored userId
  useEffect(() => {
    async function load() {
      const uid = await AsyncStorage.getItem("userId");
      setUserId(uid);
      updateChats(uid);
    }

    // listener to unfocus the chat screen
    let focusListener = props.navigation.addListener("didFocus", () => {
      exitChatScreen();
      AsyncStorage.setItem("focusedUser", "");
    });

    load();
  }, []);

  const updateChats = (uid) => {
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
            readed: doc.get("readed"),
          };
          y.push(ob);
        });
        setChats(y);
        setRefreshing(false);
        setFirstRender(false);
      });
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
        readed={itemData.item.readed.includes(userId)}
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

  return chats.length != 0 || firstRender ? (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => updateChats(userId)}
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
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => updateChats(userId)}
          tintColor={"white"}
        />
      }
    >
      <View style={styles.textContainer}>
        <DefaultText style={styles.text}>No Messages Yet</DefaultText>
        <DefaultText style={styles.text2}>
          Initialize Conversations through Posts!
        </DefaultText>
      </View>
    </ScrollView>
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
  textContainer: {
    height: normalize(470, "height"),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontFamily: "open-sans-bold",
    color: "white",
    textAlign: "center",
  },
  text2: {
    marginTop: normalize(20, "height"),
    fontSize: 16,
    fontFamily: "open-sans",
    color: "white",
    textAlign: "center",
  },
});

export default MessagesScreen;
