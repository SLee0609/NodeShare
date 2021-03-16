import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

import ProfilePic from "../components/ProfilePicture";
import { USERS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";

// Accepts a post and returns an individual post detail component; used in PostDetailScreen
const PostDetail = (props) => {
  // Get the post we want to display
  const post = props.post;
  // Get the user information
  const user = USERS.find((u) => u.id === post.userId);

  return (
    <View style={styles.screen}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureContainer}>
          <ProfilePic imgUrl={user.profilePicture} width={40} height={40} />
        </View>
        <View style={styles.usernameContainer}>
          <DefaultText style={styles.username}>{user.name}</DefaultText>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.image }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 2,
  },
  profilePictureContainer: {
    justifyContent: "center",
  },
  usernameContainer: {
    paddingLeft: 20,
    justifyContent: "center",
  },
  username: {
    fontSize: 22,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.3,
  },
});

export default PostDetail;
