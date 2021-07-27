import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../firebase/config";
import Collapsible from "react-native-collapsible";
import { AntDesign } from "@expo/vector-icons";

import ProfilePic from "../components/ProfilePicture";
import PostOverviewList from "../components/PostOverviewList";
import { DefaultText, normalize } from "../components/DefaultText";
import { getUserData, getPostData } from "../io";

const ProfileScreen = (props) => {
  // state for userId and user
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();

  // state for collapse
  const [collapse, setCollapse] = useState(false);

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

  // function called when up button is pressed
  const onUp = () => {
    setCollapse(true);
  };
  // function called when down button is pressed
  const onDown = () => {
    setCollapse(false);
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

  // function passed to PostOverviewList that is called when refreshing
  const onRefresh = async () => {
    // get userId and user
    const userId = await AsyncStorage.getItem("userId");
    const user = await getUserData(userId);

    if (user.posts == null) {
      return [];
    }

    // first create an array of postIds
    let postIds = [];
    for (const [key, postId] of Object.entries(user.posts)) {
      postIds.push(postId);
    }

    // then return user's posts
    const userPosts = await Promise.all(
      postIds.map((postId) => getPostData(postId))
    ).catch((error) => {
      return null;
    });

    return userPosts;
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
          <View style={styles.usernameContainer}>
            <View>
              <DefaultText style={styles.username}>
                {user == null ? "" : user.firstname + " " + user.lastname}
              </DefaultText>
              <DefaultText style={styles.email}>
                {user == null ? "" : user.email}
              </DefaultText>
            </View>
            {collapse ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity onPress={onDown}>
                  <View style={styles.collapseButton}>
                    <AntDesign
                      name="down"
                      size={normalize(15, "width")}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <TouchableOpacity onPress={editProfile}>
            <View style={styles.editProfileButton}>
              <DefaultText style={styles.editProfileText}>
                Edit Profile
              </DefaultText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Collapsible collapsed={collapse} style={styles.collapseContainer}>
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
        <View style={styles.buttonsContainer}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2, alignItems: "center" }}>
            <TouchableOpacity onPress={logOut}>
              <View style={styles.logOutButton}>
                <DefaultText style={styles.logOutText}>Log Out</DefaultText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={onUp}>
              <View style={styles.collapseButton}>
                <AntDesign
                  name="up"
                  size={normalize(15, "width")}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Collapsible>
      <PostOverviewList navigation={props.navigation} onRefresh={onRefresh} />
    </View>
  );
};

ProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Profile",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  collapseContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: normalize(15, "width"),
  },
  profileContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: normalize(15, "width"),
    paddingTop: normalize(20, "height"),
    paddingBottom: normalize(10, "height"),
    flexDirection: "row",
    alignItems: "center",
  },
  userDataContainer: {
    paddingHorizontal: normalize(15, "width"),
    flex: 1,
    justifyContent: "space-between",
  },
  usernameContainer: {
    flexDirection: "row",
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
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: normalize(15, "height"),
  },
  collapseButton: {
    backgroundColor: "black",
    borderRadius: normalize(5, "width"),
    padding: normalize(6, "width"),
    borderColor: "gray",
    borderWidth: normalize(1, "width"),
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

export default ProfileScreen;
