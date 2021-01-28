const User = require("../models/user");

module.exports = (rollNo, callback) => {
    const regex = new RegExp(rollNo, 'i');
    var users = User.find({rollno: Number(rollNo)}, (err, docs) => {
        callback(err, docs);
    });
    return users;
}