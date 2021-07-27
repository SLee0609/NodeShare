import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PostOverviewList from "../components/PostOverviewList";
import { onRefreshUserSavedPosts } from "../functions/postOverviewListRefresh";

// Loads post overview list for only user's saved posts
const SavedPostsScreen = (props) => {
  // state for userId
  const [userId, setUserId] = useState();

  // get userId
  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  // return the PostOverviewList for only user's saved posts
  return (
    <PostOverviewList
      navigation={props.navigation}
      onRefresh={onRefreshUserSavedPosts}
      userId={userId}
    />
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
