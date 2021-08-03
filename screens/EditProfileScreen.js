import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ProfilePic from "../components/ProfilePicture";
import { DefaultText, normalize } from "../components/DefaultText";
import {
  imagePickerMediaLibrary,
  imagePickerCamera,
  updateUserData,
  getUserData,
} from "../functions/io";
import Colors from "../constants/Colors";

const EditProfileScreen = (props) => {
  // state for userId
  const [userId, setUserId] = useState(props.navigation.getParam("userId"));
  // state for user
  const [user, setUser] = useState(props.navigation.getParam("user"));

  // state for saving
  const [saving, setSaving] = useState(false);

  // state for profile image
  const [image, setImage] = useState();
  // state for profile image uri
  const [imageUri, setImageUri] = useState(user.profilePicture);
  // state for first name
  const [firstName, setFirstName] = useState(user.firstname);
  // state for last name
  const [lastName, setLastName] = useState(user.lastname);
  // state for occupation
  const [occupation, setOccupation] = useState(user.occupation);
  // state for residency
  const [residency, setResidency] = useState(user.residency);
  // state for bio
  const [bio, setBio] = useState(user.bio);

  // function called when change profile photo button is pressed
  const changeProfilePic = () => {
    Alert.alert("Image", "", [
      { text: "Take a photo", onPress: useCamera },
      { text: "Choose from media library", onPress: useMediaLibrary },
      { text: "Cancel", style: "destructive" },
    ]);
    return;
  };

  // Function to get and update image from media library
  const useMediaLibrary = async () => {
    let result = await imagePickerMediaLibrary({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result != null) {
      if (!result.cancelled) {
        setImage(result);
        setImageUri(result.uri);
      }
    }
    return;
  };

  // Function to get and update image from camera
  const useCamera = async () => {
    let result = await imagePickerCamera({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result != null) {
      if (!result.cancelled) {
        setImage(result);
        setImageUri(result.uri);
      }
    }
    return;
  };

  // function called when cancel button is pressed
  const cancel = async () => {
    setUser(await getUserData(userId));
    setImage();
    setImageUri(user.profilePicture);
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setOccupation(user.occupation);
    setResidency(user.residency);
    setBio(user.bio);
  };

  // function called when save button is pressed
  const save = async () => {
    if (firstName == "") {
      Alert.alert("No first name provided");
      return;
    }
    if (lastName == "") {
      Alert.alert("No last name provided");
      return;
    }
    if (occupation == null) {
      Alert.alert("No occupation selected");
      return;
    }
    if (residency == null) {
      Alert.alert("No residency selected");
      return;
    }

    // set saving to true
    setSaving(true);

    // update user information in database
    updateUserData(
      userId,
      firstName,
      lastName,
      occupation,
      residency,
      bio,
      image
    ).then(async () => {
      Alert.alert("Saved!");
      await cancel();
      // set saving to false
      setSaving(false);
      return;
    });
  };

  // render activity indicator when saving
  if (saving) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  } else {
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
                <TextInput
                  style={styles.bio}
                  placeholder={"First Name"}
                  placeholderTextColor={"gray"}
                  value={firstName}
                  onChangeText={(t) => setFirstName(t)}
                  onEndEditing={(e) => setFirstName(e.nativeEvent.text.trim())}
                />
              </View>
              <View style={styles.bioContainer}>
                <TextInput
                  style={styles.bio}
                  placeholder={"Last Name"}
                  placeholderTextColor={"gray"}
                  value={lastName}
                  onChangeText={(t) => setLastName(t)}
                  onEndEditing={(e) => setLastName(e.nativeEvent.text.trim())}
                />
              </View>
              <View style={styles.bioContainer}>
                <RNPickerSelect
                  style={{
                    placeholder: styles.bioGray,
                    inputIOS: styles.bio,
                    inputAndroid: styles.bio,
                  }}
                  value={occupation == null ? "Select Occupation" : occupation}
                  onValueChange={(value) => setOccupation(value)}
                  placeholder={{ label: "Select Occupation", value: null }}
                  items={[
                    { label: "Student", value: "Student" },
                    { label: "Faculty", value: "Faculty" },
                  ]}
                />
              </View>
              <View style={styles.bioContainer}>
                <RNPickerSelect
                  style={{
                    placeholder: styles.bioGray,
                    inputIOS: styles.bio,
                    inputAndroid: styles.bio,
                  }}
                  value={residency == null ? "Select Residency" : residency}
                  onValueChange={(value) => setResidency(value)}
                  placeholder={{ label: "Select Residency", value: null }}
                  items={[
                    { label: "On Campus", value: "On Campus" },
                    { label: "Off Campus", value: "Off Campus" },
                  ]}
                />
              </View>
              <View style={styles.bioContainerBottom}>
                <TextInput
                  style={styles.bioNotBold}
                  multiline={true}
                  textAlignVertical={"top"}
                  placeholder={"Optional Bio"}
                  placeholderTextColor={"gray"}
                  value={bio}
                  onChangeText={(d) => setBio(d)}
                  onEndEditing={(e) =>
                    setBio(
                      e.nativeEvent.text.replace(/^\s*[\r\n]/gm, "").trim()
                    )
                  }
                />
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
  }
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
    flex: 1,
    marginBottom: normalize(10, "height"),
    borderBottomColor: "gray",
    borderBottomWidth: normalize(1, "height"),
  },
  bioContainerBottom: {
    flex: 1,
    borderBottomColor: "black",
    borderBottomWidth: normalize(1, "height"),
  },
  bio: {
    fontSize: 15,
    paddingBottom: normalize(10, "height"),
    paddingLeft: normalize(10, "width"),
    fontFamily: "open-sans-bold",
    color: "white",
  },
  bioGray: {
    fontSize: 15,
    paddingBottom: normalize(10, "height"),
    paddingLeft: normalize(10, "width"),
    fontFamily: "open-sans-bold",
    color: "gray",
  },
  bioNotBold: {
    fontSize: 15,
    paddingBottom: normalize(10, "height"),
    paddingLeft: normalize(10, "width"),
    fontFamily: "open-sans",
    color: "white",
    paddingTop: 0,
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
