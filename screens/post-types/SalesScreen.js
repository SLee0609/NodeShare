import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { POSTS } from "../../data/dummy-data";

// Loads post overview list for sales posts
const SalesScreen = (props) => {
  // get all sales posts
  const salesPosts = POSTS.filter((p) => p.categories.includes("Sales"));

  // return the PostOverviewList
  return (
    <PostOverviewList listData={salesPosts} navigation={props.navigation} />
  );
};

SalesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Sales",
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

export default SalesScreen;
