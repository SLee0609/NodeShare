import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";

// notifications setup file - need a way to store push tokens in db

// sets up permission for push notifications
let registerNotifications = async () => {
  let token;
  // make sure the device is a physical device
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert(
        "Notifications are not enabled. Enable them in settings if you want to receive notifications."
      );
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    await AsyncStorage.setItem("expoPushToken", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

let storeToken = async (userId) => {
  // notifications setup - used to store push token into database
  var tokenExists = false;
  var token = await AsyncStorage.getItem("expoPushToken");
  var tokenRef = await firebase
    .database()
    .ref("users/" + userId + "/pushTokens");
  // checks if the push token has been stored in the db already
  await tokenRef.get().then((dbTokenRef) => {
    dbTokenRef.forEach((dbtoken) => {
      // stringify object retrieved from db then remove ""
      var dbtokenString = JSON.stringify(dbtoken);
      dbtokenString = dbtokenString.substring(1, dbtokenString.length - 1);
      if (dbtokenString == token) {
        tokenExists = true;
      }
    });
  });
  // if the token has not been stored yet, store it
  if (!tokenExists) {
    await tokenRef.push(token);
  }
};

// removes the push token from db when user is logged out
let removeToken = async (userId) => {
  var token = await AsyncStorage.getItem("expoPushToken");
  var tokenRef = await firebase
    .database()
    .ref("users/" + userId + "/pushTokens")
    .get();
  var tokenRefValue = tokenRef.val();

  // loops through the object using the keys
  Object.keys(tokenRefValue).forEach((key) => {
    // stringify object retrieved from db then remove ""
    var dbtokenString = JSON.stringify(tokenRefValue[key]);
    dbtokenString = dbtokenString.substring(1, dbtokenString.length - 1);
    // checks which token in db matches the token stored locally
    if (dbtokenString == token) {
      // remove the db token
      firebase
        .database()
        .ref("users/" + userId + "/pushTokens/" + key)
        .remove();
    }
  });
  // remove the local token
  AsyncStorage.removeItem("expoPushToken");
};

// takes in userId and message, and sends the notification to the devices of the userId
// in the format of (name, message)
// sendUserId is the uid of the person who sent the notification
let sendChatNotificationMessage = async (sendUserId, userId, messageObj) => {
  var messageText = messageObj.text;

  // name of the user who sent the message
  var sendUserRef = await (
    await firebase
      .database()
      .ref("users/" + sendUserId)
      .get()
  ).val();
  var userName = sendUserRef.firstname.concat(" ", sendUserRef.lastname);

  var tokens = await firebase
    .database()
    .ref("users/" + userId + "/pushTokens")
    .get();
  tokens.forEach(async (pushToken) => {
    var currScreen = await firebase.database().ref('users/' + userId + '/currChatScreen').get();
    var currScreenData = currScreen.val();

    // send the notification if the receiving user is not on any chat screen
    // or if the receiving user is not on the chat screen of the send user
      if ((currScreenData == null || currScreenData == 'noUser') || currScreenData != sendUserId) {
        var dbtokenString = JSON.stringify(pushToken);
        dbtokenString = dbtokenString.substring(1, dbtokenString.length - 1);

        var message = {
          to: dbtokenString,
          sound: "default",
          title: userName,
          body: messageText,
        };

        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      }
  });
};

// tracks the current screen that the user is on
let enterChatScreen = async (uid) => {
  userId = await AsyncStorage.getItem('userId');
  await firebase.database().ref('users/' + userId + '/currChatScreen').set(uid);
}

// set the current screen to an empty string
let exitChatScreen = async () => {
  userId = await AsyncStorage.getItem('userId');
  await firebase.database().ref('users/' + userId + '/currChatScreen').set('noUser');
}


export {
  registerNotifications,
  sendChatNotificationMessage,
  storeToken,
  removeToken,
  enterChatScreen,
  exitChatScreen,
};
