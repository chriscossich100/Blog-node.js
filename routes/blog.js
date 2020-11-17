const express = require('express');

const routerRouter = express.Router();
const blogController = require('../controllers/posts')



routerRouter.get('/', blogController.homePage);

routerRouter.get('/createPost', blogController.createPost);


routerRouter.post('/createPost', blogController.postCreatePost);

routerRouter.get('/gallery', blogController.getGallery);

routerRouter.get('/posts', blogController.getPosts);

routerRouter.get('/posts/:postId', blogController.getPost);

routerRouter.post('/posts/:postId', blogController.postComments);

routerRouter.get('/aboutus', blogController.aboutUs);

routerRouter.get('/contact', blogController.contact)

module.exports = routerRouter;