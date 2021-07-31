import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { getPostFromCategory } from "../../functions/io";

// Loads post overview list for trading posts
const TradingScreen = (props) => {
  // return the PostOverviewList
  return (
    <PostOverviewList
      onRefresh={getPostFromCategory}
      id={"Trading"}
      navigation={props.navigation}
    />
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
