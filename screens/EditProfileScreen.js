import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ProfilePic from "../components/ProfilePicture";
import { DefaultText, normalize } from "../components/DefaultText";
import { getUserData, getPostsFromUser } from "../functions/io";
import Colors from "../constants/Colors";

const EditProfileScreen = (props) => {
  // state for userId
  const [userId, setUserId] = useState(props.navigation.getParam("userId"));
  // state for user
  const [user, setUser] = useState(props.navigation.getParam("user"));

  // state for profile image
  const [image, setImage] = useState();
  // state for profile image uri
  const [imageUri, setImageUri] = useState(user.profilePicture);
  // state for first name
  const [firstName, setFirstName] = useState(user.firstname);
  // state for last name
  const [lastName, setLastName] = useState(user.lastname);
  // state for occupation
  const [occupation, setOccupation] = useState("Student");
  // state for residency
  const [residency, setResidency] = useState("On Campus");
  // state for bio
  const [bio, setBio] = useState("YISS '22 —> LC '22");

  // function called when change profile photo button is pressed
  const changeProfilePic = () => {
    Alert.alert("Change Profile Photo");
  };

  // function called when cancel button is pressed
  const cancel = () => {
    Alert.alert("Canceled");
  };

  // function called when save button is pressed
  const save = () => {
    Alert.alert("Saved");
  };

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        extraScrollHeight={normalize(60, "height")}
      >
        <View style={styles.profileContainer}>
          <ProfilePic
            imgUrl={imageUri}
            width={normalize(120, "width")}
            height={normalize(120, "width")}
          />
          <TouchableOpacity onPress={changeProfilePic}>
            <View style={styles.profilePicTextContainer}>
              <DefaultText style={styles.profilePicText}>
                Change Profile Photo
              </DefaultText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userBioContainer}>
          <View>
            <View style={styles.bioTextContainer}>
              <DefaultText style={styles.bioText}>First Name:</DefaultText>
            </View>
            <View style={styles.bioTextContainer}>
              <DefaultText style={styles.bioText}>Last Name:</DefaultText>
            </View>
            <View style={styles.bioTextContainer}>
              <DefaultText style={styles.bioText}>Occupation:</DefaultText>
            </View>
            <View style={styles.bioTextContainer}>
              <DefaultText style={styles.bioText}>Residency:</DefaultText>
            </View>
            <View style={styles.bioContainerBottom}>
              <DefaultText style={styles.bioText}>Bio:</DefaultText>
            </View>
          </View>
          <View style={styles.biosContainer}>
            <View style={styles.bioContainer}>
              <DefaultText style={styles.bio}>{firstName}</DefaultText>
            </View>
            <View style={styles.bioContainer}>
              <DefaultText style={styles.bio}>{lastName}</DefaultText>
            </View>
            <View style={styles.bioContainer}>
              <DefaultText style={styles.bio}>{occupation}</DefaultText>
            </View>
            <View style={styles.bioContainer}>
              <DefaultText style={styles.bio}>{residency}</DefaultText>
            </View>
            <View style={styles.bioContainerBottom}>
              <DefaultText style={styles.bioNotBold}>{bio}</DefaultText>
            </View>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={cancel}>
            <View style={styles.cancelButton}>
              <DefaultText style={styles.cancelText}>Cancel</DefaultText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={save}>
            <View style={styles.saveButton}>
              <DefaultText style={styles.saveText}>Save</DefaultText>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

EditProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Edit Profile",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: normalize(20, "height"),
    borderBottomColor: "gray",
    borderBottomWidth: normalize(1, "height"),
  },
  profilePicTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    paddingVertical: normalize(4, "height"),
    paddingHorizontal: normalize(6, "width"),
    marginTop: normalize(10, "height"),
    borderWidth: normalize(1, "width"),
    borderRadius: normalize(5, "width"),
  },
  profilePicText: {
    fontSize: 12,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  userBioContainer: {
    flexDirection: "row",
    paddingHorizontal: normalize(15, "width"),
    paddingVertical: normalize(15, "height"),
    borderBottomColor: "gray",
    borderBottomWidth: normalize(1, "height"),
  },
  bioText: {
    fontSize: 15,
    fontFamily: "open-sans",
    color: "white",
  },
  bioTextContainer: {
    marginBottom: normalize(10, "height"),
    paddingBottom: normalize(10, "height"),
    borderBottomColor: "black",
    borderBottomWidth: normalize(1, "height"),
  },
  biosContainer: {
    marginLeft: normalize(15, "width"),
    flex: 1,
  },
  bioContainer: {
    marginBottom: normalize(10, "height"),
    paddingBottom: normalize(10, "height"),
    borderBottomColor: "gray",
    borderBottomWidth: normalize(1, "height"),
  },
  bioContainerBottom: {
    borderBottomColor: "black",
    borderBottomWidth: normalize(1, "height"),
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
    marginVertical: normalize(35, "height"),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cancelButton: {
    backgroundColor: Colors.primaryColor,
    width: normalize(120, "width"),
    paddingVertical: normalize(10, "height"),
    borderRadius: normalize(20, "width"),
    alignItems: "center",
  },
  cancelText: {
    fontFamily: "open-sans-bold",
    color: "white",
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: Colors.logoBlue,
    width: normalize(120, "width"),
    paddingVertical: normalize(10, "height"),
    borderRadius: normalize(20, "width"),
    alignItems: "center",
  },
  saveText: {
    fontFamily: "open-sans-bold",
    color: "black",
    fontSize: 18,
  },
});

export default EditProfileScreen;
