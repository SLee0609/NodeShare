import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

import ProfilePic from "../components/ProfilePicture";
import { USERS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";

// Accepts a post and returns an individual post detail component; used in PostDetailScreen
const PostDetail = (props) => {
  // Get the post we want to display
  const post = props.post;
  // Get the user information
  const user = USERS.find((u) => u.id === post.userId);

  // State for whether post is bookmarked
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Function called when three dots icon is pressed
  const onDotsPress = () => {
    Alert.alert("Three Dots Pressed");
  };

  // Function called when message icon is pressed
  const onMessagePress = () => {
    Alert.alert("Message Pressed");
  };

  // Function called when bookmark icon is pressed
  const onBookmarkPress = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureContainer}>
          <ProfilePic imgUrl={user.profilePicture} width={45} height={45} />
        </View>
        <View style={styles.usernameContainer}>
          <DefaultText style={styles.username}>{user.name}</DefaultText>
        </View>
        <View style={styles.dotsIconContainer}>
          <TouchableOpacity onPress={onDotsPress}>
            <Entypo name="dots-three-horizontal" size={25} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: post.image }} style={styles.image} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onMessagePress}>
          <Ionicons
            name="paper-plane-outline"
            size={30}
            color={"white"}
            style={{
              transform: [
                { translateY: -4 },
                { scaleY: 1.15 },
                { rotateZ: "20deg" },
              ],
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onBookmarkPress}>
          <FontAwesome
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={30}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <DefaultText style={styles.titleText}>{post.title}</DefaultText>
        </View>
        <Text>
          <DefaultText style={styles.usernameText}>{user.name} </DefaultText>
          <DefaultText style={styles.description}>
            {post.description}
          </DefaultText>
        </Text>
        <View style={styles.timeContainer}>
          <DefaultText style={styles.description}>{post.time}</DefaultText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.3,
  },
  profileContainer: {
    width: "100%",
    paddingVertical: 7,
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: "row",
  },
  profilePictureContainer: {
    justifyContent: "center",
  },
  usernameContainer: {
    paddingLeft: 15,
    justifyContent: "center",
  },
  username: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  dotsIconContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.3,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  titleContainer: {
    width: "100%",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  usernameText: {
    fontSize: 17,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  description: {
    fontSize: 18,
    fontFamily: "open-sans",
    color: "white",
    marginTop: 10,
  },
  timeContainer: {
    alignItems: "flex-end",
  },
});

export default PostDetail;
