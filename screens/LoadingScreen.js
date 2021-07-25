import React from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/Colors";
import { getUserData } from "../io";

const LoadingScreen = (props) => {
  const load = async () => {
    // get locally stored userId
    const userId = await AsyncStorage.getItem("userId");

    // navigate to Authentication if userId is null
    if (userId == null) {
      props.navigation.navigate("Authentication");
    } else if (getUserData(userId) == null) {
      // also navigate to Authentication if userId does not exist in database
      props.navigation.navigate("Authentication");
    } else {
      // navigate to App if userId exists in the database
      props.navigation.navigate("App");
    }
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
