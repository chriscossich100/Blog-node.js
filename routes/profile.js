const express = require('express');

const csp = require('content-security-policy');

//setting the content security policies:
const cspPolicy = { //this will be a javascript object
    'img-src': 'https://i.ibb.co',
    'script-src-elem': 'https://ajax.googleapis.com'
};

const localCSP = csp.getCSP(cspPolicy);



const router = express.Router();


const profileController = require('../controllers/profile');

const {body} = require('express-validator/check');

//IN THIS ROUTE WE INCLDUED EXPRESS VALIDATOR 3RD PARTY PACKAGE. THIS ALLOWS US TO VALIDATE CERTAIN INPUT SUCH AS EMAILS AND PASSWORD. 


router.get('/profile/:userFirstname', localCSP, profileController.getProfilePage);

router.post('/profile/:userFirstname',
    body('oldPassword')
    .isLength({min: 5})
    .withMessage('Please enter a password that contains at least 5 characters'),
    body('newPassword')
    .isLength({min: 5})
    .withMessage('The new password you entered does not have at least 5 characters'), 
    body('confirmPassword')
    .isLength({min: 5})
    .withMessage('The new password you entered does not have at least 5 characters'), localCSP, profileController.postChangePassword);


module.exports = router;