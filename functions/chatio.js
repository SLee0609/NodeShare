import firebase from "firebase/app";
import { sendChatNotificationMessage } from "./notifications";

let storeMessage = async (chatID, uid1, uid2, message) => {
  const chatref = firebase.firestore().collection("chats").doc(chatID);
  await chatref.get().then((docSnapshot) => {
    chatref.set({ lastmessage: message });
    chatref.update({
      users: firebase.firestore.FieldValue.arrayUnion(uid1, uid2),
    });
    chatref.collection("messages").add(message);
    sendChatNotificationMessage(uid2, message);
  });
};

export { storeMessage };
