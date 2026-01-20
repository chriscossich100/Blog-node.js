//main app.js file

require('dotenv').config(); //this will load the variables from the .env file into process.env
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer'); // is a package that lets us parse incoming requests. However it parses incoming requests that are files. 
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');


const mongoConnect = require('./util/database').mongoConnect; //this mongoConnect constant will be a function since we are exporting a function from util/database.
const User = require('./models/user');

//setting app.js to have the express dependency
const app = express();

//setting the views
app.set('view engine', 'ejs');
app.set('views', 'views');







//setting node.js to read files (the images)
let fileName;

    //the disk storage engine gives us full control on storing files to the disk. It takes 2 optional functions, destination and filename. 
const fileStorage = multer.diskStorage({

    destination: (req, file, cb) =>{
        cb(null, 'images');
    },
    filename: (req, file, cb) =>{
        cb(null, 'colorful-' + file.originalname);
    }
});

    //File filter controls which files should be uploaded and which should be skipped. It takes a callback depending on the boolean value. 
const fileFilter = (req, file, cb) =>{
    
    if(file.mimetype === 'image/png' || file.mimetype === 'images/jpg' || file.mimetype === 'image/jpeg'){
       
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

const imageUpload = multer({storage: fileStorage, fileFilter: fileFilter})



//routes
const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const errorRoute = require('./routes/404');

app.use(function(req, res, next){
    res.setHeader("Content-Security-Policy", "img-src 'self' https://i.ibb.co");
    next();
})




//setting up helmet:
app.use(helmet());

//setting up the compression:
app.use(compression());

app.use(morgan('combined'));

//setting the body parser.
app.use(bodyParser.urlencoded({extended: false}));

//allowing images to be parsed.
app.use(imageUpload.single('image'));

//set the CSS route and other static files such as images and js files:
app.use(express.static(path.join(__dirname, 'public')));

//this middleware is used to retrieve our images statically. We need to add this image path in the beginning becasue the images beign stored are being served incorrect. Technically, were asking
//to treat the images as if they were in the root folder. Since node thinks the images are in the root folder, we need to specify that it's not. and that they are in the the blogImages folder.
app.use('/images', express.static(path.join(__dirname, 'images')));




app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}))


//THIS MIDDLEWARE will be used to find a specific user that has been created:
//essentially what we are doing here is storing the user id in the request. so that it  can be used anywhere.
app.use((req, res, next) =>{

    if(!req.session.user){
        return next();
    }

    User.findById(req.session.user._id)
        .then(user =>{
            if(!user){
                
                return next();
            }

            req.user = user;
            console.log('IN THE APP.JS THE USER NAME IS: ' + req.user.firstName)
            next();
        })
        .catch(err =>{
            console.log(err);
        });

    

});


app.use((req, res, next) =>{
    console.log('the session is logged in yes or no? ' + req.session.isLoggedIn);
    res.locals.isAuthenticated = req.session.isLoggedIn;
    console.log('the res isauthenticated has a value of : ' + res.locals.isAuthenticated);
    next();
});




app.use(blogRoute);
app.use(authRoute);
app.use(profileRoute);
app.use(errorRoute);


mongoConnect(() =>{
    app.listen(process.env.PORT || 3030);
    //most of the time, service providers will provide their own port env variable. and for local development, it will be set back to 3030
})
