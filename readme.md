# My Blog Post

Welcome to my Blog. This simple Blog was created as a way to to demenstrate my skills as a front end developer. I also, created this as a template for those who want to create a simple Blog
that contains basic and important features, such as creating and logging in users, and adding comments. Though there are many ways this Blog could've been created, I decided to create it using
Node.js. I chose to develop the blog using Node.js as this gave me the chance to learn more on how to program with 3rd party packages and a bit of back end. Which brings me to the back end of the project. In this Blog, I used NoSql (mongoDb) to create users, add comments, add posts ,etc. 

**Please refer to the Node.js documentation for any futher questions**



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


### If you find any issues with the blog, please email me at chriscossich@gmail.com

**TUTORIAL ON HOW TO DO THIS:**

First, to create your own mongodb cluster to store your information, you need to create an account with MongoDb. You can do so by following this link:
[MongoDb](https://account.mongodb.com/account/login)

***

Next, after creating your account and creating a project name, you should see this: 

![step1mongodb](https://i.ibb.co/yVw69b2/step1.png)


**I WOULD RECOMMEND THAT YOU KEEP THE DEFAULT SELECTIONS. YOU DONT HAVE TO PAY FOR THESE**

From here, create a username and password and any IP Addresses you want. After filling out those details. You can immediately access your Cluster. Your Cluster might still be setting up. So, give it some time. 

***
If you need to give access to the database from anywhere you can do so by selecting _Network Access_. From there, you can add an IP Address, and specify which address. 


On the main page, you should see this: 

![step2mongodb](https://i.ibb.co/vm23Xrs/step2.png)


***

Select the _Connect your application_ option. You will see a modal that explains how to connect the database to the application. Copy that link. replace the password and dbname with the password you chose earlier, and a dbname of your choice.

![step3mongodb](https://i.ibb.co/z81yvK8/step3.png)


Now, from here go to the util folder and select the database.js file. Where you see this code


```JavaScript
const mongoConnect = (callback) =>{
    MongoClient.connect(
        'mongodb+srv://yourname:yourpassword0@cluster0.bagsc.mongodb.net/yourdbname?retryWrites=true&w=majority' 
       
        
        //mongodb will create the database if its not yet been created. we dont 
        //have to do it manually.
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

replace the database string, with the url you created. From there you should be able to start your app. Just type _node app.js_


***

**IF THESE INSTRUCTIONS WEREN'T CLEAR, THEN PLEASE FEEL FREE TO EMAIL ME AT chriscossich@gmail.com**
