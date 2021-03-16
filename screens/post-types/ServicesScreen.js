import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { POSTS } from "../../data/dummy-data";

// Loads post overview list for services posts
const ServicesScreen = (props) => {
  // get all services posts
  const servicesPosts = POSTS.filter((p) => p.categoryIds.includes("c2"));

  // return the PostOverviewList
  return (
    <PostOverviewList listData={servicesPosts} navigation={props.navigation} />
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
