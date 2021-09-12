import firebase from "firebase/app";
import { sendChatNotificationMessage } from "./notifications.js";

let storeMessage = async (chatID, uid1, uid2, message) => {
  await sendChatNotificationMessage(uid1, uid2, message);
  const chatref = firebase.firestore().collection("chats").doc(chatID);
  await chatref.get().then((docSnapshot) => {
    chatref.set({ lastmessage: message });
    chatref.update({lasttime: message.createdAt});
    chatref.update({
      users: firebase.firestore.FieldValue.arrayUnion(uid1, uid2),
    });
    chatref.update({
      readed: firebase.firestore.FieldValue.arrayRemove(uid2),
    })
    chatref.update({
      readed: firebase.firestore.FieldValue.arrayUnion(uid1),
    })
    chatref.collection("messages").add(message);
  });
};

export { storeMessage };
