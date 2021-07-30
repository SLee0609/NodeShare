import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { getPostFromCategory } from "../../functions/io";

// Loads post overview list for other posts
const OtherScreen = (props) => {
  // return the PostOverviewList
  return (
    <PostOverviewList
      onRefresh={getPostFromCategory}
      id={"Other"}
      navigation={props.navigation}
    />
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
