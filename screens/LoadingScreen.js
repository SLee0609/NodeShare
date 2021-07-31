import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/Colors";
import { getUserData } from "../functions/io";

const LoadingScreen = (props) => {
  const load = async () => {
    // get locally stored userId
    const userId = await AsyncStorage.getItem("userId");

    // navigate to Authentication if userId is null
    if (userId == null) {
      props.navigation.navigate("Authentication");

      // clear locally stored userId and navigate to Authentication if userId does not exist in database
    } else if ((await getUserData(userId)) == null) {
      await AsyncStorage.removeItem("userId");
      props.navigation.navigate("Authentication");

      // navigate to App if userId exists in the database
    } else {
      props.navigation.navigate("App");
    }
  };

  load();

  return (
    <View style={styles.screen}>
      <Image
        style={styles.image}
        source={require("../assets/splashtransparent.png")}
      />
    </View>
  );
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
  image: {
    flex: 1,
    resizeMode: "contain",
  },
});

export default LoadingScreen;
