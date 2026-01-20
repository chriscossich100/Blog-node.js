const Posts = require("../models/posts");
const Comment = require("../models/comments");
const Users = require("../models/user");
const fs = require("fs");
const path = require("path");
const multer = require("multer"); // is a package that lets us parse incoming requests. However it parses incoming requests that are files.
const { post } = require("../routes/blog");

//the disk storage engine gives us full control on storing files to the disk. It takes 2 optional functions, destination and filename.
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "colorful-" + file.originalname);
  },
});

//File filter controls which files should be uploaded and which should be skipped. It takes a callback depending on the boolean value.
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "images/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imageUpload = multer({ storage: fileStorage, fileFilter: fileFilter });

exports.homePage = (req, res, next) => {
  // Posts.fetchAll()
  //     .then(posts =>{
  //         res.render('posting/posts', {
  //             title: 'The Cossich',
  //             path: '/',
  //             user: req.user,
  //             posts: posts
  //         })
  //     })
  //     .catch(err =>{
  //         console.log(err);
  //     })

  //TOP CODE HAS BEEN COMMENTED OUT SINCE WE ARE NO LONGER READING OR STORING OUR POSTS IN MONGODB!!!
  let dater = fs.readFileSync(
    path.join(__dirname, "../util/posts.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        throw err;
      } else {
        return data;
      }
    }
  );

  const aler = JSON.parse(dater.toString());
  let posts = {};

  for (i = 0; i < aler.length; i++) {
    if (i == aler.length - 1) {
      posts = aler[i];
    }
  }

  res.render("posting/posts", {
    title: "The Cossich",
    path: "/",
    user: req.user,
    posts: posts,
  });
};

exports.createPost = (req, res, next) => {
  res.render("posting/createPost", {
    title: "Create Post",
    path: "",
    user: req.user,
  });
};

exports.postCreatePost = (req, res, next) => {
  // const title = req.body.title;
  // const content = req.body.content;
  // const overview = req.body.overview;
  // const image = req.body.image;
  // const date = new Date();
  // const d = date.toString();
  // const daters = d.split(" ")[0] + " " + d.split(" ")[1] + " " + d.split(" ")[2] + " " + d.split(" ")[3] + " " + d.split(" ")[4];
  // const posts = new Posts(title, image, overview, content, dater, date);

  // posts.save() //SINCE WE ARE RETURNING THE COLLECTION IN THE POST MODULE,  WE CANT TREAT THIS AS A CHAIN PROMISE AND USE THE .then.
  //     .then(result =>{

  //         res.redirect('/posts');
  //     })
  //     .catch(err =>{
  //         console.log(err);
  //     });

  //!!!!!!!!!!!!!!!!!!! COMMENTING ABOVE CODE AS WE ARE SWITCHIGN TO READING THE POSTS IN A JSON FILE INSTEAD OF USING A MONGODB SERVER!!

  const title = req.body.title;
  const paramTitle = title.replace(/\s/g, "-");
  const content = req.body.content;
  const overview = req.body.overview;
  const image = req.body.image;
  const date = new Date();

  const d = date.toString();

  const daters =
    d.split(" ")[1] + " " + d.split(" ")[2] + ", " + d.split(" ")[3];

  imageUpload.single("image")(req, res, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    let dater = fs.readFileSync(
      path.join(__dirname, "../util/posts.json"),
      "utf-8",
      (err, data) => {
        if (err) {
          throw err;
        } else {
          return data;
        }
      }
    );

    const aler = JSON.parse(dater.toString());

    aler.push({
      title: title,
      paramTitle: paramTitle,
      content: content,
      overview: overview,
      imageFileName: "colorful-" + req.file.originalname,
      date: daters,
      comment: [],
    });

    dater = JSON.stringify(aler, null, 7);

    try {
      fs.writeFileSync(path.join(__dirname, "../util/posts.json"), dater);
      console.log("JSON data is saved");

      //once post has been created. redirect to the main post list page.
      res.redirect("/posts");
    } catch {
      console.error("couldnt save the JSON data");
    }
  });
};

exports.getPosts = (req, res, next) => {
  // Posts.fetchAll() //remember we are calling this static method from the posts model.
  //     .then(posts =>{
  //         res.render('posting/postList', {
  //             posts: posts,
  //             title: 'All Posts',
  //             path: '/blog',
  //             user: req.user
  //         })
  //     })
  //     .catch(err =>{
  //         console.log(err);
  //     })

  //TOP CODE HAS BEEN COMMENTED OUT SINCE WE ARE NO LONGER READING OR STORING OUR POSTS IN MONGODB!!!
  let posts = fs.readFileSync(
    path.join(__dirname, "../util/posts.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        throw err;
      } else {
        return data;
      }
    }
  );

  const postInfo = JSON.parse(posts.toString());
  // console.log('the length of postInfo is: ', postInfo.length)
  let arrangedPostInfo = [];

  for (i = postInfo.length - 1; i >= 0; i--) {
    // console.log('the post info in reverse is: ', postInfo[i])
    arrangedPostInfo.push(postInfo[i]);
  }

  // console.log('the arrangedPostInfo is: ', arrangedPostInfo)
  console.log("this is me and this is youfdfdfddfd");
  res.render("posting/postList", {
    posts: arrangedPostInfo,
    title: "All Posts",
    path: "",
    user: req.user,
  });
};

// exports.getPost = (req, res, next) =>{

//     const postId = req.params.postId;
//     let postInfo;

//     let reqPath = path.join(__dirname, '../deadmoves/test.txt');

//     // fs.readFile(path.join(__dirname, '../deadmoves/test.txt'), 'utf-8', (err, data) =>{

//     //     if(err){
//     //         console.log(err);
//     //         return;
//     //     }
//     //     // res.end(data);

