import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import PostDetail from "../components/PostDetail";
import { getPostData } from "../functions/io";

const PostDetailScreen = (props) => {
  const postId = props.navigation.getParam("postId");

  // state for post data
  const [post, setPost] = useState();

  // find post we want to show
  const getPost = async () => {
    const post = await getPostData(postId);
    setPost(post);
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  // return the post detail for that particular post
  return (
    <View style={styles.screen}>
      {post == null ? null : (
        <PostDetail post={post} navigation={props.navigation} />
      )}
    </View>
  );
};

PostDetailScreen.navigationOptions = (navData) => {
  return {
    cardStyle: { backgroundColor: "black" },
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
