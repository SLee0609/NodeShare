import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

import PostOverview from "../components/PostOverview";

// Flatlist of post overviews that appears in post screens (all posts, information, etc.)
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

  // returns the flatlist of post overviews
  return (
    <View style={styles.list}>
      <SearchBar
        placeholder="Search"
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        onChangeText={updateSearch}
        lightTheme={true}
        value={searchTerm}
      ></SearchBar>
      <FlatList
        data={props.listData}
        keyExtractor={(item) => item.id}
        renderItem={renderPostOverview}
        style={{ width: "100%", padding: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    height: "100%",
    width: "100%",
  },
  input: {
    color: "black",
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostOverviewList;
