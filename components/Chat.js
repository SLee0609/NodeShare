import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { DefaultText, normalize } from "../components/DefaultText";
import ProfilePic from "../components/ProfilePicture";
import { getUserData } from "../functions/io";

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
          <DefaultText style={styles.name}>
            {postUser == null
              ? null
              : postUser.firstname + " " + postUser.lastname}
          </DefaultText>
          <View
            style={{
              flexDirection: "row",
              paddingRight: normalize(30, "width"),
            }}
          >
            <DefaultText style={styles.message} numberOfLines={1}>
              {props.recentMessage}
            </DefaultText>
            <DefaultText style={styles.message}>
              {"  ·  " + props.timestamp}
            </DefaultText>
          </View>
        </View>
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
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: normalize(15, "width"),
    alignItems: "flex-start",
  },
  name: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  message: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "gray",
  },
});

export default Chat;
