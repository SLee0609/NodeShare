// all security functions - report post, spam detection, etc

import firebase from "firebase/app";
import {deletePost} from "./io";

// reports a post
// if a post is reported 3 times or more, remove the post from the main collection
// and move it into a separate collection
let reportPost = async (postId, userId) => {
  // get post data
  const postRef = await firebase.firestore().collection("post").doc(postId);
  const postRefGet = await postRef.get();
  var postContent = await postRefGet.data();

  // increase the number of reports in the post database and store the uid who reported it
  postContent.reports ++;
  postContent.reportedBy.push(userId);

  // check if the post has been reported 3 times or more
  if (postContent.reports >= 3) {

    // move the post to reportedPosts
    await firebase
    .firestore()
    .collection("reportedPosts")
    .doc(postId)
    .set(postContent);

    // delete the post from the post database
    deletePost(postId);

    // break the function early
    return;
  }
  
  postRef.set(postContent);
};

export {reportPost};