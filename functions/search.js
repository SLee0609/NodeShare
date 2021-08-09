// search local posts using given keywords
// improvements to make - removing filler words (e.g. it, is, the, a, etc.)
// sort by relevance - currently sorts by date only
import Post from "../models/post.js";

let searchByDate = async (posts, keyword) => {
    // split the keyword string into individual words
    const keywordArr = keyword.split(" ");
    // make the post content into strings
    const postArr = await stringifyPost(posts);
    // find which posts contain one or more of the keywords
    const matchingPosts = await findKeywords(keywordArr, postArr);
    // find the postIDs of the posts
    const postIDs = await findPostID(matchingPosts, posts);
    // return the postIDs (could change to returning the post object)
    return postIDs;
}

// make the post content and title into an 2D array of strings (add user later)
let stringifyPost = async (posts) => {
    var postStr = [];
    posts.forEach((post) => {
        var str = post.title.split(" ").concat(post.description.split(" "));
        postStr.push(str);
    });
    return postStr;
}

let findKeywords = async (keyword, posts) => {
    var postIndex = [];
    // find matching keywords and post content
    for (var i = 0; i < posts.length; i++) {
        posts[i].forEach((string) => {
            keyword.forEach((word) => {
                if (word == string) {
                    postIndex.push(i);
                }
            });
        });
    }
    // remove duplicates
    var postIndexUnique = [...new Set(postIndex)];
    // returns the position of the post in the original post array
    return postIndexUnique;
}

// use the post index to find the postid
let findPostID = async (matchingPosts, posts) => {
    var postIDs = [];
    matchingPosts.forEach((post) => {
        postIDs.push(posts[post].id);
    });
    return postIDs;
}

// tester
let test = async () => {
    var postArr = [];
    var post1 = new Post("post1", "categories", "this is the title", "123uid", "imageuri", "this is the post description", "some time");
    var post2 = new Post("post2", "categories", "this is the new title", "123uid", "imageuri", "this is the new post description", "some time");
    postArr.push(post1);
    postArr.push(post2);
    var x = await searchByDate(postArr, "this");
    console.log(x);
}

export {test, searchByDate}