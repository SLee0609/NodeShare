import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Button, Switch } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfilePic from "../components/ProfilePicture";
import { USERS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import { DefaultText, normalize } from "../components/DefaultText";

const SettingsScreen = (props) => {
  // state for userId and user
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");

  // get locally stored userId and find user
  const getUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setUserId(userId);
    // find user using userId
    setUser(USERS.find((u) => u.id === userId));
  };
  getUser();

  // function called when log out is pressed
  const logOut = async () => {
    // remove userId from local storage
    await AsyncStorage.removeItem("userId");
    // navigate to authentication
    props.navigation.navigate("Authentication");
  };

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        extraScrollHeight={normalize(60, "height")}
      >
        <View style={styles.profileContainer}>
          <ProfilePic
            imgUrl={user.profilePicture}
            width={normalize(80, "width")}
            height={normalize(80, "width")}
          />
          <View style={styles.userDataContainer}>
            <DefaultText style={styles.username}>{user.name}</DefaultText>
            <DefaultText style={styles.email}>sean_lee@loomis.org</DefaultText>
            <Button onPress={logOut} title={"Log Out"} />
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    backgroundColor: "black",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: Colors.gray,
    borderBottomWidth: normalize(1, "height"),
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
  profileContainer: {
    paddingVertical: normalize(20, "height"),
    paddingLeft: normalize(20, "width"),
    flexDirection: "row",
  },
  userDataContainer: {
    paddingLeft: normalize(15, "width"),
  },
  username: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  email: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "gray",
  },
});

export default SettingsScreen;
