import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { getPostFromCategory } from "../../functions/io";

// Loads post overview list for fun posts
const FunScreen = (props) => {
  // return the PostOverviewList
  return (
    <PostOverviewList
      onRefresh={getPostFromCategory}
      id={"Fun"}
      navigation={props.navigation}
    />
  );
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
