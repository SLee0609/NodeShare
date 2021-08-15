/**
 * database io funcs
 * treat this file like a mini library - import these functions
 * to be used wherever they are needed
 *
 * !!!!!!!!!!
 * REMEMBER TO CHANGE SECURITY SETTINGS AFTER TESTING AND AUTH IS SET UP
 *
 * reminder to add catches to errors (no data, offline, etc)
 */

import firebase from "firebase/app";
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
  await firebase
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
  await firebase
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

// updates user data
async function updateUserData(
  userID,
  firstname,
  lastname,
  occupation,
  residency,
  bio,
  image
) {
  await firebase
    .database()
    .ref("users/" + userID)
    .update({
      firstname: firstname,
      lastname: lastname,
      occupation: occupation,
      residency: residency,
      bio: bio,
    });
  if (image != null && image != "") {
    await storeUserProfilePic(userID, image);
    await firebase
      .database()
      .ref("users/" + userID)
      .update({
        profilePicture: await retrieveUserProfilePic(userID),
      });
  } else if (image != "") {
    firebase
      .database()
      .ref("users/" + userID + "/profilePicture")
      .once("value")
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          await firebase
            .database()
            .ref("users/" + userID + "/profilePicture")
            .remove();
        }
      });
    firebase
      .storage()
      .ref()
      .child("users/" + userID + "/profilepic.jpg")
      .getDownloadURL()
      .then(
        async () => {
          await firebase
            .storage()
            .ref()
            .child("users/" + userID + "/profilepic.jpg")
            .delete();
        },
        () => {}
      );
  }
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
    });
  await storePostPic(postId, pic);
  await firebase
    .firestore()
    .collection("post")
    .doc(postId)
    .update({
      postId: postId,
      image: await retrievePostPic(postId),
    });
}

let getPostData = async (postID) => {
  const snapshot = await firebase
    .firestore()
    .collection("post")
    .doc(postID)
    .get();
  return snapshot.data();
};

// gets all posts from category - pass in a string
// returns array of post objects
let getPostFromCategory = async (category) => {
  let categoryPosts = [];
  await firebase
    .firestore()
    .collection("post")
    .where("tags", "array-contains", category)
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        categoryPosts.push(doc.data());
      });
    });
  return categoryPosts;
};

// gets all posts posted from a user - pass in userID as a string
// returns array of post objects
let getPostsFromUser = async (userID) => {
  if (userID == null) {
    return null;
  }

  let userPosts = [];
  await firebase
    .firestore()
    .collection("post")
    .where("userId", "==", userID)
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userPosts.push(doc.data());
      });
    });
  return userPosts;
};

// gets all posts - probably shouldn't be used
let getAllPosts = async () => {
  let posts = [];
  await firebase
    .firestore()
    .collection("post")
    .orderBy("date", "desc")
    .get()
    .then((allPosts) => {
      allPosts.forEach((doc) => {
        posts.push(doc.data());
      });
    });
  return posts;
};

// get the latest post - input the number of posts you want
let getLatestPosts = async (num) => {
  let posts = [];
  await firebase
    .firestore()
    .collection("post")
    .orderBy("date", "desc")
    .limit(num)
    .get()
    .then((newPosts) => {
      newPosts.forEach((doc) => {
        posts.push(doc.data());
      });
    });
  return posts;
};

// lets a user save a post
let storeUserSavedPost = async (uid, postID) => {
  await firebase
    .firestore()
    .collection("post")
    .doc(postID)
    .update({
      savedUsers: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};

// lets a user remove a saved post
let removeUserSavedPost = async (uid, postID) => {
  await firebase
    .firestore()
    .collection("post")
    .doc(postID)
    .update({
      savedUsers: firebase.firestore.FieldValue.arrayRemove(uid),
    });
};

// returns boolean based on whether user saved a given post
let isPostSaved = async (uid, postID) => {
  const snapshot = await firebase
    .firestore()
    .collection("post")
    .doc(postID)
    .get();
  if (snapshot.data().savedUsers == null) {
    return false;
  } else {
    return snapshot.data().savedUsers.includes(uid);
  }
};

// gets a user's saved posts
let getUserSavedPosts = async (userID) => {
  if (userID == null) {
    return null;
  }

  let savedPosts = [];
  await firebase
    .firestore()
    .collection("post")
    .where("savedUsers", "array-contains", userID)
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        savedPosts.push(doc.data());
      });
    });
  return savedPosts;
};

// deletes post data
let deletePost = async (postID) => {
  await firebase.firestore().collection("post").doc(postID).delete();

  await firebase
    .storage()
    .ref()
    .child("posts/" + postID + "/postpic.jpg")
    .delete();
};

export {
  // image funcs
  imagePickerMediaLibrary,
  imagePickerCamera,
  // user db funcs
  storeUserData,
  updateUserData,
  getUserData,
  storeUserSavedPost,
  removeUserSavedPost,
  isPostSaved,
  getUserSavedPosts,
  // post db funcs
  storePostData,
  getPostData,
  getPostFromCategory,
  getPostsFromUser,
  getAllPosts,
  getLatestPosts,
  deletePost,
};

/**
 * how the data is structured:
 *
 * user data (rtdb):
 * users/
 *  -> uid (auto gen)
 *    -> firstname
 *    -> lastname
 *    -> profilePicture
 *    -> bio
 *    -> occupation
 *    -> residency
 *
 * post (firestore)
 * posts/
 *  -> postId
 *    -> userId
 *    -> firstname
 *    -> lastname
 *    -> postId
 *    -> title
 *    -> description
 *    -> image
 *    -> [tags]
 *    -> [savedUsers]
 *    -> date
 */
