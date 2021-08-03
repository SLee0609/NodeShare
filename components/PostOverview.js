import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ProfilePic from "../components/ProfilePicture";
import Colors from "../constants/Colors";
import { DefaultText, normalize } from "./DefaultText";
import { getUserData } from "../functions/io";

// Accepts post title, userId, and onSelect function
// Returns an individual post overview component; used in PostOverviewList
const PostOverview = (props) => {
  // state for user
  const [user, setUser] = useState();

  // get user data from database
  const getUser = async () => {
    const user = await getUserData(props.userId);
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, [props.userId]);

  return (
    // <LinearGradient
    //   //colors={[Colors.green, Colors.logoBlue]}
    //   //colors={["#ff9966", "#ff5e62"]}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    //   style={styles.postItem}
    // >
    <TouchableOpacity style={styles.touchable} onPress={props.onSelectPost}>
      <ProfilePic
        imgUrl={user == null ? null : user.profilePicture}
        width={normalize(60, "width")}
        height={normalize(60, "width")}
      />
      <View style={styles.textContainer}>
        <DefaultText style={styles.title}>{props.title}</DefaultText>
        <DefaultText style={styles.username}>
          {user == null ? "" : user.firstname + " " + user.lastname}
        </DefaultText>
      </View>
    </TouchableOpacity>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  postItem: {
    borderRadius: normalize(10, "width"),
    marginBottom: normalize(20, "height"),
    overflow: "hidden",
  },
  touchable: {
    borderRadius: normalize(10, "width"),
    marginBottom: normalize(20, "height"),
    overflow: "hidden",

    flexDirection: "row",
    paddingVertical: normalize(15, "height"),
    paddingHorizontal: normalize(15, "width"),
    justifyContent: "center",
    backgroundColor: "#5ecceb",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    marginHorizontal: normalize(20, "width"),
    alignItems: "flex-start",
  },
  title: {
    fontSize: 19,
    fontFamily: "open-sans-bold",
  },
  username: {
    fontSize: 16,
    fontFamily: "open-sans",
  },
});

export default PostOverview;
