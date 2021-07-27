import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PostOverviewList from "../components/PostOverviewList";
import { getUserData, getPostData } from "../io";

// Loads post overview list for only user's saved posts
const SavedPostsScreen = (props) => {
  // function passed to PostOverviewList that is called when refreshing
  const onRefresh = async () => {
    // get userId and user
    const userId = await AsyncStorage.getItem("userId");
    const user = await getUserData(userId);

    if (user.savedPosts == null) {
      return [];
    }

    // first create an array of postIds
    let postIds = [];
    for (const [key, postId] of Object.entries(user.savedPosts)) {
      postIds.push(postId);
    }

    // then return user's saved posts
    const savedPosts = await Promise.all(
      postIds.map((postId) => getPostData(postId))
    ).catch((error) => {
      return null;
    });

    return savedPosts;
  };

  // return the PostOverviewList for only user's saved posts
  return (
    <PostOverviewList navigation={props.navigation} onRefresh={onRefresh} />
  );
};

SavedPostsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Saved Posts",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SavedPostsScreen;
