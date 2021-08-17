// search local posts using given keywords
// improvements to make - removing filler words (e.g. it, is, the, a, etc.)
// add username into post content to be searched

// assumes that the post array is passed in based on date
let searchByDate = async (posts, keyword) => {
  const matchingPosts = await searchPosts(posts, keyword);
  const postIDs = await findPostIDByDate(matchingPosts, posts);
  // return the postIDs (could change to returning the post object)
  return postIDs;
};

let searchByRelevance = async (posts, keyword) => {
  const matchingPosts = await searchPosts(posts, keyword);
  const postIDs = await findPostIDByRelevance(matchingPosts, posts);
  // return the postIDs (could change to returning the post object)
  return postIDs;
};

// base search function - used to find all posts that contain more than 2/3 of the words
// doesnt sort the posts in any particular order - that is done by the two above
let searchPosts = async (posts, keyword) => {
  // split the keyword string into individual words
  const keywordArr = keyword.split(" ");
  // lowercase all words so capitalization does not matter
  var lowercaseKeyword = [];
  keywordArr.forEach((word) => {
    lowercaseKeyword.push(word.toLowerCase());
  });
  // make the post content into strings
  const postArr = await stringifyPost(posts);
  // find which posts contain one or more of the keywords
  const matchingPosts = await findKeywords(lowercaseKeyword, postArr);
  // find the postIDs of the posts
  return matchingPosts;
};

// make the post content, username and title into an 2D array of strings (add user later)
let stringifyPost = async (posts) => {
  var postStr = [];
  posts.forEach((post) => {
    var str = post.title.split(" ").concat(post.description.split(" "), post.userId.split(" "));
    var lowerStr = [];
    // lowercase all words
    str.forEach((word) => {
      lowerStr.push(word.toLowerCase());
    });
    postStr.push(lowerStr);
  });
  return postStr;
};

// matches search keywords with post content
let findKeywords = async (keyword, posts) => {
  var postIndex = [];
  // find matching keywords and post content
  for (var i = 0; i < posts.length; i++) {
    var relevance = 0;
    for (var j = 0; j < keyword.length; j++) {
      for (var k = 0; k < posts[i].length; k++) {
        if (posts[i][k].includes(keyword[j])) {
          // checks if a single keyword is contained within the post
          relevance++;
          break;
        }
      }
    }

    // if more than 2/3 of the keywords are in the post, return the post
    if (relevance / keyword.length >= 2 / 3) {
      postIndex.push([i, relevance / keyword.length]);
    }
  }
  // returns the position of the post in the original post array
  return postIndex;
};

// use the post index to find the postid
// could add additional sort by date function - not needed for now if input is already sorted
let findPostIDByDate = async (matchingPosts, posts) => {
  var postIDs = [];
  matchingPosts.forEach((post) => {
    postIDs.push(posts[post[0]]);
  });
  return postIDs;
};

let findPostIDByRelevance = async (matchingPosts, posts) => {
  var postIDs = [];
  // sort by descending order based on the relevancy value
  matchingPosts.sort(function (a, b) {
    return b[1] - a[1];
  });
  matchingPosts.forEach((post) => {
    postIDs.push(posts[post[0]]);
  });
  return postIDs;
};

export { searchByDate, searchByRelevance };
