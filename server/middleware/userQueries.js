const User = require("../models/user");

module.exports = {
  getUserFromRollNo : (rollNo, callback) => {
    const regex = new RegExp(rollNo, 'i');
    User.find({rollno: regex}, (err, docs) => {
      callback(err, docs);
    });
  },
  getUserFromEmail : (email, callback) => {
    const regex = new RegExp(email, 'i');
    User.find({email: regex}, (err, docs) => {
      callback(err, docs);
    });
  },
};