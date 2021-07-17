import React, { useState } from "react";
import {
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfilePic from "../components/ProfilePicture";
import { CATEGORIES, USERS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import DefaultText from "../components/DefaultText";
import { Alert } from "react-native";

// Screen where users create new posts
const CreatePostsScreen = (props) => {
  // state for user
  const [user, setUser] = useState("");

  // state for list of tags
  const [tags, updateTags] = useState([]);

  // get locally stored userId and find user
  const getUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    // find user using userId
    setUser(USERS.find((u) => u.id === userId));
  };
  getUser();

  // Function called to choose image
  const chooseImage = () => {
    Alert.alert("Choose Image");
  };

  // Funtion called when clear button is pressed
  const clear = () => {
    setTitle("");
    setDescription("");
    updateTags([]);
  };

  // Funtion called when share button is pressed
  const share = () => {
    Alert.alert("Shared!");
  };

  // Function that renders a tag
  const renderTag = (tag) => {
    return (
      <TouchableOpacity
        key={tag}
        onPress={() =>
          tags.includes(tag)
            ? updateTags(tags.filter((t) => t != tag))
            : updateTags([...tags, tag])
        }
        style={
          tags.includes(tag)
            ? styles.yellowTagContainer
            : styles.whiteTagContainer
        }
      >
        <DefaultText style={styles.tagText}>{tag}</DefaultText>
      </TouchableOpacity>
    );
  };

  // state for title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView style={styles.scrollView} extraScrollHeight={60}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePictureContainer}>
            <ProfilePic imgUrl={user.profilePicture} width={45} height={45} />
          </View>
          <View style={styles.usernameContainer}>
            <DefaultText style={styles.username}>{user.name}</DefaultText>
          </View>
        </View>
        <TouchableOpacity onPress={chooseImage} style={styles.imageContainer}>
          <Image
            source={require("../assets/cameraicon.png")}
            style={styles.image}
          />
          <DefaultText style={styles.imageText}>Choose an Image</DefaultText>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <TextInput
              style={styles.titleText}
              placeholder={"Title"}
              placeholderTextColor={"white"}
              value={title}
              onChangeText={(t) => setTitle(t)}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <TextInput
              style={styles.description}
              multiline={true}
              textAlignVertical={"top"}
              blurOnSubmit={true}
              placeholder={"Description\n\n"}
              placeholderTextColor={"white"}
              value={description}
              onChangeText={(d) => setDescription(d)}
            />
          </View>
        </View>
        <View style={styles.tagsContainer}>
          <View style={styles.selectTagTextContainer}>
            <DefaultText style={styles.selectTagText}>Select Tags</DefaultText>
          </View>
          <ScrollView
            horizontal={true}
            scrollEnabled={false}
            contentContainerStyle={styles.tagList}
          >
            {CATEGORIES.map((tag) => renderTag(tag))}
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={clear}>
            <View style={styles.clearButton}>
              <DefaultText style={styles.clearText}>Clear</DefaultText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={share}>
            <View style={styles.shareButton}>
              <DefaultText style={styles.shareText}>Share</DefaultText>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

CreatePostsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Create Post",
  };
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
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.3,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    height: "70%",
    resizeMode: "contain",
  },
  imageText: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
  },
  textContainer: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  titleContainer: {
    paddingVertical: 5,
    marginBottom: 5,
    borderColor: "white",
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  descriptionContainer: {
    paddingBottom: 10,
    marginBottom: 5,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  description: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "white",
  },
  selectTagTextContainer: {
    marginLeft: 10,
  },
  selectTagText: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "white",
    marginTop: 5,
  },
  tagsContainer: {
    width: "100%",
    paddingLeft: 10,
  },
  yellowTagContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "yellow",
    borderRadius: 10,
  },
  whiteTagContainer: {
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
  buttonsContainer: {
    marginVertical: 35,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  clearButton: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  clearText: {
    fontFamily: "open-sans-bold",
    color: "white",
    fontSize: 18,
  },
  shareButton: {
    backgroundColor: Colors.logoBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  shareText: {
    fontFamily: "open-sans-bold",
    color: "black",
    fontSize: 18,
  },
});

export default CreatePostsScreen;
