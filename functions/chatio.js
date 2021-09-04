import firebase from "firebase/app";

let storeMessage = async (chatID, message) => {
  const chatref = firebase.firestore().collection("messaging").doc(chatID);
  await chatref.get().then((docSnapshot) => {
    chatref.collection("messages").add(message);
  });
};

export { storeMessage };
