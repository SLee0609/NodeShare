import { getUserData, getPostData } from "./io";

// functions passed to PostOverviewList that is called when refreshing

// accepts userId and returns a list of their posts
const onRefreshUserPosts = async (userId) => {
  if (userId == null) {
    return null;
  }

  const user = await getUserData(userId);

  if (user == null || user.posts == null) {
    return [];
  }

  // first create an array of postIds
  let postIds = [];
  for (const [key, postId] of Object.entries(user.posts)) {
    postIds.unshift(postId);
  }

  // then return user's posts
  const userPosts = await Promise.all(
    postIds.map((postId) => getPostData(postId))
  ).catch((error) => {
    return null;
  });

  return userPosts;
};

// accepts userId and returns a list of their saved posts
const onRefreshUserSavedPosts = async (userId) => {
  if (userId == null) {
    return null;
  }

  const user = await getUserData(userId);

  if (user == null || user.savedPosts == null) {
    return [];
  }

  // first create an array of postIds
  let postIds = [];
  for (const [key, postId] of Object.entries(user.savedPosts)) {
    postIds.unshift(postId);
  }

  // then return user's saved posts
  const savedPosts = await Promise.all(
    postIds.map((postId) => getPostData(postId))
  ).catch((error) => {
    return null;
  });

  return savedPosts;
};

export { onRefreshUserPosts, onRefreshUserSavedPosts };
