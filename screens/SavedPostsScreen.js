import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PostOverviewList from "../components/PostOverviewList";

// Loads post overview list for only user's saved posts
const SavedPostsScreen = (props) => {
  // state for userId
  const [userId, setUserId] = useState("");

  // get locally stored userId
  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    // update userId if not null
    if (userId !== null) {
      setUserId(userId);
    }
  };
  getUserId();

  // return the PostOverviewList for only user's saved posts
  return <PostOverviewList listData={[]} navigation={props.navigation} />;
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
