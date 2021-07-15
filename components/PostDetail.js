import React, { useState } from "react";
import {
  Text,
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
import DefaultText from "./DefaultText";

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
          <TouchableOpacity onPress={onSavePress}>
            <FontAwesome
              name={isSaved ? "bookmark" : "bookmark-o"}
              size={30}
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
    borderBottomWidth: 0.3,
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
  profileContainer: {
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 5,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  descriptionContainer: {
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "white",
  },
  timeContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  tagsContainer: {
    padding: 10,
  },
  tagContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
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
