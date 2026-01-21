const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { validationResult } = require("express-validator/check");
const e = require("express");

exports.getProfilePage = (req, res, next) => {
  //get the list of posts to check for comments:

  //if there is no one logged in automatically redirect to the homepage. This prevents any unwanted errors.
  if (!req.user) {
    res.redirect("/");
  } else {
    Users.findPostsRelatedToUser(req.user)
      .then((posts) => {
        res.render("profile/profile", {
          title: "Your Profile",
          user: req.user,
          path: "/profile/:userFirstName",
          posts: posts,
          errorMessage: "",
          passwordClass: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.postChangePassword = (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    Users.findPostsRelatedToUser(req.user)
      .then((posts) => {
        return res.render("profile/profile", {
          title: "Your Profile",
          user: req.user,
          path: "/profile/:userFirstName",
          posts: posts,
          errorMessage: errors.errors[0].msg,
          passwordClass: "show",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    bcrypt
      .compare(oldPassword, req.user.password)
      .then((match) => {
        if (match) {
          if (newPassword === confirmPassword) {
            bcrypt
              .hash(newPassword, 12)
              .then((newPassword) => {
                return Users.updatePassword(req.user._id, newPassword);
              })
              .then((result) => {
                Users.findPostsRelatedToUser(req.user).then((posts) => {
                  return res.render("profile/profile", {
                    title: "Your Profile",
                    user: req.user,
                    path: "/profile/:userFirstName",
                    posts: posts,
                    errorMessage: "Password Has Been Changed Successfully",
                    passwordClass: "success",
                  });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            let errorMessage =
              "The Confirmed Password Didn't Match With the New Password";
            Users.findPostsRelatedToUser(req.user)
              .then((posts) => {
                return res.render("profile/profile", {
                  title: "Your Profile",
                  user: req.user,
                  path: "/profile/:userFirstName",
                  posts: posts,
                  errorMessage: errorMessage,
                  passwordClass: "show",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          let errorMessage =
            "Your Current Password You Entered Is Not Correct.";
          Users.findPostsRelatedToUser(req.user)
            .then((posts) => {
              return res.render("profile/profile", {
                title: "Your Profile",
                user: req.user,
                path: "/profile/:userFirstName",
                posts: posts,
                errorMessage: errorMessage,
                passwordClass: "show",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })

      .catch((err) => {
        console.log(err);
        res.redirect("/login");
      });
  }
};
