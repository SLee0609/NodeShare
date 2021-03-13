import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import PostOverviewList from "../../components/PostOverviewList";
import { POSTS } from "../../data/dummy-data";
import DefaultText from "../../components/DefaultText";

// Loads post overview list for trading posts
const TradingScreen = (props) => {
  // get all trading posts
  const tradingPosts = POSTS.filter((p) => p.categoryIds.includes("c4"));

  if (tradingPosts.length === 0) {
    return (
      <View style={styles.screen}>
        <DefaultText>No posts found!</DefaultText>
      </View>
    );
  }

  // return the PostOverviewList
  return (
    <PostOverviewList listData={tradingPosts} navigation={props.navigation} />
  );
};

TradingScreen.navigationOptions = (navData) => {
  return {
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TradingScreen;
