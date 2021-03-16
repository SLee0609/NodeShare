import React from "react";
import { StyleSheet } from "react-native";
import ProfilePicture from "react-native-profile-picture";

// Accepts an image URL, height, and width and returns a profile picture component
const ProfilePic = (props) => {
  return (
    <ProfilePicture
      isPicture={true}
      URLPicture={props.imgUrl}
      width={props.width}
      height={props.height}
      pictureStyle={styles.picture}
    />
  );
};

const styles = StyleSheet.create({
  picture: {
    borderColor: "black",
    borderWidth: 2,
  },
});

export default ProfilePic;
