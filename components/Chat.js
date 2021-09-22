import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { DefaultText, normalize } from "../components/DefaultText";
import ProfilePic from "../components/ProfilePicture";
import { getUserData } from "../functions/io";
import Colors from "../constants/Colors";

const Chat = (props) => {
  const [postUser, setPostUser] = useState();

  useEffect(() => {
    async function load() {
      setPostUser(await getUserData(props.postUserId));
    }
    load();
  }, [props]);

  return (
    <View style={styles.chat}>
      <TouchableOpacity style={styles.touchable} onPress={props.onSelectChat}>
        <ProfilePic
          imgUrl={postUser == null ? null : postUser.profilePicture}
          width={normalize(60, "width")}
          height={normalize(60, "width")}
        />
        <View style={styles.textContainer}>
          <DefaultText style={props.readed ? styles.name : styles.nameBolded}>
            {postUser == null
              ? null
              : postUser.firstname + " " + postUser.lastname}
          </DefaultText>
          <View
            style={{
              flexDirection: "row",
              width: "85%",
            }}
          >
            <DefaultText
              style={props.readed ? styles.message : styles.messageBolded}
              numberOfLines={1}
            >
              {props.recentMessage}
            </DefaultText>
            <DefaultText style={styles.message}>
              {"  ·  " + props.timestamp}
            </DefaultText>
          </View>
        </View>

        {props.readed ? null : (
          <View
            style={{
              justifyContent: "center",
              paddingLeft: normalize(15, "width"),
            }}
          >
            <FontAwesome5
              name="dot-circle"
              size={normalize(20, "width")}
              color={Colors.brightBlue}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    width: "100%",
  },
  touchable: {
    flexDirection: "row",
    paddingVertical: normalize(15, "height"),
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    marginLeft: normalize(15, "width"),
  },
  name: {
    fontSize: 16,
    color: "white",
  },
  nameBolded: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  message: {
    fontSize: 14,
    color: "gray",
  },
  messageBolded: {
    fontSize: 14,
    fontFamily: "open-sans-bold",
    color: "white",
  },
});

export default Chat;
