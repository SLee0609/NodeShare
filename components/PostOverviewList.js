import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

import PostOverview from "../components/PostOverview";
import DefaultText from "../components/DefaultText";

// Accepts a list of posts and returns a search bar and flatlist of post overviews
// Used in post screens (all posts, information, etc.)
const PostOverviewList = (props) => {
  // searchTerm tracks what is currently in the search bar
  const [searchTerm, setSearchTerm] = useState("");

  // function that renders each post
  const renderPostOverview = (itemData) => {
    return (
      <PostOverview
        title={itemData.item.title}
        userId={itemData.item.userId}
        onSelectPost={() => {
          props.navigation.navigate({
            routeName: "PostDetail",
            params: {
              postId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  // function that updates search term
  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  let list = (
    <View style={styles.textContainer}>
      <DefaultText style={styles.text}>No Posts Yet</DefaultText>
    </View>
  );

  if (props.listData.length != 0) {
    list = (
      <FlatList
        data={props.listData}
        keyExtractor={(item) => item.id}
        renderItem={renderPostOverview}
        style={{ width: "100%", padding: 15 }}
      />
    );
  }

  // returns the flatlist of post overviews
  return (
    <View style={styles.list}>
      <SearchBar
        placeholder="Search"
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        onChangeText={updateSearch}
        value={searchTerm}
      ></SearchBar>
      {list}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  inputContainer: {
    height: "100%",
    width: "100%",
  },
  input: {
    color: "white",
  },
  list: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontFamily: "open-sans-bold",
  },
});

export default PostOverviewList;
