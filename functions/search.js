// search local posts using given keywords
// improvements to make - removing filler words (e.g. it, is, the, a, etc.)
// sort by relevance - currently sorts by date only
import Post from "../models/post.js";

let searchByDate = async (posts, keyword) => {
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
    const postIDs = await findPostID(matchingPosts, posts);
    // return the postIDs (could change to returning the post object)
    return postIDs;
}

let searchByRelevance = async (posts, keyword) => {

}

// make the post content and title into an 2D array of strings (add user later)
let stringifyPost = async (posts) => {
    var postStr = [];
    posts.forEach((post) => {
        var str = post.title.split(" ").concat(post.description.split(" "));
        var lowerStr = [];
        // lowercase all words
        str.forEach((word) => {
           lowerStr.push(word.toLowerCase());
        });
        postStr.push(lowerStr);
    });
    return postStr;
}

let findKeywords = async (keyword, posts) => {
    var postIndex = [];
    // find matching keywords and post content
    for (var i = 0; i < posts.length; i++) {
        var relevance = 0;
        for (var j = 0; j < keyword.length; j++) {
            for (var k = 0; k < posts[i].length; k++) {
                if (keyword[j] == posts[i][k]) {
                    // checks if a single keyword is contained within the post
                    relevance ++;
                    break;
                }
            }
        }

        // if more than 2/3 of the keywords are in the post, return the post
        if (relevance / keyword.length >= 2/3) {
            postIndex.push(i);
        }
    }
    // returns the position of the post in the original post array
    return postIndex;
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
    var x = await searchByDate(postArr, "THIS IS");
    console.log(x);
}

export {test, searchByDate}