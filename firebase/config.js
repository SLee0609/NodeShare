import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2beqmwMy231hJQL350rx4TjdrOGc5S2M",
  authDomain: "lclink.firebaseapp.com",
  databaseURL: "https://lclink-default-rtdb.firebaseio.com/",
  projectId: "lclink",
  storageBucket: "lclink.appspot.com",
  messagingSenderId: "569767698533",
  appId: "1:569767698533:ios:ffa5c453dec18a6033a68c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase };
