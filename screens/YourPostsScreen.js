import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PostOverviewList from "../components/PostOverviewList";
import { getUserData, getPostData } from "../io";

// Loads post overview list for only user's posts
const YourPostsScreen = (props) => {
  // function passed to PostOverviewList that is called when refreshing
  const onRefresh = async () => {
    // get userId and user
    const userId = await AsyncStorage.getItem("userId");
    const user = await getUserData(userId);

    // first create an array of postIds
    let postIds = [];
    for (const [key, postId] of Object.entries(user.posts)) {
      postIds.push(postId);
    }

    // then return user's posts
    const userPosts = await Promise.all(
      postIds.map((postId) => getPostData(postId))
    );
    return userPosts;
  };

  // return the PostOverviewList for only user's posts
  return (
    <PostOverviewList navigation={props.navigation} onRefresh={onRefresh} />
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
