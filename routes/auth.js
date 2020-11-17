const express = require('express');

const authController = require('../controllers/auth');
const router = express.Router();

const {body} = require('express-validator//check');




const User = require('../models/user');



router.get('/signup', authController.getSignup);

router.post('/signup',
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
    body('password')
    .isLength({min: 5})
    .withMessage('Please enter a password that contains at least 5 characters'), authController.postSignup);

router.get('/login', authController.getLogin);
router.post('/login',
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
    body('password')
    .isLength({min: 5})
    .withMessage('Please enter a password that contains at least 5 characters'), authController.postLogin);
router.get('/logout', authController.postLogout);
module.exports = router;