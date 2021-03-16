import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { POSTS } from "../../data/dummy-data";

// Loads post overview list for other posts
const OtherScreen = (props) => {
  // get all other posts
  const otherPosts = POSTS.filter((p) => p.categoryIds.includes("c6"));

  // return the PostOverviewList
  return (
    <PostOverviewList listData={otherPosts} navigation={props.navigation} />
  );
};

OtherScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Other",
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

export default OtherScreen;
