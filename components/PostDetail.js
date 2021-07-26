import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import ProfilePic from "../components/ProfilePicture";
import Colors from "../constants/Colors";
import { DefaultText, normalize } from "./DefaultText";
import { getUserData } from "../io";

// Accepts a post and returns an individual post detail component; used in PostDetailScreen
const PostDetail = (props) => {
  // state for done loading
  const [doneLoading, setDoneLoading] = useState(false);

  // state for userId device's user
  const [userId, setUserId] = useState("");
  // state for post's user data
  const [user, setUser] = useState();

  // state for date
  const [date, setDate] = useState();

  // Get the post we want to display
  const post = props.post;

  // get locally stored userId and post user from database
  const getUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    // update userId
    setUserId(userId);

    const user = await getUserData(post.userId);
    // update user
    setUser(user);

    // set up date
    const newDate = new Date(post.date.seconds * 1000);
    setDate(newDate);

    // update doneLoading
    setDoneLoading(true);
  };

  useEffect(() => {
    getUser();
  }, [props.post]);

  // State for whether post is saved
  const [isSaved, setIsSaved] = useState(false);

  // array of months to display date
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  if (!doneLoading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileContainer}>
          <ProfilePic
            imgUrl={user.profilePicture}
            width={normalize(45, "width")}
            height={normalize(45, "width")}
          />
          <View style={styles.usernameContainer}>
            <DefaultText style={styles.username}>
              {user == null ? "" : user.firstname + " " + user.lastname}
            </DefaultText>
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
        {userId != post.userId ? (
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
        ) : null}
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
            <DefaultText style={styles.description}>
              {months[date.getMonth()] +
                " " +
                date.getDate() +
                ", " +
                date.getFullYear()}
            </DefaultText>
            <DefaultText style={styles.description}>
              {"@ " +
                (date.getHours() % 12) +
                ":" +
                date.getMinutes() +
                (date.getHours() > 11 ? "pm" : "am")}
            </DefaultText>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          <ScrollView
            horizontal={true}
            scrollEnabled={false}
            contentContainerStyle={styles.tagList}
          >
            {post.tags.map((tag) => renderTag(tag))}
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
    paddingTop: normalize(10, "height"),
    paddingHorizontal: normalize(20, "width"),
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    paddingTop: normalize(10, "height"),
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
    justifyContent: "space-evenly",
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
