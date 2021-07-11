import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = (props) => {
  // function called when log out is pressed
  const logOut = async () => {
    // remove userId from local storage
    await AsyncStorage.removeItem("userId");

    // navigate to authentication
    props.navigation.navigate("Authentication");
  };

  return (
    <View style={styles.screen}>
      <Text>Settings Screen</Text>
      <Button onPress={logOut} title="Log Out" />
    </View>
  );
};

SettingsScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => null,
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
