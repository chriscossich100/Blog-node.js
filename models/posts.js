

//WERE CREATING A CLASS BECASUE WE WANT TO CREATE OUR OWN MODEL. 

// const mongoConnect = require('../util/database'); //we are importing the function where we do pass a callback where we do connect to mongodb.



const mongodb = require('mongodb');
const getDb = require('../util/database').getDb; // now, we can call this function to get access to the database, instead of connecting to the connection of the database.

class Posts{
    constructor(title, image, overview, content, date, realDate, postCreator){ //in this constructor, we want to store the post information: 
        this.title = title,
        this.image = image,
        this.overview = overview,
        this.content = content,
        this.date = date,
        this.realDate = realDate,
        this.postCreator = postCreator
    }
    //in other words we are creating a new Post in javascript

    save(){



        const db = getDb(); //remember that getDb() simply returns the databse instance we connected to. 

        return db.collection('posts').insertOne(this) //we are returning the collection becacuse it will allow us to treat this whole chain as a promise. 
            .then(result =>{
                console.log(result);
            })
            .catch(err =>{
                console.log(err);
            });
    }

    static fetchAll(){
        const db = getDb(); //need to get access to the database. 
        return db.collection('posts').find().sort({realDate: -1})
            .toArray() //which allows us to get all the documents and turn them into a javascript array. this is good for at least 100 documents.
            .then(posts =>{
                console.log(posts);
                return posts;
            })
            .catch(err =>{
                console.log(err);
            })
    };

    static findById(postId){
        const db = getDb();
        return db.collection('posts').find({_id: new mongodb.ObjectId(postId)}).next()
            .then(post =>{
                console.log(post);
                return post;
            })
            .catch(err =>{
                console.log(err);
            })
    }
};

module.exports = Posts;