/**
 * database io funcs
 * treat this file like a mini library - import these functions
 * to be used wherever they are needed
 * 
 * !!!!!!!!!!
 * REMEMBER TO CHANGE SECURITY SETTINGS AFTER TESTING AND AUTH IS SET UP
 */

import firebase from 'firebase/app';
import db from './firebase/config';

import * as ImagePicker from 'expo-image-picker';

// returns image in form of blob (able to be stored by firebase)
let imagePickerMediaLibrary = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  return pickerResult;
}

// pic is the image object (generated from imagePickerMediaLibrary)
let storeUserProfilePic = async (userID, pic) => {
  const picuri = await fetch(pic.uri);
  const blob = await picuri.blob();
  firebase.storage().ref().child(userID + '/profilepic.jpg').put(blob);
}

/**
 * RTDB
 */
// stores new user data
function storeUserData(userID, firstname, lastname) {
  firebase.database().ref('users/' + userID).set({
    firstname: firstname,
    lastname: lastname,
  });
}

// unused for now
function storePostToUser(userID, postID) {
  return null;
}

  
// retrieving data every time the data is changed - 'value' is called everytime data changes
// function getDataUpdate (userID) {
//   // set up path to data
//   var user = firebase.database().ref('users/' + userID);
//   // retrieve snapshot of the path
//   user.on('value', (snapshot) => {
//     // val() gets the data
//     const exampleStr = snapshot.val().string;
//     // output the data of snapshot
//     console.log(exampleStr);
//     return exampleStr;
//   })
// }
  
// retreiving data once
// use JSON.parse to parse data before return
function getDataOnce(userID) {
  // sets up path
  const db = firebase.database().ref();
  db.child('users').child(userID).get().then((snapshot) =>{
    // checks if data exists
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data available');
    }
  }).catch((error) => {
    console.error(error);
  })
}


/**
 * cloud firestore
 */


// create instance of db
// set values in the chosen document document
function storePostData(postID, postTitle, postContent) {
  firebase.firestore().collection("post").doc(postID).set({
      title: postTitle,
      content: postContent
  })
}

function getPostData(postID) {
  firebase.firestore().collection('post').doc(postID).get().then((doc) => {
    if(doc.exists) {
      console.log('Document Data:', doc.data());
    } else {
      console.log('invalid');
    }
  }).catch((error) => {
    console.log('error');
  })
}

export {imagePickerMediaLibrary, storeUserProfilePic, storeUserData, getDataOnce, storePostData, getPostData};


/**
 * how the data is structured:
 * 
 * user data (rtdb):
 * users/
 *  -> uid (auto gen)
 *    -> name
 *    -> profile pic
 *    -> posts
 *      -> post id (auto gen)
 * 
 * 
 */