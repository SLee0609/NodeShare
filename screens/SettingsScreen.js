import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
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

  // function called when edit profile is pressed
  const editProfile = () => {
    Alert.alert("Editing Profile");
  };

  // function called when log out is pressed
  const logOut = async () => {
    // first alert to confirm
    Alert.alert("Are you sure you want to log out?", "", [
      { text: "Cancel", style: "destructive" },
      {
        text: "Yes",
        onPress: async () => {
          // remove userId from local storage
          await AsyncStorage.removeItem("userId");
          firebase
            .auth()
            .signOut()
            .then(props.navigation.navigate("Authentication"));
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.profileContainer}>
        <ProfilePic
          imgUrl={user == null ? null : user.profilePicture}
          width={normalize(100, "width")}
          height={normalize(100, "width")}
        />
        <View style={styles.userDataContainer}>
          <DefaultText style={styles.username}>
            {user == null ? "" : user.firstname + " " + user.lastname}
          </DefaultText>
          <DefaultText style={styles.email}>
            {user == null ? "" : user.email}
          </DefaultText>
          <TouchableOpacity onPress={editProfile}>
            <View style={styles.editProfileButton}>
              <DefaultText style={styles.editProfileText}>
                Edit Profile
              </DefaultText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userBioContainer}>
        <View>
          <View>
            <DefaultText style={styles.bioText}>{"Occupation:"}</DefaultText>
          </View>
          <View style={{ marginTop: normalize(6, "height") }}>
            <DefaultText style={styles.bioText}>{"Residency:"}</DefaultText>
          </View>
        </View>
        <View
          style={{
            paddingLeft: normalize(6, "width"),
          }}
        >
          <View>
            <DefaultText style={styles.bio}>Student</DefaultText>
          </View>
          <View style={{ marginTop: normalize(6, "height") }}>
            <DefaultText style={styles.bio}>On Campus</DefaultText>
          </View>
        </View>
      </View>
      <View style={styles.userBioContainer}>
        <View>
          <DefaultText style={styles.bioText}>{"Bio:"}</DefaultText>
        </View>
        <View
          style={{
            paddingLeft: normalize(6, "width"),
          }}
        >
          <DefaultText style={styles.bioNotBold}>
            {"YISS '22 —> LC '22"}
          </DefaultText>
        </View>
      </View>
      <View style={styles.logOutContainer}>
        <TouchableOpacity onPress={logOut}>
          <View style={styles.logOutButton}>
            <DefaultText style={styles.logOutText}>Log Out</DefaultText>
          </View>
        </TouchableOpacity>
      </View>
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileContainer: {
    paddingTop: normalize(20, "height"),
    paddingBottom: normalize(10, "height"),
    paddingHorizontal: normalize(20, "width"),
    flexDirection: "row",
    alignItems: "center",
  },
  userDataContainer: {
    paddingHorizontal: normalize(15, "width"),
    flex: 1,
    justifyContent: "space-between",
  },
  username: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  email: {
    fontSize: 15,
    fontFamily: "open-sans",
    color: "white",
  },
  editProfileButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    paddingVertical: normalize(4, "height"),
    marginTop: normalize(6, "height"),
    borderWidth: normalize(1, "width"),
    borderRadius: normalize(5, "width"),
  },
  editProfileText: {
    fontSize: 12,
    fontFamily: "open-sans",
    color: "white",
  },
  userBioContainer: {
    width: Dimensions.get("window").width - 2 * normalize(20, "width"),
    flexDirection: "row",
    paddingVertical: normalize(10, "height"),
    borderBottomColor: "gray",
    borderBottomWidth: normalize(1, "height"),
  },
  bioText: {
    fontSize: 14,
    fontFamily: "open-sans",
    color: "white",
  },
  bio: {
    fontSize: 14,
    marginLeft: normalize(10, "width"),
    fontFamily: "open-sans-bold",
    color: "white",
  },
  bioNotBold: {
    fontSize: 14,
    marginLeft: normalize(10, "width"),
    fontFamily: "open-sans",
    color: "white",
  },
  logOutContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: normalize(15, "height"),
  },
  logOutButton: {
    backgroundColor: "white",
    paddingHorizontal: normalize(30, "width"),
    paddingVertical: normalize(10, "height"),
    borderRadius: normalize(20, "width"),
    width: normalize(160, "width"),
    alignItems: "center",
  },
  logOutText: {
    fontFamily: "open-sans-bold",
    color: "black",
    fontSize: 15,
  },
});

export default SettingsScreen;
