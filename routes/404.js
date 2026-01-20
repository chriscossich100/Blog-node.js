const express = require('express');

const csp = require('content-security-policy');

const router = express.Router();

//setting the content security policies:
const cspPolicy = { //this will be a javascript object
    // 'img-src': 'https://i.ibb.co',
    'img-src': '*',
    'script-src-elem': 'https://ajax.googleapis.com'
};


const globalCSP = csp.getCSP(csp.STARTER_OPTIONS);
const localCSP = csp.getCSP(cspPolicy);



const errorController = require('../controllers/404Controller');


router.use(localCSP, errorController.get500);


module.exports = router;