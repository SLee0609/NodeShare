import firebase from "firebase/app";

let storeMessage = async (chatID, message) => {
    const chatref = firebase.firestore().collection('messaging').doc(chatID);
    await chatref.get().then((docSnapshot)=>{
        if (docSnapshot.exists) {
            chatref.onSnapshot((doc) => {
              chatref.update({ //vs doc.update
                messages: firebase.firestore.FieldValue.arrayUnion(message),
              });
            });
          } else {
            chatref.set({
                messages: firebase.firestore.FieldValue.arrayUnion(message),
              }) // create the document
          }
     });
//   await firebase.firestore().collection("messaging").doc("examplechatid").update({
//     messages: firebase.firestore.FieldValue.arrayUnion(message),
//   });
};

export { storeMessage };
