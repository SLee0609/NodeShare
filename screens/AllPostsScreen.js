import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PostOverviewList from "../components/PostOverviewList";
import { POSTS } from "../data/dummy-data";

// Loads post overview list for all posts
const AllPostsScreen = (props) => {
  if (POSTS.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No posts found!</DefaultText>
      </View>
    );
  }

  // return the PostOverviewList
  return <PostOverviewList listData={POSTS} navigation={props.navigation} />;
};

AllPostsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Posts",
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

export default AllPostsScreen;
