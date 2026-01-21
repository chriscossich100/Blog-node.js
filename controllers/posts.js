const Posts = require("../models/posts");
const Comment = require("../models/comments");
const Users = require("../models/user");
const fs = require("fs");
const path = require("path");
const multer = require("multer"); // is a package that lets us parse incoming requests. However it parses incoming requests that are files.
const { post } = require("../routes/blog");



exports.homePage = (req, res, next) => {
  Posts.fetchLatestPost()
    .then((posts) => {
      res.render("posting/posts", {
        title: "The Cossich",
        path: "/",
        user: req.user,
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });

};

//controller for creating a post.
exports.createPost = (req, res, next) => {
  res.render("posting/createPost", {
    title: "Create Post",
    path: "",
    user: req.user,
  });
};

//controller for posting a post.
exports.postCreatePost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const overview = req.body.overview;
  const image = req.body.image;
  const date = new Date();
  const d = date.toString();
  const daters =
    d.split(" ")[0] +
    " " +
    d.split(" ")[1] +
    " " +
    d.split(" ")[2] +
    " " +
    d.split(" ")[3] +
    " " +
    d.split(" ")[4];
  const posts = new Posts(title, image, overview, content, daters, date);

  posts
    .save() //SINCE WE ARE RETURNING THE COLLECTION IN THE POST MODULE,  WE CANT TREAT THIS AS A CHAIN PROMISE AND USE THE .then.
    .then((result) => {
      res.redirect("/posts");
    })
    .catch((err) => {
      console.log(err);
    });
};

//controller for getting all posts.
exports.getPosts = (req, res, next) => {
  Posts.fetchAll() //remember we are calling this static method from the posts model.
    .then((posts) => {
      res.render("posting/postList", {
        posts: posts,
        title: "All Posts",
        path: "/blog",
        user: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });

};

//controller for getting a single post.
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  console.log("the postId received in the getPost controller is: " + postId);
  let regTitle = postId.replace(/ /g, '-');
  console.log("the regTitle after replacing dashes is: " + regTitle);
  let postInfo;

  Posts.findByName(regTitle)
    .then((post) => {
      postInfo = post;
      console.log(
        "the post info found by name is: " + postInfo._id,
        " and its type is: ",
        typeof postInfo._id,
      );
      return Comment.findById(postInfo._id.toString());
    })
    .then((comments) => {
      console.log("the length of the post is: " + postInfo.title);
      console.log("the length of the comments array is: " + comments.length);
      console.log("the post info is: " + postInfo);
      res.render("posting/post", {
        post: postInfo,
        title: postInfo.title,
        comment: comments,
        path: "/blog",
        user: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//controller for posting comments.
exports.postComments = (req, res, next) => {
  const postId = req.params.postId;
  console.log("the request user in the post comments section is " + postId);
  const date = new Date();
  const stringDate = date.toString();
  const finalDate =
    stringDate.split(" ")[1] +
    "/" +
    stringDate.split(" ")[2] +
    "/" +
    stringDate.split(" ")[3];
  let postInfo;
  Posts.findById(postId)
    .then((posts) => {
      console.log("the post info after posting the comment is: " + posts);
      postInfo = posts;
      return Users.addToCommentsList(posts, req.user);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  const newComment = new Comment(
    req.body.comment,
    postId,
    req.user,
    finalDate,
    date,
  );

  newComment
    .save()
    .then((result) => {
      console.log(result);
      res.redirect(`/posts/${postInfo.title.replace(/ /g, '-')}`);
    })
    .catch((err) => {
      console.log(err);
    });

  
};

//controller for gallery page.
// exports.getGallery = (req, res, next) => {
//   res.render("posting/gallery", {
//     title: "Gallery",
//     path: "/gallery",
//     user: req.user,
//   });
// };

exports.aboutUs = (req, res, next) => {
  res.render("posting/aboutus", {
    title: "About Page",
    path: "",
    user: req.user,
  });
};

exports.contact = (req, res, next) => {
  res.render("posting/contact", {
    title: "Contact Me",
    path: "/contact",
    user: req.user,
  });
};
