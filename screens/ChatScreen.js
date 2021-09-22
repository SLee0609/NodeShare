import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
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
import dayjs from "dayjs";

import Colors from "../constants/Colors";
import { DefaultText, normalize } from "../components/DefaultText";
import { getUserData } from "../functions/io";
import { storeMessage } from "../functions/chatio";
import firebase from "firebase/app";
import ProfilePic from "../components/ProfilePicture";

const ChatScreen = (props) => {
  const insets = useSafeAreaInsets();

  let currUserId =
    props.navigation.getParam("currUserId") == null
      ? props.navigation.dangerouslyGetParent().getParam("currUserId")
      : props.navigation.getParam("currUserId");
  let postUserId =
    props.navigation.getParam("postUserId") == null
      ? props.navigation.dangerouslyGetParent().getParam("postUserId")
      : props.navigation.getParam("postUserId");

  const [messages, setMessages] = useState([]);
  const [currUser, setCurrUser] = useState();
  const [postUser, setPostUser] = useState();


  useEffect(() => {
    let chatId = "";
    if (currUserId < postUserId) {
      chatId = currUserId + postUserId;
    } else {
      chatId = postUserId + currUserId;
    }
    function load() {
      async function loadUser() {
        let cUser = await getUserData(currUserId);
        let pUser = await getUserData(postUserId);
        setCurrUser(cUser);
        setPostUser(pUser);
        // const chatref = firebase.firestore().collection("chats").doc(chatId);
        // await chatref.get().then((docSnapshot) => {
        //   if (docSnapshot.exists) {
        //     chatref.update({
        //       readed: firebase.firestore.FieldValue.arrayUnion(currUserId),
        //     });
        //   }
        // });
      }
      loadUser();
      const unsubscribe = firebase
        .firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot(async (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            }))
          );
          const chatref = firebase.firestore().collection("chats").doc(chatId);
          await chatref.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
              chatref.update({
                readed: firebase.firestore.FieldValue.arrayUnion(currUserId),
              });
            }
          });
        });
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

  // Function called when view profile button is pressed
  const onViewProfilePressed = () => {
    props.navigation.navigate({
      routeName: "Profile",
      params: {
        profileUserId: postUserId,
      },
    });
  };

  function isSameDay(currentMessage, diffMessage) {
    if (!diffMessage || !diffMessage.createdAt) {
      return false;
    }
    const currentCreatedAt = dayjs(currentMessage.createdAt);
    const diffCreatedAt = dayjs(diffMessage.createdAt);
    if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
      return false;
    }
    return currentCreatedAt.isSame(diffCreatedAt, "day");
  }
  function isSameUser(currentMessage, diffMessage) {
    return !!(
      diffMessage &&
      diffMessage.user &&
      currentMessage.user &&
      diffMessage.user._id === currentMessage.user._id
    );
  }

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
      renderMessage={(props) => {
        const {
          renderAvatarOnTop,
          showAvatarForEveryMessage,
          currentMessage,
          previousMessage,
          nextMessage,
        } = props;
        const messageToCompare = renderAvatarOnTop
          ? previousMessage
          : nextMessage;
        if (
          !showAvatarForEveryMessage &&
          currentMessage &&
          messageToCompare &&
          isSameUser(currentMessage, messageToCompare) &&
          isSameDay(currentMessage, messageToCompare)
        ) {
          return (
            <Message
              {...props}
              containerStyle={{
                left: { marginLeft: normalize(28, "width") },
                right: { marginRight: normalize(10, "width") },
              }}
            />
          );
        } else {
          return (
            <Message
              {...props}
              containerStyle={{
                left: { marginLeft: normalize(10, "width") },
                right: { marginRight: normalize(10, "width") },
              }}
            />
          );
        }
      }}
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
          textStyle={{
            fontSize: normalize(12, "height"),
            fontWeight: "bold",
          }}
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
      renderAvatar={(props) => {
        return (
          <Avatar
            {...props}
            imageStyle={{ left: styles.avatarImage, right: styles.avatarImage }}
            containerStyle={{
              left: { marginRight: normalize(8, "width") },
              right: { marginLeft: normalize(8, "width") },
            }}
          />
        );
      }}
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
      onPressAvatar={onViewProfilePressed}
      listViewProps={{
        keyboardDismissMode: "on-drag",
        keyboardShouldPersistTaps: "never",
        ListFooterComponentStyle: { flex: 1 },
        ListFooterComponent: (
          <View style={styles.headerContainer}>
            <ProfilePic
              imgUrl={postUser == null ? null : postUser.profilePicture}
              width={normalize(100, "width")}
              height={normalize(100, "width")}
            />
            <View style={styles.postUserNameContainer}>
              <DefaultText style={styles.postUserNameText}>
                {postUser == null
                  ? null
                  : postUser.firstname + " " + postUser.lastname}
              </DefaultText>
            </View>
            <DefaultText style={styles.postUserEmailText}>
              {postUser == null ? null : postUser.email}
            </DefaultText>
            <TouchableOpacity onPress={onViewProfilePressed}>
              <View style={styles.viewProfileButton}>
                <DefaultText style={styles.viewProfileText}>
                  View Profile
                </DefaultText>
              </View>
            </TouchableOpacity>
          </View>
        ),
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
  headerContainer: {
    paddingVertical: normalize(30, "height"),
    alignItems: "center",
  },
  postUserNameContainer: {
    paddingTop: normalize(10, "height"),
    paddingBottom: normalize(5, "height"),
  },
  postUserNameText: {
    color: "white",
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
  postUserEmailText: {
    color: "gray",
    fontSize: 16,
  },
  viewProfileButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    paddingVertical: normalize(4, "height"),
    paddingHorizontal: normalize(6, "width"),
    marginTop: normalize(15, "height"),
    borderWidth: normalize(1, "width"),
    borderRadius: normalize(5, "width"),
  },
  viewProfileText: {
    fontSize: 12,
    fontFamily: "open-sans-bold",
    color: "white",
  },
});

export default ChatScreen;
