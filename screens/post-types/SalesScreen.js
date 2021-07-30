import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { getPostFromCategory } from "../../functions/io";

// Loads post overview list for sales posts
const SalesScreen = (props) => {
  // return the PostOverviewList
  return (
    <PostOverviewList
      onRefresh={getPostFromCategory}
      id={"Sales"}
      navigation={props.navigation}
    />
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
