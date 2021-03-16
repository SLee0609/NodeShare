import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { POSTS } from "../../data/dummy-data";

// Loads post overview list for information posts
const InformationScreen = (props) => {
  // get all information posts
  const informationPosts = POSTS.filter((p) => p.categoryIds.includes("c1"));

  // return the PostOverviewList
  return (
    <PostOverviewList
      listData={informationPosts}
      navigation={props.navigation}
    />
  );
};

InformationScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Information",
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

export default InformationScreen;
