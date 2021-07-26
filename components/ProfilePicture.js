import React from "react";
import { StyleSheet } from "react-native";
import ProfilePicture from "react-native-profile-picture";

import { normalize } from "../components/DefaultText";

// Accepts an image URL, height, and width and returns a profile picture component
const ProfilePic = (props) => {
  if (props.imgUrl != null) {
    return (
      <ProfilePicture
        isPicture={true}
        URLPicture={props.imgUrl}
        width={props.width}
        height={props.height}
        pictureStyle={styles.picture}
      />
    );
  } else {
    return (
      <ProfilePicture
        isPicture={true}
        requirePicture={require("../assets/defaultprofilepicture.png")}
        width={props.width}
        height={props.height}
        pictureStyle={styles.picture}
      />
    );
  }
};

const styles = StyleSheet.create({
  picture: {
    borderColor: "black",
    borderWidth: normalize(2, "width"),
    resizeMode: "cover",
  },
});

export default ProfilePic;
