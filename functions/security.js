// all security functions - report post, spam detection, etc

import firebase from "firebase/app";

// reports a post
// if a post is reported 3 times or more, remove the post from the main collection
// and move it into a separate collection
let reportPost = async (postId, userId) => {
  // get post data
  const postRef = firebase.firestore().collection("post").doc(postId);
  const postRefGet = await postRef.get();
  var postContent = postRefGet.data();

  // store the uid who reported it
  if (!postContent.reportedBy.includes(userId)) {
    postContent.reportedBy.push(userId);
  }

  // check if the post has been reported 3 times or more
  if (postContent.reportedBy.length >= 3) {
    // move the post to reportedPosts
    // post should be stored in a separate collection so it isn't seen in the app
    // but in case there was a wrong report or more investigation is needed
    // the information should be kept in the database until further review
    await firebase
      .firestore()
      .collection("reportedPosts")
      .doc(postId)
      .set(postContent);

    // delete the post from the post database
    await movePost(postId);

    // break the function early
    return;
  }

  postRef.set(postContent);
};

// changed so that the image is kept in the database - previously it is deleted
let movePost = async (postId) => {
  await firebase.firestore().collection("post").doc(postId).delete();
};

export { reportPost };
