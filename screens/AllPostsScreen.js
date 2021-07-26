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
