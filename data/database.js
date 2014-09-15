/** database **/

var databaseUrl= process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/paworclaw';// "username:password@example.com/mydb"


var collections = ["users"]
var db = require("mongojs").connect(databaseUrl, collections);

var guid = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};


var upsertUser = function (user) {
    if (!user._id) user._id = guid();
    db.users.update({_id:user._id},user, {
        upsert: true
    });
};

var getUserByKey = function(id,callback) {
    db.users.findOne({_id:id}, function(err, doc) {
        callback(doc);
    });
};

var getAllUsers = function (callback) {
    db.users.find({}, function (err, docs) {
        callback(docs);
    });
};

var user1 = {
    "_id" : "84b44ced-a21c-c60f-6c5c-a21a1c623459",
     name: "boolean",
     bio: "The best dog there can be",
     hashtags: ["dog", "meozer", "cute", "puppy", "love"],
     upvotes: 10,
     downvotes: 3,
     imageurl: "/images/pet.jpg"

};

var user2 = {
    "_id" : "9e7a82ab-6673-41c9-5332-cb39cd93939d",
    name: "Lenna",
    bio: "It's a cat!",
    hashtags: ["cat", "meozer", "cute"],
    upvotes: 8,
    downvotes: 4,
    imageurl: "/images/cat.jpg"
};
//
//upsertUser(user1);
//upsertUser(user2);

exports.upsertUser = upsertUser;
exports.getUserByKey = getUserByKey;
exports.getAllUsers = getAllUsers;