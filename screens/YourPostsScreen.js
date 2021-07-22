import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PostOverviewList from "../components/PostOverviewList";
import { POSTS } from "../data/dummy-data";

// Loads post overview list for only user's posts
const YourPostsScreen = (props) => {
  // state for userId
  const [userId, setUserId] = useState("");

  // get locally stored userId
  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    // update userId
    setUserId(userId);
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
    headerTitle: "Your Posts",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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
