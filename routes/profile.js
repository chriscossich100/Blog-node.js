const express = require('express');


const router = express.Router();


const profileController = require('../controllers/profile');

const {body} = require('express-validator/check');



router.get('/profile/:userFirstname', profileController.getProfilePage);

router.post('/profile/:userFirstname',
    body('oldPassword')
    .isLength({min: 5})
    .withMessage('Please enter a password that contains at least 5 characters'),
    body('newPassword')
    .isLength({min: 5})
    .withMessage('The new password you entered does not have at least 5 characters'), 
    body('confirmPassword')
    .isLength({min: 5})
    .withMessage('The new password you entered does not have at least 5 characters'), profileController.postChangePassword);


module.exports = router;