import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Button, Switch } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../firebase/config";

import ProfilePic from "../components/ProfilePicture";
import Colors from "../constants/Colors";
import { DefaultText, normalize } from "../components/DefaultText";
import { getUserData } from "../io";

const SettingsScreen = (props) => {
  // state for userId and user
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();

  // get locally stored userId and find user
  const getUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setUserId(userId);
    // find user using userId
    const user = await getUserData(userId);
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  // function called when log out is pressed
  const logOut = async () => {
    // remove userId from local storage
    await AsyncStorage.removeItem("userId");
    firebase.auth().signOut().then(props.navigation.navigate("Authentication"));
  };

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        extraScrollHeight={normalize(60, "height")}
      >
        <View style={styles.profileContainer}>
          <ProfilePic
            imgUrl={user == null ? null : user.profilePicture}
            width={normalize(85, "width")}
            height={normalize(85, "width")}
          />
          <View style={styles.userDataContainer}>
            <DefaultText style={styles.username}>
              {user == null ? "" : user.firstname + " " + user.lastname}
            </DefaultText>
            <DefaultText style={styles.email}>
              {user == null ? "" : user.email}
            </DefaultText>
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
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  email: {
    fontSize: 18,
    fontFamily: "open-sans",
    color: "gray",
  },
});

export default SettingsScreen;
