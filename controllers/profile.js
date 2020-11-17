

const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {validationResult} = require('express-validator/check');
let posted;
exports.getProfilePage = (req, res, next) =>{

    Users.findPostsRelatedToUser(req.user)
        .then(posts =>{
                
                res.render('profile/profile', {
                title: 'Your Profile',
                user: req.user,
                path: '/profile/:userFirstName',
                posts: posts,
                errorMessage: '',
                passwordClass: ''
            });
        })
        .catch(err =>{
            console.log(err);
        });

};


exports.postChangePassword = (req, res, next) =>{

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        Users.findPostsRelatedToUser(req.user)
        .then(posts =>{
                
            return res.render('profile/profile', {
                title: 'Your Profile',
                user: req.user,
                path: '/profile/:userFirstName',
                posts: posts,
                errorMessage: errors.array()[0].msg,
                passwordClass: ''
            });
        })
        .catch(err =>{
            console.log(err);
        });

    }

    else{

        bcrypt.compare(oldPassword, req.user.password)
                .then(match =>{

                    if(match){
                        // console.log('I was able to find the user by password, successfully logged in the user.');
                        // req.session.isLoggedIn = true;
                        // req.session.user = user;
                        // console.log('THE REQUEST SESSION USER IS : ' + req.session.user.firstName);
                        // return req.session.save(err =>{
                        //     console.log(err);
                        //     res.redirect('/');
                        // });

                        if(newPassword === confirmPassword){
                            console.log('WHEN CHANGING THE PASSWORDS, THE OLD AND DB PASSWORD MATCHED, AND THE NEW AND CONFIRMED PASSWORD MATCHED AS WELL.');

                            bcrypt.hash(newPassword, 12)
                                .then(newPassword =>{
                                    console.log('123123123132123123312123121233?');
                                    return Users.updatePassword(req.user._id, newPassword);
                                })
                                .then(result =>{
                                    
                                    // return res.redirect('/profile/'+req.user.firstName);
                                    Users.findPostsRelatedToUser(req.user)
                                    .then(posts =>{
                                        return res.render('profile/profile', {
                                        title: 'Your Profile',
                                        user: req.user,
                                        path: '/profile/:userFirstName',
                                        posts: posts,
                                        errorMessage: 'Password Has Been Changed Successfully',
                                        passwordClass: 'success'
                                        })
                                    })
                                    
                                })
                                .catch(err =>{
                                    console.log(err);
                                })
                                
                        }
                        else{
                            console.log("the new and confirmed password didn't match");
                            let errorMessage = 'The Confirmed Password Didn\'t Match With the New Password';
                            Users.findPostsRelatedToUser(req.user)
                            .then(posts =>{
                                return res.render('profile/profile', {
                                    title: 'Your Profile',
                                    user: req.user,
                                    path: '/profile/:userFirstName',
                                    posts: posts,
                                    errorMessage: errorMessage,
                                    passwordClass: 'show'
                                })
                            })
                            .catch(err =>{
                                console.log(err);
                            });

                        }

                        
                    }

                    else{
                        console.log('the old password did not match anything you said tbh');

                        let errorMessage = 'The Current Password You Entered Is Not Correct.'
                        Users.findPostsRelatedToUser(req.user)
                            .then(posts =>{
                                return res.render('profile/profile', {
                                    title: 'Your Profile',
                                    user: req.user,
                                    path: '/profile/:userFirstName',
                                    posts: posts,
                                    errorMessage: errorMessage,
                                    passwordClass: 'show'
                                })
                            })
                            .catch(err =>{
                                console.log(err);
                            });
                    }

                    // console.log('Couldnt find the user by password');
                    // return res.render('auth/login', {
                    //     path: '/login',
                    //     title: 'login',
                    //     errorMessage: 'Invalid email or password',
                    //     oldInput: {
                    //         email: email,
                    //         password: password
                    //     }
                    // });
                    
                })
                
                .catch(err =>{
                    console.log(err);
                    res.redirect('/login');
                });
    }
    // bcrypt.compare(oldPassword, req.user.password)
    //             .then(match =>{

    //                 if(match){
    //                     // console.log('I was able to find the user by password, successfully logged in the user.');
    //                     // req.session.isLoggedIn = true;
    //                     // req.session.user = user;
    //                     // console.log('THE REQUEST SESSION USER IS : ' + req.session.user.firstName);
    //                     // return req.session.save(err =>{
    //                     //     console.log(err);
    //                     //     res.redirect('/');
    //                     // });

    //                     if(newPassword === confirmPassword){
    //                         console.log('WHEN CHANGING THE PASSWORDS, THE OLD AND DB PASSWORD MATCHED, AND THE NEW AND CONFIRMED PASSWORD MATCHED AS WELL.');

    //                         bcrypt.hash(newPassword, 12)
    //                             .then(newPassword =>{
    //                                 console.log('even with a missed old password. Are we reaching to this point?');
    //                                 return Users.updatePassword(req.user._id, newPassword);
    //                             })
    //                             .then(result =>{
    //                                 return res.redirect('/profile/'+req.user.firstName);
    //                             })
    //                             .catch(err =>{
    //                                 console.log(err);
    //                             })
                                
    //                     }
    //                     else{
    //                         console.log("the new and confirmed password didn't match");
    //                         let errorMessage = 'The Confirmed Password Didn\'t Match With the New Password';
    //                         Users.findPostsRelatedToUser(req.user)
    //                         .then(posts =>{
    //                             return res.render('profile/profile', {
    //                                 title: 'Your Profile',
    //                                 user: req.user,
    //                                 path: '/profile/:userFirstName',
    //                                 posts: posts,
    //                                 errorMessage: errorMessage,
    //                                 passwordClass: 'show'
    //                             })
    //                         })
    //                         .catch(err =>{
    //                             console.log(err);
    //                         });

    //                     }

                        
    //                 }

    //                 else{
    //                     console.log('the old password did not match anything you said tbh');

    //                     let errorMessage = 'The Current Password You Entered Is Not Correct.'
    //                     Users.findPostsRelatedToUser(req.user)
    //                         .then(posts =>{
    //                             return res.render('profile/profile', {
    //                                 title: 'Your Profile',
    //                                 user: req.user,
    //                                 path: '/profile/:userFirstName',
    //                                 posts: posts,
    //                                 errorMessage: errorMessage,
    //                                 passwordClass: 'show'
    //                             })
    //                         })
    //                         .catch(err =>{
    //                             console.log(err);
    //                         });
    //                 }

    //                 // console.log('Couldnt find the user by password');
    //                 // return res.render('auth/login', {
    //                 //     path: '/login',
    //                 //     title: 'login',
    //                 //     errorMessage: 'Invalid email or password',
    //                 //     oldInput: {
    //                 //         email: email,
    //                 //         password: password
    //                 //     }
    //                 // });
                    
    //             })
                
    //             .catch(err =>{
    //                 console.log(err);
    //                 res.redirect('/login');
    //             });



}