import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import ProfilePicture from "react-native-profile-picture";

import { USERS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";

// An individual post overview component; used in PostOverviewList
const PostOverview = (props) => {
  // find user
  const user = USERS.find((u) => u.id === props.userId);

  return (
    <View style={styles.postItem}>
      <TouchableOpacity onPress={props.onSelectPost}>
        <View style={styles.mainContainer}>
          <View style={styles.pictureContainer}>
            <ProfilePicture
              isPicture={true}
              URLPicture={user.profilePicture}
              width={60}
              height={60}
              pictureStyle={styles.picture}
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
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 15,
    borderColor: "black",
    borderWidth: 2,
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
    alignItems: "center",
  },
  picture: {
    borderColor: "black",
    borderWidth: 2,
  },
  title: {
    fontSize: 17,
    fontFamily: "open-sans-bold",
  },
});

export default PostOverview;
