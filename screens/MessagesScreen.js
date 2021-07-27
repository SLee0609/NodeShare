import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessagesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={{ color: "white" }}>Messages Screen</Text>
    </View>
  );
};

MessagesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Messages",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessagesScreen;
