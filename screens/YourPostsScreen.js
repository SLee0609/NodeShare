import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PostOverviewList from "../components/PostOverviewList";
import { POSTS } from "../data/dummy-data";
import { getUserData, getPostData, retrievePostPic } from "../io";

// Loads post overview list for only user's posts
const YourPostsScreen = (props) => {
  // state for userId and user
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();

  // get locally stored userId and user from database
  const getUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    // update userId
    setUserId(userId);
    console.log("userId: " + userId);
    const user = await getUserData(userId);
    // update user
    setUser(user);
    console.log("user: " + user);
  };
  getUser();

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
