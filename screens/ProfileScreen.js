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
import { getUserData, getPostsFromUser } from "../functions/io";

const ProfileScreen = (props) => {
  // state for userId
  const [userId, setUserId] = useState();
  // state for user
  const [user, setUser] = useState();

  // state for whether device's user is the same as profile's user
  const [sameUser, setSameUser] = useState(false);

  // state for collapse
  const [collapse, setCollapse] = useState(false);

  // get passed profileUserId and find its user, or get locally stored userId and find user
  const getUsers = async () => {
    // first attempt to get profileUserId
    const profileUserId = props.navigation.getParam("profileUserId");
    // profileUserId is null only when we are looking at device user's profile
    if (profileUserId != null) {
      const profileUser = await getUserData(profileUserId);
      setUserId(profileUserId);
      setUser(profileUser);
      setSameUser(false);
    } else {
      const userId = await AsyncStorage.getItem("userId");
      // find user using userId
      const user = await getUserData(userId);
      setUserId(userId);
      setUser(user);
      setSameUser(true);
    }
  };

  useEffect(() => {
    setCollapse(false);
    getUsers();
  }, [props]);

  // function called when edit profile is pressed
  const editProfile = () => {
    props.navigation.navigate({
      routeName: "EditProfile",
      params: {
        userId: userId,
        user: user,
      },
    });
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
          {sameUser ? (
            <TouchableOpacity onPress={editProfile}>
              <View style={styles.editProfileButton}>
                <DefaultText style={styles.editProfileText}>
                  Edit Profile
                </DefaultText>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <Collapsible collapsed={collapse} style={styles.collapseContainer}>
        <View style={styles.userBioContainer}>
          <View>
            <View>
              <DefaultText style={styles.bioText}>Occupation:</DefaultText>
            </View>
            <View style={{ marginTop: normalize(6, "height") }}>
              <DefaultText style={styles.bioText}>Residency:</DefaultText>
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
          {sameUser ? null : (
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                paddingRight: normalize(15, "width"),
                justifyContent: "center",
              }}
            >
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
          )}
        </View>
        <View style={styles.userBioContainer}>
          <View>
            <DefaultText style={styles.bioText}>Bio:</DefaultText>
          </View>
          <View
            style={{
              marginLeft: normalize(6, "width"),
            }}
          >
            <DefaultText style={styles.bioNotBold}>
              {"YISS '22 —> LC '22"}
            </DefaultText>
          </View>
        </View>
        {sameUser ? (
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
        ) : null}
      </Collapsible>
      <PostOverviewList
        navigation={props.navigation}
        onRefresh={getPostsFromUser}
        id={userId}
      />
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
    fontSize: 16,
    fontFamily: "open-sans",
    color: "white",
  },
  editProfileButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    paddingVertical: normalize(4, "height"),
    marginTop: normalize(7, "height"),
    borderWidth: normalize(1, "width"),
    borderRadius: normalize(5, "width"),
  },
  editProfileText: {
    fontSize: 12,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  userBioContainer: {
    flexDirection: "row",
    paddingVertical: normalize(10, "height"),
    borderBottomColor: "gray",
    borderBottomWidth: normalize(1, "height"),
  },
  bioText: {
    fontSize: 15,
    fontFamily: "open-sans",
    color: "white",
  },
  bio: {
    fontSize: 15,
    marginLeft: normalize(10, "width"),
    fontFamily: "open-sans-bold",
    color: "white",
  },
  bioNotBold: {
    fontSize: 15,
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
