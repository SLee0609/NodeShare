import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PostOverviewList from "../components/PostOverviewList";
import { POSTS } from "../data/dummy-data";

// Loads post overview list for only user's posts
const YourPostsScreen = (props) => {
  // state for userId
  const [userId, setUserId] = useState("");

  // get locally stored userId
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      // update userId if not null
      if (userId !== null) {
        setUserId(userId);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  getUserId();

  // get all user posts
  const userPosts = POSTS.filter((p) => p.userId === userId);

  // return the PostOverviewList for only user's posts
  return (
    <PostOverviewList listData={userPosts} navigation={props.navigation} />
  );
};

YourPostsScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => null,
    headerTitle: "Your Posts",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default YourPostsScreen;
