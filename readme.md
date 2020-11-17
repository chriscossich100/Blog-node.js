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


### If you find any issues with the blog, please email me at chriscossich@gmail.com

**TUTORIAL ON HOW TO DO THIS:**

First, to create your own mongodb cluster to store your information, you need to create an account with MongoDb. You can do so by following this link:
[MongoDb](https://account.mongodb.com/account/login)

***

Next, after creating your account and creating a project name, you should see this: 

![step1mongodb](https://lh3.googleusercontent.com/joiPMQmk0DzIR9DQyE0e31vsg6WvIBIEB9us370xsWV_4rCq6FDmVGpxSwJm5RkCx8vF2lg53u4qI1KKW8xLgRAKYwDXjuiFYDwJP337UlPh3GAo68zilVEJAtuz2V9QJFkb0xZXNNkqKCU9L35Ga1I58idFtCD2dabUd6gLnVSMjojMKUfftjD863ja1hoBFCp5ceT8inFnQaVwgm29JQFMzMbzMGmuMxALwg5e9TbCrDxbyrM_dCJ8zgEkArunf_j_eoKBRBv12So1gtVteKnp47P_8rgWn7SWsQ8BdUDJ3RtxNySl4CMiI2Gi2KeOr5sztQy1JMgdhBfoi6phT6pZHA5E3qRmbHf8hgdaMzmloNw2qnIU7khmVCXFu8oIPwhu5nhauwmAkF06q3y7YnK8UormSkOStX5JINp42ypAA-cY3avsideVz_0VNDnE_nlv2PaNnXO0ZOzvDN2UnuSGrXkaMGEmhJeQss6sypsqB07E1NxsAL9fXgbiVx8m4VxXRNhziaDVowEIXbUfxnaT-Y45VF12Zrl8ul_gzldvuuOMcG9HlDKG2uNqcqdS_RlczjDvIBsvIMRoWxh6X2Rj2AU93KqdhhE_sQLS8E6iQElGIW1VB4bTjIA5wxmTWIjErawLmsEDmLvWerwXfRKbkRE5IGNLf742XpRiS73E65f6GIOQp-kaOi_CMA=w710-h720-no?authuser=0)


**I WOULD RECOMMEND THAT YOU KEEP THE DEFAULT SLECTIONS. YOU DONT HAVE TO PAY FOR THESE**

From here, create a username and password and any IP Addresses you want. After filling out those details. You can immediately access your Cluster. Your Cluster might still be setting up. So, give it some time. 

***
If you need to give access to the database from anywhere you can do so by selecting _Network Access_. From there, you can add an IP Address, and specify which address. 


On the main page, you should see this: 

![step2mongodb](https://lh3.googleusercontent.com/BZvxnfk7BPEFuty3YHJV6W3zTX6uj-ilPNf8huYLe--6jELvav9_-DjcBS5Yj9l4DFkU5aIra9i-waFiNVGZy5GOyX9oyVm__LqrGJYWfCXw7Nyn9sy5ENNOvun9DW_3uesNaZdKNSSX0GA44V8lANIxjzp3YUz7PA4LJgtcDLILMNyu0T_vLQM740uIBSOyiYdJMFKJ7RZSMPw092tEeeTS6Q8ludVmG3BixsKxshJHdgkMvdFaCAd0G9-5PoMO_fdgxFawSzGyDRJAXEZe41g_eEgZus1x1Gd55zfAE8qr_lStW4dl-ka-meYrv2C4-pehAb4pf4shBHk4tGzPMZhDwjDyspLcjVa7MHh8mOVM5gibomgiMNZVD8zKghJs1O3deahvwpZX0tCn2Vqn3T2LKWtCYGMdS8phsdjuECJrNygsSQysNy6hEaw3ui39WnraG1Jbug8QqzNkv2G-46B-9U2Ndw2HahZTTPYW9LBuWCcTAyLjiuoxcIrhPyQP5Kv3ttqo59eQSMPc8LfXmCMBX1zjX2xIL98xywQ4QFHgaHavK3Nm3e6yydtHWctXl-0qIFmXPwEUYJ80z0MBo3zXN5QicaUy4igDhE8kldbmGKB8ODyupeR_HuvxwU_YpjHSSB7niQfhF8PVdXBbA6Cik4cN7a3xGJMv8Y4O1deCopoiByCANu13qRK1Ew=w1577-h735-no?authuser=0)


***

Select the _Connect your application_ option. You will see a modal that explains how to connect the database to the application. Copy that link. replace the password and dbname with the password you chose earlier, and a dbname of your choice.

![step3mongodb](https://lh3.googleusercontent.com/udTuC5WHyQu3gO9Qaslul5gibiRkNCJYPZxXrdd-rhihbPtRC3CzpD2rApncoKKYsCsDzzUfUi-uaHDYC_cc_xCwWvVtPkVA4PMfaB0S_TV0evn2ICZyQB6_k2Y7o_zi-AjkGkvvB8p9PZxL_EdBZaYlloAYDtvFRPtcfaE_LkcAoGzzb6466c8WFRPb6ZwhPTVrHdpHUU8ODooDYO1UsJXY-dkvL-bW9NoDgQqiqA65pkmDtsH10NZj8d5AlVuc3eIC21xrb3DYLPK7F1NJn1xxVAiAensy-7sG_-xVSKC9EmfGWSaXQR5esZeHxvH1D10EEN5IPKLkGtdGQ2hror5KUuz336sYwNIC8etVGBlrUVulsHrfA0LROLqF_FOlG3bTANcLDULRYqGPNascNV99PLrR3wgZSwg_CNbt7q-S6MZoqN_4WaSLXIkpXMOXCN7yoeV4SgMzwYi9qB2NCd9cM3nEgqZ7vSxBpY-jwdbEYNok_fMEeLYl0uyV0-BSexDAGNF4tHJdyE5JkXC1iEQlVOp1A9qm4YA1fcnQdlWNGfZ7kWCqP88nIda6xFx4nuycwU-YUworPnDcoV0m_aQ_63Anj2aFnkDJ0Ewyh3s7MveeX8onDJtupdNAFEa85GQ4j_UWTdY6Nz-2eCHuXCGWIkCgsBgUgtNwqAZ9NN8ADbn5wJEg9-R1jjPy5A=w854-h849-no?authuser=0)


Now, from here go to the util folder and select the database.js folder. Where you see this code


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

replace the string database string, with the url you created. From there you should be able to start your app. Just type _node app.js_


***

**IF THESE INSTRUCTIONS WEREN'T CLEAR, THEN PLEASE FEEL FREE TO EMAIL ME AT chriscossich@gmail.com**
