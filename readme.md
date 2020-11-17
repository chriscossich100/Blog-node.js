# My Blog Post

Welcome to my Blog. This simple Blog was created as a way to to demenstrate my skills as a front end developer. I also, created this as a template for those who want to create a simple Blog
that contains basic and important features, such as creating and logging in users, and adding comments. Though there are many ways this Blog could've been created, I decided to create it using
Node.js. I chose to develop the blog using Node.js as this gave me the chance to learn more on how to program with 3rd party packages and a bit of back end. Which brings me to the back end of the project. In this Blog, I used NoSql (mongoDb) to create users, add comments, add posts ,etc. 

**Please understand that im not an expert in node.js, so if there is anything I dont explain correctly, refer to the Node.js Documentation.**



_Important Notice_

When working with this Blog, its important to have access to your database. In this case, I used mongodb.
In the util folder, you will find the database.js file. This file contains the main access to the blog database. You will notice this line of code: 

```JavaScript

const mongoConnect = (callback) =>{
    MongoClient.connect(
        'mongodb+srv://yourusernamehere:yourpasswordhere@yourclusternamehere.irdq5.mongodb.net/databasenamehere?retryWrites=true&w=majority' //mongodb will create the database if its not yet been created. we dont 
        //have to do it manually.

        //****** FOR SECURITY REASONS, I HAVE CHANGED THE PASSWORD AND USERNAME WHICH GETS ACCESS TO THE blogposts DATABASE ****************


    )
    .then(client =>{ //this is a client object that gives us access to the database.
        console.log('connected!');
        db = client.db(); //this is storing the connection (access) to the databse. which means the connection will keep on running. 
        callback();
    })
    .catch(err =>{
        console.log(err);
    });
};
```

You will notice that the MongoClient connects to the database. Here, you will need to create your own cluster, with a username, password, clustername, and database. Once you create this, you should have access to your database, and the Blog will be working. 