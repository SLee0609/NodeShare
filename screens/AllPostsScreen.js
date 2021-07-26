import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PostOverviewList from "../components/PostOverviewList";
import { POSTS } from "../data/dummy-data";

// Loads post overview list for all posts
const AllPostsScreen = (props) => {
  // return the PostOverviewList
  return <PostOverviewList listData={POSTS} navigation={props.navigation} />;
};


import { firebase } from "../firebase/config";

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    firebase.auth().signOut();
    props.navigation.navigate("Login");
  }
});

AllPostsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Posts",
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

export default AllPostsScreen;
