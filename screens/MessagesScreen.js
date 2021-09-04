import React, { useState, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Chat from "../components/Chat";
import { normalize } from "../components/DefaultText";

const chats = [
  {
    mostRecentMessage: {
      _id: "lkajsdflkasjdflkjasdf",
      createdAt: new Date(),
      text: "Do you want to go play ball rn?",
      user: {
        _id: "flfkfeoklkal",
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/lclink.appspot.com/o/users%2FAzzRjDFEPXdyiLgL5jgs8hufXu93%2Fprofilepic.jpg?alt=media&token=b6681526-c15c-480e-922b-c8781f622954",
        name: "Derek Yuan",
      },
    },
    userIds: ["sYPfH2Dgj0Mtmm4WW06DnPK0AeE3", "AzzRjDFEPXdyiLgL5jgs8hufXu93"],
  },
  {
    mostRecentMessage: {
      _id: "lkajsdflkasjdflkjasdf2",
      createdAt: new Date(),
      text: "Let's go",
      user: {
        _id: "flfkfeoklkal",
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/lclink.appspot.com/o/users%2FAzzRjDFEPXdyiLgL5jgs8hufXu93%2Fprofilepic.jpg?alt=media&token=b6681526-c15c-480e-922b-c8781f622954",
        name: "Derek Yuan",
      },
    },
    userIds: ["eKZOZS1ZhZhjq5DPHCh38279LPy2", "sYPfH2Dgj0Mtmm4WW06DnPK0AeE3"],
  },
];

const MessagesScreen = (props) => {
  const [userId, setUserId] = useState();

  // get locally stored userId
  useEffect(() => {
    updateChats();
    async function load() {
      setUserId(await AsyncStorage.getItem("userId"));
    }
    load();
    setRefreshing(false);
  }, []);

  // state for current time
  const [currTime, setCurrTime] = useState();

  // state for refreshing
  const [refreshing, setRefreshing] = useState(true);

  const updateChats = () => {
    setRefreshing(true);
    setCurrTime(new Date());
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
          currTime,
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
          onRefresh={updateChats}
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
