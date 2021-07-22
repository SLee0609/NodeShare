import Post from "../models/post";
import User from "../models/user";

export const CATEGORIES = [
  "Information",
  "Services",
  "Sales",
  "Trading",
  "Fun",
  "Other",
];

export const USERS = [
  new User(
    "3deuQegtsKOC1GubupvD6X2fpDd2",
    "Sean Lee",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
  ),
  new User(
    "u2",
    "Cyrus Wong",
    "https://cdn.vox-cdn.com/thumbor/eeJ-1pCbuBRKAhyD7YwM5Jhjhg8=/0x0:3005x2003/1200x800/filters:focal(1396x655:1876x1135)/cdn.vox-cdn.com/uploads/chorus_image/image/68927855/1305895481.0.jpg"
  ),
  new User(
    "u3",
    "Andy Choi",
    "https://media.officedepot.com/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,h_666,q_auto,w_500/c_pad,h_666,w_500/v1/products/208206/208206_p?pgw=1"
  ),
];

export const POSTS = [
  new Post(
    "p1",
    ["Information", "Services", "Fun"],
    "Looking for a Guitarist",
    "3deuQegtsKOC1GubupvD6X2fpDd2",
    "https://cdn.mos.cms.futurecdn.net/CT5CNXjsQLaWrqVg7WYnzR.jpg",
    "We are searching for an electric guitarist to play in our band Inertia! Send a message if interested.",
    "March 11th, 2021"
  ),
  new Post(
    "p2",
    ["Information", "Sales", "Trading"],
    "Selling / Trading Basketball Shoes",
    "u2",
    "https://images.solecollector.com/complex/images/c_fill,dpr_2.0,f_auto,fl_lossy,q_auto,w_680/oarjqvmq9wazwsjvfedd/nike-lebron-15-review",
    "I am looking to trade / sell my pair of Lebrons for about $100. Send a message if interested.",
    "March 13th, 2021"
  ),
  new Post(
    "p3",
    ["Information", "Fun"],
    "Looking for Music Recommendations",
    "u3",
    "https://images.macrumors.com/t/tCPS-yWwAQ_siFOl14cUWLHEw1c=/400x0/filters:quality(90)/article-new/2018/05/apple-music-note-800x420.jpg?lossy",
    "Please send me music recommendations!",
    "March 13th, 2021"
  ),
];
