import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

const LoadingScreen = (props) => {
  const load = async () => {
    // get locally stored userId
    const userId = await AsyncStorage.getItem("userId");
    // navigate to correct screen depending on whether or not userId is null
    props.navigation.navigate(userId == null ? "Authentication" : "App");
  };
  load();

  return <View style={styles.screen}></View>;
};

LoadingScreen.navigationOptions = (navData) => {
  return {
    cardStyle: { backgroundColor: Colors.logoBlue },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
