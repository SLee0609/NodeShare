import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import PostOverview from "../components/PostOverview";

// Flatlist of post overviews that appears in post screens (all posts, information, etc.)
const PostOverviewList = (props) => {
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

  // returns the flatlist of post overviews
  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item) => item.id}
        renderItem={renderPostOverview}
        style={{ width: "100%", padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostOverviewList;
