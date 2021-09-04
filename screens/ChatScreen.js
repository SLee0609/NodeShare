import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  GiftedChat,
  InputToolbar,
  Avatar,
  Day,
  Bubble,
  Message,
  MessageText,
  Time,
  Send,
  Composer,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "../constants/Colors";
import { normalize } from "../components/DefaultText";
import { getUserData } from "../functions/io";
import { storeMessage } from "../functions/chatio";
import { Alert } from "react-native";
import firebase from "firebase/app";

const ChatScreen = (props) => {
  const insets = useSafeAreaInsets();

  let currUserId = props.navigation
    .dangerouslyGetParent()
    .getParam("currUserId");
  let postUserId = props.navigation
    .dangerouslyGetParent()
    .getParam("postUserId");

  const [messages, setMessages] = useState([]);
  const [currUser, setCurrUser] = useState();
  const [postUser, setPostUser] = useState();

  useEffect(() => {
    async function load() {
      let cUser = await getUserData(currUserId);
      let pUser = await getUserData(postUserId);
      let chatId = "";
      if (currUserId < postUserId) {
        chatId = currUserId + postUserId;
      } else {
        chatId = postUserId + currUserId;
      }
      setCurrUser(cUser);
      setPostUser(pUser);
      const unsubscribe = firebase
        .firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            }))
          )
        );
      return unsubscribe;
    }

    return load();
  }, []);

  const onSend = useCallback((messages = []) => {
    let chatId = "";
    if (currUserId < postUserId) {
      chatId = currUserId + postUserId;
    } else {
      chatId = postUserId + currUserId;
    }
    for (const message of messages) {
      storeMessage(chatId, currUserId, postUserId, message);
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  if (currUser == null) {
    return null;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: currUserId,
        name: currUser.firstname + " " + currUser.lastname,
        avatar:
          currUser.profilePicture != null
            ? currUser.profilePicture
            : require("../assets/defaultprofilepicture.png"),
      }}
      bottomOffset={insets.bottom}
      showUserAvatar={false}
      minInputToolbarHeight={normalize(60, "height")}
      renderMessage={(props) => (
        <Message
          {...props}
          containerStyle={{
            left: { marginLeft: normalize(10, "width") },
            right: { marginRight: normalize(10, "width") },
          }}
        />
      )}
      renderMessageText={(props) => (
        <MessageText
          {...props}
          textStyle={{
            left: styles.messageText,
            right: styles.messageText,
          }}
        />
      )}
      renderTime={(props) => (
        <Time
          {...props}
          containerStyle={{
            left: styles.timeContainer,
            right: styles.timeContainer,
          }}
          timeTextStyle={{
            left: { fontSize: normalize(10, "height") },
            right: { fontSize: normalize(10, "height") },
          }}
        />
      )}
      renderDay={(props) => (
        <Day
          {...props}
          textStyle={{ fontSize: normalize(12, "height"), fontWeight: "bold" }}
          containerStyle={{
            marginTop: normalize(5, "height"),
            marginBottom: normalize(10, "height"),
          }}
        />
      )}
      renderBubble={(props) => (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              borderRadius: normalize(15, "height"),
              backgroundColor: Colors.darkGray,
              marginRight: normalize(60, "width"),
              minHeight: normalize(20, "height"),
            },
            right: {
              borderRadius: normalize(15, "height"),
              backgroundColor: Colors.darkBlue,
              minHeight: normalize(20, "height"),
            },
          }}
          usernameStyle={{
            marginLeft: normalize(10, "width") - 10,
            top: normalize(-2, "height"),
            fontSize: normalize(12, "height"),
          }}
        />
      )}
      renderAvatar={(props) => (
        <Avatar
          {...props}
          imageStyle={{ left: styles.avatarImage, right: styles.avatarImage }}
          containerStyle={{
            left: { marginRight: normalize(8, "width") },
            right: { marginLeft: normalize(8, "width") },
          }}
        />
      )}
      renderSend={(props) => (
        <Send
          {...props}
          containerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          textStyle={{
            fontSize: normalize(17, "height"),
            marginLeft: 0,
            marginRight: normalize(10, "width"),
            marginBottom: 0,
          }}
        />
      )}
      renderInputToolbar={(props) => (
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbarContainer}
          primaryStyle={{ alignItems: "center" }}
        />
      )}
      renderComposer={(props) => (
        <Composer
          {...props}
          onInputSizeChanged={(size) => {
            size.height = size.height + normalize(25, "height");
            props.onInputSizeChanged(size);
          }}
        />
      )}
      minComposerHeight={normalize(40, "height")}
      maxComposerHeight={normalize(200, "height")}
      textInputStyle={styles.textInput}
      showAvatarForEveryMessage={false}
      listViewProps={{
        keyboardDismissMode: "on-drag",
        keyboardShouldPersistTaps: "never",
      }}
      renderUsernameOnMessage={true}
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
  timeContainer: {
    marginLeft: normalize(10, "width"),
    marginRight: normalize(10, "width"),
    marginBottom: normalize(5, "height"),
  },
  avatarImage: {
    height: normalize(46, "height"),
    width: normalize(46, "height"),
    borderRadius: normalize(23, "height"),
  },
  inputToolbarContainer: {
    backgroundColor: "black",
    borderTopWidth: 0,
    minHeight: normalize(60, "height"),
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    color: "white",
    fontSize: normalize(16, "height"),
    backgroundColor: Colors.darkGray,
    lineHeight: normalize(16, "height"),
    borderRadius: normalize(10, "width"),
    marginLeft: normalize(10, "width"),
    marginRight: normalize(10, "width"),
    paddingLeft: normalize(10, "width"),
    paddingRight: normalize(10, "width"),
    paddingTop: Platform.OS == "ios" ? normalize(12, "height") : 0,
    paddingBottom: Platform.OS == "ios" ? normalize(10, "height") : 0,
    marginTop: normalize(10, "height"),
    marginBottom: normalize(10, "height"),
  },
  messageText: {
    fontSize: normalize(16, "height"),
    lineHeight: normalize(20, "height"),
    marginTop: normalize(5, "height"),
    marginBottom: normalize(5, "height"),
    marginLeft: normalize(10, "width"),
    marginRight: normalize(10, "width"),
    color: "white",
  },
});

export default ChatScreen;
