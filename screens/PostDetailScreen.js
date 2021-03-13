import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { CATEGORIES, USERS, POSTS } from "../data/dummy-data";

const PostDetailScreen = (props) => {
  // find post we want to show
  const postId = props.navigation.getParam("postId");
  const post = POSTS.find((p) => p.id === postId);

  return (
    <View style={styles.screen}>
      <Text>{post.title}</Text>
    </View>
  );
};

PostDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Post Details",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostDetailScreen;
