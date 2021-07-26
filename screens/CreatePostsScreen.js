import React, { useState, useEffect } from "react";
import {
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
import { DefaultText, normalize } from "../components/DefaultText";
import { Alert } from "react-native";
import {
  imagePickerMediaLibrary,
  imagePickerCamera,
  storePostData,
} from "../io";

// Screen where users create new posts
const CreatePostsScreen = (props) => {
  // state for userId and user
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");

  // state for list of tags
  const [tags, updateTags] = useState([]);

  // state for image
  const [image, setImage] = useState();

  // Array used to sort tags (index of each tag is the value used when sorting)
  const tagsOrder = [
    "Information",
    "Services",
    "Sales",
    "Trading",
    "Fun",
    "Other",
  ];

  // get locally stored userId and find user
  const getUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setUserId(userId);
    // find user using userId
    setUser(USERS.find((u) => u.id === userId));
  };

  useEffect(() => {
    getUser();
  }, []);

  // Function called to choose image
  const chooseImage = async () => {
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
      }
    }
    return;
  };

  // Funtion called when clear button is pressed
  const clear = () => {
    setTitle("");
    setDescription("");
    setImage();
    updateTags([]);
  };

  // Funtion called when share button is pressed
  const share = async () => {
    if (image == "") {
      Alert.alert("No image provided");
      return;
    }
    if (title == "") {
      Alert.alert("No title provided");
      return;
    }
    if (description == "") {
      Alert.alert("No description provided");
      return;
    }
    if (tags.length == 0) {
      Alert.alert("No tags selected");
      return;
    }

    // order tags array
    tags.sort((a, b) => {
      return tagsOrder.indexOf(a) - tagsOrder.indexOf(b);
    });

    // save the post to database
    storePostData(userId, title, description, new Date(), tags, image).then(
      () => {
        Alert.alert("Shared!");
        clear();
        return;
      }
    );
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

  // The text "Choose an Image"
  let text;
  if (image == null) {
    text = <DefaultText style={styles.imageText}>Choose an Image</DefaultText>;
  } else {
    text = null;
  }

  // state for title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        extraScrollHeight={normalize(60, "height")}
      >
        <View style={styles.profileContainer}>
          <ProfilePic
            imgUrl={user.profilePicture}
            width={normalize(45, "width")}
            height={normalize(45, "width")}
          />
          <View style={styles.usernameContainer}>
            <DefaultText style={styles.username}>{user.name}</DefaultText>
          </View>
        </View>
        <TouchableOpacity onPress={chooseImage} style={styles.imageContainer}>
          <Image
            source={
              image == null
                ? require("../assets/cameraicon.png")
                : { uri: image.uri }
            }
            style={image == null ? styles.defaultImage : styles.image}
          />
          {text}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <TextInput
              style={styles.titleText}
              placeholder={"Title"}
              placeholderTextColor={"white"}
              value={title}
              onChangeText={(t) => setTitle(t)}
              onEndEditing={(e) => setTitle(e.nativeEvent.text.trim())}
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
              onEndEditing={(e) => setDescription(e.nativeEvent.text.trim())}
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
    borderBottomWidth: normalize(1, "height"),
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
  profileContainer: {
    paddingVertical: normalize(7, "height"),
    paddingLeft: normalize(10, "width"),
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
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  defaultImage: {
    height: "60%",
    resizeMode: "contain",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    resizeMode: "cover",
  },
  imageText: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
  },
  textContainer: {
    marginTop: normalize(5, "height"),
    paddingHorizontal: normalize(20, "width"),
  },
  titleContainer: {
    paddingVertical: normalize(5, "height"),
    marginBottom: normalize(5, "height"),
    borderColor: "white",
    borderBottomWidth: normalize(1, "height"),
  },
  titleText: {
    fontSize: normalize(18, "width"),
    fontFamily: "open-sans-bold",
    color: "white",
  },
  descriptionContainer: {
    paddingBottom: normalize(10, "height"),
    marginBottom: normalize(5, "height"),
    borderBottomColor: "white",
    borderBottomWidth: normalize(1, "height"),
  },
  description: {
    fontSize: normalize(16, "width"),
    fontFamily: "open-sans",
    color: "white",
  },
  selectTagTextContainer: {
    marginLeft: normalize(10, "width"),
  },
  selectTagText: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "white",
    marginTop: normalize(5, "height"),
  },
  tagsContainer: {
    width: "100%",
    paddingLeft: normalize(10, "width"),
  },
  yellowTagContainer: {
    marginTop: normalize(10, "height"),
    marginLeft: normalize(10, "width"),
    marginRight: normalize(5, "width"),
    paddingVertical: normalize(5, "height"),
    paddingHorizontal: normalize(10, "width"),
    backgroundColor: "yellow",
    borderRadius: normalize(10, "width"),
  },
  whiteTagContainer: {
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
  buttonsContainer: {
    marginVertical: normalize(35, "height"),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  clearButton: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: normalize(30, "width"),
    paddingVertical: normalize(10, "height"),
    borderRadius: normalize(20, "width"),
  },
  clearText: {
    fontFamily: "open-sans-bold",
    color: "white",
    fontSize: 18,
  },
  shareButton: {
    backgroundColor: Colors.logoBlue,
    paddingHorizontal: normalize(30, "width"),
    paddingVertical: normalize(10, "height"),
    borderRadius: normalize(20, "width"),
  },
  shareText: {
    fontFamily: "open-sans-bold",
    color: "black",
    fontSize: 18,
  },
});

export default CreatePostsScreen;
