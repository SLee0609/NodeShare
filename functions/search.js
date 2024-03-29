// search local posts using given keywords
// improvements to make - removing filler words (e.g. it, is, the, a, etc.)
// add username into post content to be searched

// assumes that the post array is passed in based on date
let searchByDate = async (posts, keyword) => {
  const matchingPosts = await searchPosts(posts, keyword);
  const postsList = await findPostByDate(matchingPosts, posts);
  // return the postIDs (could change to returning the post object)
  return postsList;
};

let searchByRelevance = async (posts, keyword) => {
  const matchingPosts = await searchPosts(posts, keyword);
  const postsList = await findPostByRelevance(matchingPosts, posts);
  // return the postIDs (could change to returning the post object)
  return postsList;
};

// base search function - used to find all posts that contain more than 2/3 of the words
// doesnt sort the posts in any particular order - that is done by the two above
let searchPosts = async (posts, keyword) => {
  String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(
      new RegExp(
        str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"),
        ignore ? "gi" : "g"
      ),
      typeof str2 == "string" ? str2.replace(/\$/g, "$$$$") : str2
    );
  };
  // split the keyword string into individual words
  const keywordArr = keyword.split(" ");
  // lowercase all words so capitalization does not matter
  var lowercaseKeyword = [];
  keywordArr.forEach((word) => {
    // removes punctuation
    word = word.replaceAll(".", "");
    word = word.replaceAll(",", "");
    word = word.replaceAll(";", "");
    word = word.replaceAll("!", "");
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
    var str = post.title
      .split(" ")
      .concat(post.description.split(" "), post.userName.split(" "));
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
let findPostByDate = async (matchingPosts, posts) => {
  var postsList = [];
  matchingPosts.forEach((post) => {
    postsList.push(posts[post[0]]);
  });
  return postsList;
};

let findPostByRelevance = async (matchingPosts, posts) => {
  var postsList = [];
  // sort by descending order based on the relevancy value
  matchingPosts.sort(function (a, b) {
    return b[1] - a[1];
  });
  matchingPosts.forEach((post) => {
    postsList.push(posts[post[0]]);
  });
  return postsList;
};

export { searchByDate, searchByRelevance };
