import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatScreen = (props) => {
  let testParam = props.navigation.dangerouslyGetParent().getParam("testKey");

  return (
    <View style={styles.screen}>
      <Text style={{ color: "white" }}>Chat Screen</Text>
      <Text style={{ color: "white" }}>{testParam}</Text>
    </View>
  );
};

ChatScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Chat",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
