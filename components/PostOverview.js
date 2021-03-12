import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { USERS } from "../data/dummy-data";
import DefaultText from "./DefaultText";

// An individual post overview component; used in PostOverviewList
const PostOverview = (props) => {
  // find user
  const user = USERS.filter((u) => u.id == props.userId)[0];

  return (
    <View style={styles.postItem}>
      <TouchableOpacity onPress={props.onSelectPost}>
        <View>
          <DefaultText>{props.title}</DefaultText>
          <DefaultText>{user.name}</DefaultText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
});

export default PostOverview;
