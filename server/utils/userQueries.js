const User = require('../models/user');

module.exports = {
  getUserFromRollNo: (rollNo, callback) => {
    const regex = new RegExp(rollNo ? '^' + rollNo : '', 'i');
    return User.find({ rollNo: regex }, (err, docs) => {
      callback(err, docs);
    });
  },
  getUserFromEmail: (email, callback) => {
    const regex = new RegExp(email, 'i');
    return User.find({ email: regex }, (err, docs) => {
      callback(err, docs);
    });
  },
};
