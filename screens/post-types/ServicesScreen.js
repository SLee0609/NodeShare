import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { getPostFromCategory } from "../../functions/io";

// Loads post overview list for services posts
const ServicesScreen = (props) => {
  // return the PostOverviewList
  return (
    <PostOverviewList
      onRefresh={getPostFromCategory}
      id={"Services"}
      navigation={props.navigation}
    />
  );
};

ServicesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Services",
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

export default ServicesScreen;
