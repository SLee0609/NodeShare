import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import ProfilePic from "../components/ProfilePicture";
import { USERS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import { DefaultText, normalize } from "./DefaultText";

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
            <ProfilePic
              imgUrl={user.profilePicture}
              width={normalize(60, "width")}
              height={normalize(60, "width")}
            />
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
    borderRadius: normalize(10, "width"),
    marginBottom: normalize(15, "height"),
    paddingVertical: normalize(15, "height"),
    paddingHorizontal: normalize(15, "width"),
    borderColor: "black",
    borderWidth: normalize(3, "width"),
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
    flex: 1,
    justifyContent: "space-evenly",
    marginHorizontal: normalize(20, "width"),
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});

export default PostOverview;
