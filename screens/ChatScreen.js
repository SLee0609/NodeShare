import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { firebase } from "../firebase/config";
import { getUserData } from "../functions/io";

const ChatScreen = (props) => {
  let testParam = props.navigation.dangerouslyGetParent().getParam("testKey");
  let idinfo = props.navigation.dangerouslyGetParent().getParam("idinfo");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: getUserData(idinfo).profilePicture,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: firebase.auth?.currentUser?.email,
        name: firebase.auth?.currentUser?.displayName,
        avatar: firebase.auth?.currentUser?.photoURL,
      }}
    />
  );
};

ChatScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Chat",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
