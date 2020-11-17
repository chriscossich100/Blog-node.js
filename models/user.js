

const mongodb = require('mongodb');
const getDb = require('../util/database').getDb; // now, we can call this function to get access to the database, instead of connecting to the connection of the database.
const ObjectId = mongodb.ObjectId;

 class User {
     constructor(firstName, lastName, email, password, comment, id){
         this.firstName = firstName;
         this.lastName = lastName;
         this.email = email;
         this.password = password;
         this.comment = comment;
         this._id = id;
     }

     static addToCommentsList(postInfo, userInfo){


        

            const commentExist = userInfo.comment.post.findIndex(cp =>{
                return cp.postId.toString() === postInfo._id.toString();
            });
            
            let newQuantity = 1;
            const updatedCommentList = [...userInfo.comment.post];
    
            if(commentExist >= 0){
                newQuantity = userInfo.comment.post[commentExist].quantity + 1;
                updatedCommentList[commentExist].quantity = newQuantity;
            }
            else{
                updatedCommentList.push({postId: new ObjectId(postInfo._id), quantity: newQuantity});
            }
    
            const updatedComment = {
                post: updatedCommentList
            }
    
            
    
            // const updatedCommentList = {post: [{postId: new ObjectId(postInfo._id), quantity: 1}]};
    
            const db = getDb();
             return db.collection('users').updateOne({_id: new ObjectId(userInfo._id)}, {$set: {comment: updatedComment}});
    
       
     }

     save(){
        const db = getDb(); //remember that getDb() simply returns the databse instance we connected to. 

        return db.collection('users').insertOne(this) //we are returning the collection becacuse it will allow us to treat this whole chain as a promise. 
            .then(result =>{
                console.log(result);
            })
            .catch(err =>{
                console.log(err);
            });
     }

    

     static findById(userId){
        const db = getDb();
        return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next()
            .then(user =>{
                console.log(user);
                return user;
            })
            .catch(err =>{
                console.log(err);
            })
    }

    static updatePassword(userId, newPassword){
        const db = getDb();
        return db.collection('users').updateOne(
                {_id: new mongodb.ObjectId(userId)},
                {$set: {password: newPassword}}
            )
            .then(user =>{
                console.log(user);
                return user;
            })
            .catch(err =>{
                console.log(err);
            })
    };

    static findOne(userInfo){
        const db = getDb();
        return db.collection('users').find({email: userInfo}).next()
            .then(user =>{
                console.log(user);
                return user;
            })
            .catch(err =>{
                console.log(err);
            })
    }

    static findPostsRelatedToUser(userInfo){

        const db = getDb();
        const postId = userInfo.comment.post.map(i =>{
            return i.postId;
        });
        console.log('the post ids in which the user commented in our: ' + postId);

        return db.collection('posts')
            .find({_id: {$in: postId}})
            .toArray()
            .then(posts =>{
                console.log('the posts pulled out from the findPostsRelatedToUser method were: ' + posts);
                return posts;
            })
            .catch(err =>{
                console.log(err);
            });
    }

 };

 module.exports = User;