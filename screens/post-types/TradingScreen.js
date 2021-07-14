import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { POSTS } from "../../data/dummy-data";

// Loads post overview list for trading posts
const TradingScreen = (props) => {
  // get all trading posts
  const tradingPosts = POSTS.filter((p) => p.categories.includes("Trading"));

  // return the PostOverviewList
  return (
    <PostOverviewList listData={tradingPosts} navigation={props.navigation} />
  );
};

TradingScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Trading",
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

export default TradingScreen;
