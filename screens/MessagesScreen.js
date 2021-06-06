import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessagesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Messages Screen</Text>
    </View>
  );
};

MessagesScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => null,
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
