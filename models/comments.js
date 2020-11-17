const mongodb = require('mongodb');
const getDb = require('../util/database').getDb; // now, we can call this function to get access to the database, instead of connecting to the connection of the database.




class Comments{

    constructor(comment, postId, userId, date, realDate){

        this.comment = comment;
        this.postId = postId;
        this.userId = userId;
        this.date = date;
        this.realDate = realDate;
        
    }


    save(){
        const db = getDb(); //remember that getDb() simply returns the databse instance we connected to

        return db.collection('comments').insertOne(this) //we are returning the collection becacuse it will allow us to treat this whole chain as a promise. 
            .then(result =>{
                console.log(result);
            })
            .catch(err =>{
                console.log(err);
            });
    }

    static findById(commentId){
        const db = getDb();
        return db.collection('comments').find({postId: commentId}).sort({realDate: -1}).toArray()
            .then(comments =>{
                console.log(comments);
                return comments;
            })
            .catch(err =>{
                console.log(err);
            })
    }
};


module.exports = Comments;