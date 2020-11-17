const Posts = require("../models/posts");
const Comment = require('../models/comments');
const Users = require('../models/user');



exports.homePage = (req, res, next) =>{



    Posts.fetchAll()
        .then(posts =>{
            res.render('posting/posts', {
                title: 'The Cossich',
                path: '/',
                user: req.user,
                posts: posts
            })
        })
        .catch(err =>{
            console.log(err);
        })
}

exports.createPost = (req, res, next) =>{

    res.render('posting/createPost', {
        title: 'Create Post',
        path: '/createPost',
        user: req.user
    });
};


exports.postCreatePost = (req, res, next) =>{

    const title = req.body.title;
    const content = req.body.content;
    const overview = req.body.overview;
    const image = req.body.image;
    const creatorOfPost = req.body.userName;
    const date = new Date();

    const d = date.toString();

    console.log('the creator of the post is: ' + creatorOfPost);

    const dater = d.split(" ")[0] + " " + d.split(" ")[1] + " " + d.split(" ")[2] + " " + d.split(" ")[3] + " " + d.split(" ")[4];
 
    console.log('the date in string is: ' + date);
    const posts = new Posts(title, image, overview, content, dater, date, creatorOfPost);
    
    posts.save() //SINCE WE ARE RETURNING THE COLLECTION IN THE POST MODULE,  WE CANT TREAT THIS AS A CHAIN PROMISE AND USE THE .then.
        .then(result =>{
            console.log('Created Post');
            res.redirect('/posts');
        })
        .catch(err =>{
            console.log(err);
        });
};


exports.getPosts = (req, res, next) =>{

    Posts.fetchAll() //remember we are calling this static method from the posts model.
        .then(posts =>{
            res.render('posting/postList', {
                posts: posts,
                title: 'All Posts',
                path: '/blog',
                user: req.user
            })
        })
        .catch(err =>{
            console.log(err);
        })
};

exports.getPost = (req, res, next) =>{

    const postId = req.params.postId;
    let postInfo;

    Posts.findById(postId)
        .then(post =>{
            postInfo = post;
            // res.render('posting/post', {
            //     post: post,
            //     title: post.title,
            //     path: '/blog'
            // });
            return Comment.findById(postId);
        })
        .then(comments =>{
            // console.log('the comment retrieved is: ' + comments[0].comment);
            console.log('the length of the post is: ' + postInfo.title);
            console.log('the length of the comments array is: ' + comments.length);
            console.log('the post info is: ' + postInfo) 
            res.render('posting/post', {
                post: postInfo,
                title: postInfo.title,
                comment: comments,
                path: '/blog',
                user: req.user
            });
        })
        .catch(err =>{
            console.log(err);
        });

}

exports.postComments = (req, res, next) =>{

    const postId = req.params.postId;
    console.log('the request user in the post comments section is ' + req.user.firstName);
    const date = new Date();
    const stringDate = date.toString();
    const finalDate = stringDate.split(' ')[1] + '/' + stringDate.split(' ')[2] + '/' + stringDate.split(' ')[3];

    Posts.findById(postId)
        .then(posts =>{
            console.log('the post info after posting the comment is: ' + posts);
            return Users.addToCommentsList(posts, req.user)
        })
        .then(result =>{
            console.log(result);
        })
        .catch(err =>{
            console.log(err);
        })

    const newComment = new Comment(req.body.comment, postId, req.user, finalDate, date);

    newComment.save()
        .then(result =>{
            console.log(result);
            res.redirect(`/posts/${postId}`);
        })
        .catch(err =>{
            console.log(err);
        })


}


exports.getGallery = (req, res, next) =>{

    res.render('posting/gallery', {
                title: 'Gallery',
                path: '/gallery',
                user: req.user
    });

};


exports.aboutUs = (req, res, next) =>{

    res.render('posting/aboutus', {
        title: 'About Page',
        path: '',
        user: req.user
    });



};


exports.contact = (req, res, next) =>{

    res.render('posting/contact', {
        title: 'Contact Me',
        path: '/contact',
        user: req.user
    });
}