//     //     console.log('the data from the readfile is ', data);

//     //     res.render('posting/post', {
//     //         post: {
//     //             date: new Date(),
//     //             title: 'you are here dude',
//     //             content: data
//     //         },
//     //         title: 'you are here dude',
//     //         path: '/blog',
//     //         user: req.user
//     //     })
//     // })

//     Posts.findById(postId)
//         .then(post =>{
//             postInfo = post;

//             return Comment.findById(postId);
//         })
//         .then(comments =>{

//             console.log('the length of the post is: ' + postInfo.title);
//             console.log('the length of the comments array is: ' + comments.length);
//             console.log('the post info is: ' + postInfo)
//             res.render('posting/post', {
//                 post: postInfo,
//                 title: postInfo.title,
//                 comment: comments,
//                 path: '/blog',
//                 user: req.user
//             });
//         })
//         .catch(err =>{
//             console.log(err);
//         });

// }

exports.getPost = (req, res, next) => {
  const paramTitle = req.params.postTitle;

  //read the json file that contains all the post information:
  let readPost = fs.readFileSync(
    path.join(__dirname, "../util/posts.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        throw err;
      } else {
        return data;
      }
    }
  );

  //once we have read the post data: convert it into a json object.
  const posts = JSON.parse(readPost.toString());
  console.log("the posts are: ", posts);

  let postInfo;

  //run a foreach to see if the param title provided in the url equals a certain post param title: if so assign it to the postInfo variable.
  posts.forEach((post) => {
    if (post.paramTitle == paramTitle) {
      postInfo = post;
    }
  });

  console.log(postInfo.content);

  let stringer = "";
  let adjustCOntent = [];
  for (let index = 0; index < postInfo.content.length; index++) {
    console.log(postInfo.content[index], ' and its index is ', index);
    if (
      postInfo.content[index] != "\r" &&
      postInfo.content[index] != "\n" &&
      index != postInfo.content.length - 1
    ) {
      stringer += postInfo.content[index];
      console.log(stringer);
    } else {
      if (stringer != "" && stringer.substring(0, 4) != '<img') {
        if (index == postInfo.content.length -1 ) {
          stringer += postInfo.content[index];
          adjustCOntent.push({ type: "p", content: stringer });
        }
        else {
         adjustCOntent.push({ type: "p", content: stringer }); 
        }
        
      } 
      else {
        let imgStr = stringer.substring(0, 4);

        if (imgStr == "<img") {
          if (index == postInfo.content.length - 1 ) {
            stringer += postInfo.content[index];
            adjustCOntent.push({type: "img", content: stringer.substring(4, stringer.length)})
          }
          else{
            adjustCOntent.push({type: "img", content: stringer.substring(4, stringer.length)})
          }
        }

        
      }
      console.log("at this point index was: ", postInfo.content[index]);
      stringer = "";
    }
  }

  console.log("the adjuster content is: ", adjustCOntent);

  //if postInfo does not equal null, that measn that a post has been found. Load that post.
  if (postInfo != null) {
    res.render("posting/post", {
      post: postInfo,
      postContent: adjustCOntent,
      title: postInfo.title,
      path: "/blog",
      user: req.user,
    });
  }
  //else redirect to the post list page.
  else {
    res.redirect("/posts");
  }
};

exports.postComments = (req, res, next) => {
  // const postId = req.params.postId;
  // console.log('the request user in the post comments section is ' + req.user.firstName);
  // const date = new Date();
  // const stringDate = date.toString();
  // const finalDate = stringDate.split(' ')[1] + '/' + stringDate.split(' ')[2] + '/' + stringDate.split(' ')[3];

  // Posts.findById(postId)
  //     .then(posts =>{
  //         console.log('the post info after posting the comment is: ' + posts);
  //         return Users.addToCommentsList(posts, req.user)
  //     })
  //     .then(result =>{
  //         console.log(result);
  //     })
  //     .catch(err =>{
  //         console.log(err);
  //     })

  // const newComment = new Comment(req.body.comment, postId, req.user, finalDate, date);

  // newComment.save()
  //     .then(result =>{
  //         console.log(result);
  //         res.redirect(`/posts/${postId}`);
  //     })
  //     .catch(err =>{
  //         console.log(err);
  //     })

  const postTitle = req.params.postTitle;
  const date = new Date();
  const stringDate = date.toString();
  const finalDate =
    stringDate.split(" ")[1] +
    "/" +
    stringDate.split(" ")[2] +
    "/" +
    stringDate.split(" ")[3];
  const comment = req.body.comment;

  let postInfo = fs.readFileSync(
    path.join(__dirname, "../util/posts.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        throw err;
      } else {
        return data;
      }
    }
  );

  const aler = JSON.parse(postInfo.toString());

  let updatedPostWithComment;

  aler.forEach((post) => {
    if (post.paramTitle == postTitle) {
      updatedPostWithComment = post;

      updatedPostWithComment.comment.push({
        user: req.user,
        comment: comment,
        date: finalDate,
      });

      console.log(
        "the updatedpostWithComment variable is: ",
        updatedPostWithComment
      );

      post.comment = updatedPostWithComment.comment;

      console.log("the post.comment is: ", post.comment);
    }
  });

  postInfo = JSON.stringify(aler, null, 7);

  try {
    fs.writeFileSync(path.join(__dirname, "../util/posts.json"), postInfo);
    console.log("JSON data is saved");
  } catch {
    console.error("couldnt save the JSON data");
  }

  res.redirect(`/posts/${postTitle}`);
};

exports.getGallery = (req, res, next) => {
  res.render("posting/gallery", {
    title: "Gallery",
    path: "/gallery",
    user: req.user,
  });
};

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
