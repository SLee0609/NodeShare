import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SettingsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Settings Screen</Text>
    </View>
  );
};

SettingsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Settings",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
