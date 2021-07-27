/**
 * database io funcs
 * treat this file like a mini library - import these functions
 * to be used wherever they are needed
 *
 * !!!!!!!!!!
 * REMEMBER TO CHANGE SECURITY SETTINGS AFTER TESTING AND AUTH IS SET UP
 */

import firebase from "firebase/app";
import db from "./firebase/config";

import * as ImagePicker from "expo-image-picker";

// returns image in form of blob (able to be stored by firebase)
// figure out a way to have event listeners to make sure the picture is actually
// taken when uploaded, since this is an async func
let imagePickerMediaLibrary = async ({ allowsEditing, aspect }) => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access media library is required");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: allowsEditing,
    aspect: aspect,
  });

  return pickerResult;
};

let imagePickerCamera = async ({ allowsEditing, aspect }) => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera is required");
    return;
  }

  let pickerResult = await ImagePicker.launchCameraAsync({
    allowsEditing: allowsEditing,
    aspect: aspect,
  });

  return pickerResult;
};

// pic is the image object (generated from imagePickerMediaLibrary or imagePickerCamera)
let storeUserProfilePic = async (userID, pic) => {
  const picuri = await fetch(pic.uri);
  const blob = await picuri.blob();
  firebase
    .storage()
    .ref()
    .child("users/" + userID + "/profilepic.jpg")
    .put(blob);
};

// tested - returns download url (not sure how it is used with expo)
let retrieveUserProfilePic = async (userID) => {
  const url = await firebase
    .storage()
    .ref()
    .child("users/" + userID + "/profilepic.jpg")
    .getDownloadURL();
  return url;
};

let storePostPic = async (postID, pic) => {
  const picuri = await fetch(pic.uri);
  const blob = await picuri.blob();
  firebase
    .storage()
    .ref()
    .child("posts/" + postID + "/postpic.jpg")
    .put(blob);
};

// tested - returns download url (not sure how it is used with expo)
let retrievePostPic = async (postID) => {
  const url = await firebase
    .storage()
    .ref()
    .child("posts/" + postID + "/postpic.jpg")
    .getDownloadURL();
  return url;
};

// stores new user data
async function storeUserData(userID, firstname, lastname, email) {
  await firebase
    .database()
    .ref("users/" + userID)
    .set({
      firstname: firstname,
      lastname: lastname,
      email: email,
    });
}

// retreiving data once
// use JSON.parse to parse data before return
let getUserData = async (userID) => {
  // sets up path
  const db = firebase.database().ref();
  const snapshot = await db.child("users").child(userID).get();
  return snapshot.val();
};

// stores post data - tested
async function storePostData(
  userID,
  postTitle,
  postDescription,
  postCreationDate,
  postCategories,
  pic
) {
  let postId;
  await firebase
    .firestore()
    .collection("post")
    .add({
      userId: userID,
      title: postTitle,
      description: postDescription,
      date: postCreationDate,
      tags: postCategories,
    })
    .then((docRef) => {
      postId = docRef.id;
      /**
       * slightly confusing -
       * all data in rtdb has to be stored in key-value pairs
       * so storing an array ['a', 'b'] would be {0: 'a', 1: 'b'} in the db
       *
       * all user posts are stored in key-value pairs {userPostID: postID}
       * where postID is the actual postID found in firestore/posts
       * and userPostID is a unique ID for the user generated by push(), and its only use
       * is to store the postID in a key-value pair
       *
       * working on a better solution, but this works for now
       */
      firebase
        .database()
        .ref("users/" + userID + "/posts")
        .push(postId);
    })
    .then(() => {
      storePostPic(postId, pic);
    });
}

let getPostData = async (postID) => {
  const snapshot = await firebase
    .firestore()
    .collection("post")
    .doc(postID)
    .get();
  let data = snapshot.data();
  data.id = postID;
  data.image = await retrievePostPic(postID);
  return data;
};

export {
  // image funcs
  imagePickerMediaLibrary,
  imagePickerCamera,
  storeUserProfilePic,
  retrieveUserProfilePic,
  // user db funcs
  storeUserData,
  getUserData,
  // post db funcs
  storePostData,
  getPostData,
};

/**
 * how the data is structured:
 *
 * user data (rtdb):
 * users/
 *  -> uid (auto gen)
 *    -> firstname
 *    -> lastname
 *    -> profile pic
 *    -> grad year
 *    -> posts
 *      -> postid (auto gen)
 *    -> savedPosts
 *      -> postid
 *
 * post (firestore)
 * posts/
 *  -> postid
 *    -> userId
 *    -> title
 *    -> description
 *    -> image
 *    -> [tags]
 *    -> creation date
 */
