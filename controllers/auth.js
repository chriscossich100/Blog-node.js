
const User = require('../models/user');
const bcrypt = require('bcryptjs')

const {validationResult} = require('express-validator/check');

exports.getSignup = (req, res, next) =>{
    
    res.render('auth/signup', {
        path: '/signup',
        title: 'Signup',
        user: req.user,
        oldInput: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            
        },
        validationErrorMessage: []
    });
};


exports.postSignup = (req, res, next) =>{
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const errors = validationResult(req); //the validationResult contains a list of all the errors we got when creating user information. for example, if the user email was incorrect
    //it will be added to the validation result which will then be added to errors. This validation occures in the route middlewares. 

    if(!errors.isEmpty()){
        console.log('the list of errors in the signup page are: ' + errors);
        console.log('the list of errors in the signup page converted to an array are: ' + errors.array());
        return res.render('auth/signup', {
            path: '/signup',
            title: 'Signup',
            user: req.user,
            validationErrorMessage: errors.array()[0].msg, //the arrray method is converting the list of strings into an array of objects, which then we want the first indexs msg property.
            oldInput: {
                firstName: firstName,
                lastName:  lastName,
                email: email,
                password: password,
                
            },
        });
    }


    User.findOne(email)
        .then(foundEmail =>{

            if(foundEmail){
                return res.render('auth/signup', {
                    path: '/signup',
                    title: 'Signup',
                    user: req.user,
                    validationErrorMessage: 'Email already exists', //the arrray method is converting the list of strings into an array of objects, which then we want the first indexs msg property.
                    oldInput: {
                        firstName: firstName,
                        lastName:  lastName,
                        email: email,
                        password: password,
                        
                    }
                });
            }

            else{
                const post = {
                    post: []
                };
        
                bcrypt.hash(password, 12)
                    .then(newPassword =>{
                        const user = new User(firstName, lastName, email, newPassword, post);
        
                        return user.save();
                    })
                    .then(result =>{
                        res.redirect('/login');
                        //....email code.
                    })
                    .catch(err=>{
                        //error code.
                        console.log(err);
                    });
            }

            
        })
        .catch(err =>{
            console.log(err);
        });
    
};


exports.getLogin = (req, res, next) =>{
    
        res.render('auth/login', {
            path: '/login',
            title: 'Login',
            user: req.user,
            validationErrorMessage: [],
            oldInput: {
                email: '',
                password: '',
                user: req.user
            }
        })
         
};


exports.postLogin = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req); //the validationResult contains a list of all the errors we got when creating user information. for example, if the user email was incorrect
    //it will be added to the validation result which will then be added to errors. This validation occures in the route middlewares. 

    if(!errors.isEmpty()){
        
        return res.render('auth/login', {
            path: '/login',
            title: 'Login',
            user: req.user,
            validationErrorMessage: errors.array()[0].msg, //the arrray method is converting the list of strings into an array of objects, which then we want the first indexs msg property.
            oldInput: {
                email: email,
                password: password,
                
            },
        });
    }

    User.findOne(email)
        .then(user =>{
            if(!user){
                console.log('coudlnt find the user by email.');
                return res.render('auth/login', {
                    path: '/login',
                    title: 'Login',
                    user: req.user,
                    validationErrorMessage: 'Invalid email or password',
                    oldInput: {
                        email: email,
                        password: password
                    }
                });
            }
            console.log('I was able to find the user by email');
            bcrypt.compare(password, user.password)
                .then(match =>{

                    if(match){
                        console.log('I was able to find the user by password, successfully logged in the user.');
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        console.log('THE REQUEST SESSION USER IS : ' + req.session.user.firstName);
                        return req.session.save(err =>{
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    console.log('Couldnt find the user by password');
                    return res.render('auth/login', {
                        path: '/login',
                        title: 'login',
                        validationErrorMessage: 'Invalid email or password',
                        user: req.user,
                        oldInput: {
                            email: email,
                            password: password
                        }
                    });
                    
                })
                .catch(err =>{
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err =>{
            console.log(err);
        })
};


exports.postLogout = (req, res, next) =>{
    req.session.destroy(() =>{
        res.redirect('/');
    })
}