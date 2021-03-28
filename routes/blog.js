const express = require('express');
const csp = require('content-security-policy');
const routerRouter = express.Router();
const blogController = require('../controllers/posts')


//setting the content security policies:
const cspPolicy = { //this will be a javascript object
    'img-src': ['https://i.ibb.co', csp.SRC_SELF], //This Can be commented out because we are not grabbing any images from this link
    'script-src-elem': 'https://ajax.googleapis.com'
};


const globalCSP = csp.getCSP(csp.STARTER_OPTIONS);
const localCSP = csp.getCSP(cspPolicy);


//this will apply this policy to all requests if no local policy is set:
// app.use(globalCSP);


routerRouter.get('/', localCSP, blogController.homePage);

routerRouter.get('/createPost', blogController.createPost);


routerRouter.post('/createPost', blogController.postCreatePost);

routerRouter.get('/gallery', localCSP, blogController.getGallery);

routerRouter.get('/posts',localCSP, blogController.getPosts);

routerRouter.get('/posts/:postId', localCSP, blogController.getPost);

routerRouter.post('/posts/:postId', localCSP, blogController.postComments);

routerRouter.get('/aboutus', localCSP, blogController.aboutUs);

routerRouter.get('/contact', localCSP, blogController.contact)

module.exports = routerRouter;