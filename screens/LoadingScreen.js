import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/Colors";
import { getUserData } from "../functions/io";
import firebase from "firebase/app";
import { storeToken } from "../functions/notifications";

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

      // if userId exists in the database
    } else {
      let user = await getUserData(userId);

      await storeToken(userId);

      // if user's occupation is set up already, navigate to App
      if (user.occupation != null) {
        props.navigation.navigate("App");
      } else {
        // else, navigate to SetUpProfile
        props.navigation.navigate({
          routeName: "SetUpProfile",
          params: {
            userId: userId,
            user: user,
          },
        });
      }
    }
  };

  load();

  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={require("../assets/splash.png")} />
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
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    resizeMode: "cover",
  },
});

export default LoadingScreen;
