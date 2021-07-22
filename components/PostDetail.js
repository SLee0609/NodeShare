import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import ProfilePic from "../components/ProfilePicture";
import { USERS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import { DefaultText, normalize } from "./DefaultText";

// Accepts a post and returns an individual post detail component; used in PostDetailScreen
const PostDetail = (props) => {
  // Get the post we want to display
  const post = props.post;
  // Get the user information
  const user = USERS.find((u) => u.id === post.userId);

  // State for whether post is saved
  const [isSaved, setIsSaved] = useState(false);

  // Function called when three dots icon is pressed
  const onDotsPress = () => {
    Alert.alert("Three Dots Pressed");
  };

  // Function called when message icon is pressed
  const onMessagePress = () => {
    Alert.alert("Message Pressed");
  };

  // Function called when save icon is pressed
  const onSavePress = () => {
    if (Platform.OS === "ios" && !isSaved) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsSaved(!isSaved);
  };

  // Function that renders a tag
  const renderTag = (tag) => {
    return (
      <View key={tag} style={styles.tagContainer}>
        <DefaultText style={styles.tagText}>{tag}</DefaultText>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePictureContainer}>
            <ProfilePic
              imgUrl={user.profilePicture}
              width={normalize(45, "width")}
              height={normalize(45, "width")}
            />
          </View>
          <View style={styles.usernameContainer}>
            <DefaultText style={styles.username}>{user.name}</DefaultText>
          </View>
          <View style={styles.dotsIconContainer}>
            <TouchableOpacity onPress={onDotsPress}>
              <Entypo
                name="dots-three-horizontal"
                size={normalize(25, "width")}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image source={{ uri: post.image }} style={styles.image} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onMessagePress}>
            <Ionicons
              name="paper-plane-outline"
              size={normalize(30, "width")}
              color={"white"}
              style={{
                transform: [
                  { translateY: normalize(-4, "height") },
                  { scaleY: 1.15 },
                  { rotateZ: "20deg" },
                ],
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSavePress}>
            <FontAwesome
              name={isSaved ? "bookmark" : "bookmark-o"}
              size={normalize(30, "width")}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <DefaultText style={styles.titleText}>{post.title}</DefaultText>
          </View>
          <View style={styles.descriptionContainer}>
            <DefaultText style={styles.description}>
              {post.description}
            </DefaultText>
          </View>
          <View style={styles.timeContainer}>
            <DefaultText style={styles.description}>{post.time}</DefaultText>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          <ScrollView
            horizontal={true}
            scrollEnabled={false}
            contentContainerStyle={styles.tagList}
          >
            {post.categories.map((tag) => renderTag(tag))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
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
    paddingVertical: normalize(7, "height"),
    paddingLeft: normalize(10, "width"),
    paddingRight: normalize(15, "width"),
    flexDirection: "row",
  },
  profilePictureContainer: {
    justifyContent: "center",
  },
  usernameContainer: {
    paddingLeft: normalize(15, "width"),
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
    height: Dimensions.get("window").width,
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingVertical: normalize(10, "height"),
    paddingHorizontal: normalize(20, "width"),
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    paddingHorizontal: normalize(20, "width"),
  },
  titleContainer: {
    marginBottom: normalize(5, "height"),
  },
  titleText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  descriptionContainer: {
    marginTop: normalize(5, "height"),
  },
  description: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "white",
  },
  timeContainer: {
    marginTop: normalize(10, "height"),
    alignItems: "flex-end",
  },
  tagsContainer: {
    padding: normalize(10, "width"),
  },
  tagContainer: {
    marginTop: normalize(10, "height"),
    marginLeft: normalize(10, "width"),
    marginRight: normalize(5, "width"),
    paddingVertical: normalize(5, "height"),
    paddingHorizontal: normalize(10, "width"),
    backgroundColor: "white",
    borderRadius: normalize(10, "width"),
  },
  tagList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagText: {
    color: "black",
    fontSize: 15,
    fontFamily: "open-sans-bold",
  },
});

export default PostDetail;
