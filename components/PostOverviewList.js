import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";

import { searchByDate } from "../functions/search";
import PostOverview from "../components/PostOverview";
import { DefaultText, normalize } from "../components/DefaultText";

// Accepts a refresh function and id (optional - either userId whose posts we will display, or string of tag); returns a search bar and flatlist of post overviews
// Used in post screens
const PostOverviewList = (props) => {
  // searchTerm tracks what is currently in the search bar
  const [searchTerm, setSearchTerm] = useState("");
  // state for list
  const [list, setList] = useState([]);

  // state for refreshing
  const [refreshing, setRefreshing] = useState(true);
  // state for whether it is first time refreshing
  const [first, setFirst] = useState(true);

  // function called when refreshing
  const onRefresh = async () => {
    setRefreshing(true);
    const newList = await (props.id == null
      ? props.onRefresh()
      : props.onRefresh(props.id));
    if (newList != null) {
      setList(newList);
      setFirst(false);
    } else {
      setList(list);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    async function load() {
      await onRefresh();
    }
    load();
  }, [props]);

  // function that renders each post
  const renderPostOverview = (itemData) => {
    return (
      <PostOverview
        title={itemData.item.title}
        userId={itemData.item.userId}
        image={itemData.item.image}
        onSelectPost={() => {
          props.navigation.navigate({
            routeName: "PostDetail",
            params: {
              postId: itemData.item.postId,
            },
          });
        }}
      />
    );
  };

  // function that updates list based on search
  const updateSearch = async (text) => {
    let searchTerm = text.trim();
    setSearchTerm(searchTerm);
    await onRefresh();
    if (searchTerm != "") {
      let newList = await searchByDate(list, searchTerm);
      setList(newList);
    }
  };

  // returns the flatlist of post overviews
  return (
    <View style={styles.list}>
      <SearchBar
        placeholder="Search"
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIconContainerStyle={styles.leftIconContainer}
        searchIcon={{ size: normalize(18, "width") }}
        clearIcon={{ size: normalize(18, "width") }}
        onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
        onEndEditing={async (searchTerm) =>
          await updateSearch(searchTerm.nativeEvent.text)
        }
        onClear={async () => await onRefresh()}
        value={searchTerm}
      ></SearchBar>
      {list.length != 0 || refreshing ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => await updateSearch(searchTerm)}
              tintColor={"white"}
            />
          }
          data={list}
          keyExtractor={(item) => item.postId}
          renderItem={renderPostOverview}
          style={{
            width: Dimensions.get("window").width,
            padding: normalize(15, "width"),
          }}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => await updateSearch(searchTerm)}
              tintColor={"white"}
            />
          }
        >
          <View style={styles.textContainer}>
            {first ? null : (
              <DefaultText style={styles.text}>No Posts Yet</DefaultText>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: normalize(60, "height"),
    width: "100%",
    paddingHorizontal: normalize(15, "width"),
    paddingVertical: normalize(10, "height"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  inputContainer: {
    height: "100%",
    width: "100%",
  },
  input: {
    color: "white",
    fontSize: normalize(18, "width"),
  },
  leftIconContainer: {
    paddingRight: normalize(4, "width"),
  },
  list: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    height: normalize(350, "height"),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontFamily: "open-sans-bold",
    color: "white",
  },
});

export default PostOverviewList;
