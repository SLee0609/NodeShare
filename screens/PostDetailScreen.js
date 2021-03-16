import React from "react";
import { View, StyleSheet } from "react-native";

import PostDetail from "../components/PostDetail";
import { CATEGORIES, USERS, POSTS } from "../data/dummy-data";

const PostDetailScreen = (props) => {
  // find post we want to show
  const postId = props.navigation.getParam("postId");
  const post = POSTS.find((p) => p.id === postId);

  // return the post detail for that particular post
  return (
    <View style={styles.screen}>
      <PostDetail post={post} />
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
