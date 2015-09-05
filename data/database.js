/** database **/
var data = require('../public/javascripts/dummydata.js')
var mongojs = require('mongojs')

var databaseUrl= process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/paworclaw';

var collections = ["users"]
var db = mongojs(databaseUrl, collections);

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


//db.users.remove({});
//upsertUser(user1);
//upsertUser(user2);
//upsertUser(user3);
//upsertUser(user4);
//upsertUser(user5);
//upsertUser(user6);
//upsertUser(user7);
//upsertUser(user8);
//upsertUser(user9);
//upsertUser(user10);
//upsertUser(user11);
//upsertUser(user12);
//upsertUser(user13);
//upsertUser(user14);
//upsertUser(user15);
//upsertUser(user16);
//upsertUser(user17);
//upsertUser(user18);
//upsertUser(user19);
//upsertUser(user20);
//upsertUser(user21);
//upsertUser(user22);
//upsertUser(user23);
//upsertUser(user24);
//upsertUser(user25);
//upsertUser(user26);
//upsertUser(user27);
//upsertUser(user28);
//upsertUser(user29);
//upsertUser(user30);





exports.upsertUser = upsertUser;
exports.getUserByKey = getUserByKey;
exports.getAllUsers = getAllUsers;