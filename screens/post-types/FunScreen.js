import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { POSTS } from "../../data/dummy-data";

// Loads post overview list for fun posts
const FunScreen = (props) => {
  // get all fun posts
  const funPosts = POSTS.filter((p) => p.categories.includes("Fun"));

  // return the PostOverviewList
  return <PostOverviewList listData={funPosts} navigation={props.navigation} />;
};

FunScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Fun",
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

export default FunScreen;
