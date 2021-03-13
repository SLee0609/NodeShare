import PostCategory from "../models/postCategory";
import Post from "../models/post";
import User from "../models/user";

export const CATEGORIES = [
  new PostCategory("c1", "Information"),
  new PostCategory("c2", "Services"),
  new PostCategory("c3", "Sales"),
  new PostCategory("c4", "Trading"),
  new PostCategory("c5", "Fun"),
  new PostCategory("c6", "Other"),
];

export const USERS = [
  new User(
    "u1",
    "Sean Lee",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
  ),
];

export const POSTS = [
  new Post(
    "p1",
    ["c1", "c2", "c5", "c6"],
    "Looking for a Guitarist",
    "u1",
    "https://cdn.mos.cms.futurecdn.net/CT5CNXjsQLaWrqVg7WYnzR.jpg",
    "We are searching for an electric guitarist to play in our band Inertia! Send a message if interested.",
    "March 11th, 2021"
  ),
];
