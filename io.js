import firebase from 'firebase/app';

/** realtime database sample
 *  realtime database is in the form of a JSON tree
 *  sample database function - write sample data into database on load
 *  use this format and change to wherever needed
 *  this is the function - call when needed
 */

 function storeData (userID, exampleStr) {
    // store exampleStr according to the path noted in ref
    // set() replaces any data at that path
    firebase.database().ref('users/' + userID).set({string: exampleStr});
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
   * firestore is arranged in a collection of documents
   * (a document is basically a JS object)
   */
  // create instance of db
  // const firestoredb = firebase.firestore()
  // // set values in the chosen document document
  // firestoredb.collection("users").doc("user1").set({
  //     id: 'abcd',
  //     age: '18'
  // })

  export {storeData, getDataOnce};