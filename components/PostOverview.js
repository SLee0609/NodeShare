import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import ProfilePic from "../components/ProfilePicture";
import { USERS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";

// Accepts post title, userId, and onSelect function
// Returns an individual post overview component; used in PostOverviewList
const PostOverview = (props) => {
  // find user
  const user = USERS.find((u) => u.id === props.userId);

  return (
    <View style={styles.postItem}>
      <TouchableOpacity onPress={props.onSelectPost}>
        <View style={styles.mainContainer}>
          <View style={styles.pictureContainer}>
            <ProfilePic imgUrl={user.profilePicture} width={60} height={60} />
          </View>
          <View style={styles.textContainer}>
            <DefaultText style={styles.title}>{props.title}</DefaultText>
            <DefaultText>{user.name}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    justifyContent: "center",
    backgroundColor: Colors.blue,
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 40,
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 15,
    borderColor: "black",
    borderWidth: 3,
  },
  mainContainer: {
    flexDirection: "row",
  },
  pictureContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  textContainer: {
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});

export default PostOverview;
