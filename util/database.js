const mongodb = require('mongodb'); //gives us access to the mongodb package.

const MongoClient = mongodb.MongoClient; //this client gives us access to the mongodb database.


let db; 

const mongoConnect = (callback) =>{
    MongoClient.connect(
        'mongodb+srv://chriscossich:Gugu9000@blogcluster.irdq5.mongodb.net/blogposts?retryWrites=true&w=majority'
       
        
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

const getDb = () =>{
    if(db){
        return db; //this is returning access to the databse. 
    }
    throw 'No database found!'
}


// module.exports = mongoConnect;

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;

//or:
/*module.exports = {
    getDb: getDb,
    mongoConnect: mongoConnect
}
*/