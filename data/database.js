/** database **/

var databaseUrl = "paworclaw"; // "username:password@example.com/mydb"
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

exports.upsertUser = upsertUser;
exports.getUserByKey = getUserByKey;
exports.getAllUsers = getAllUsers;