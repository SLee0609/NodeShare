import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PostOverviewList from "../components/PostOverviewList";
import { POSTS } from "../data/dummy-data";

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

export default SavedPostsScreen;