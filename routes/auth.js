const express = require('express');

const authController = require('../controllers/auth');
const router = express.Router();
const csp = require('content-security-policy');

//setting the content security policies:
const cspPolicy = { //this will be a javascript object
    'img-src': 'https://i.ibb.co',
    'script-src-elem': 'https://ajax.googleapis.com'
};

const localCSP = csp.getCSP(cspPolicy);


const {body} = require('express-validator//check');


//IN THIS ROUTE WE INCLDUED EXPRESS VALIDATOR 3RD PARTY PACKAGE. THIS ALLOWS US TO VALIDATE CERTAIN INPUT SUCH AS EMAILS AND PASSWORD. 


const User = require('../models/user');



router.get('/signup', localCSP, authController.getSignup);

router.post('/signup',
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
    body('password')
    .isLength({min: 5})
    .withMessage('Please enter a password that contains at least 5 characters'),localCSP, authController.postSignup);

router.get('/login', localCSP, authController.getLogin);
router.post('/login',
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
    body('password')
    .isLength({min: 5})
    .withMessage('Please enter a password that contains at least 5 characters'), localCSP, authController.postLogin);
router.get('/logout', localCSP, authController.postLogout);
module.exports = router;