import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreatePostsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Create Posts Screen</Text>
    </View>
  );
};

CreatePostsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Create Posts",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;
