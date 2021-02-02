const User = require('../models/user');

module.exports = {
  getUserFromRollNo: (rollNo, fields, page, pageLimit) => {
    const regex = new RegExp(rollNo ? '^' + rollNo : '', 'i');
    return User.find({ rollNo: regex }, fields)
      .limit(pageLimit)
      .skip((page - 1) * pageLimit)
      .exec()
      .then((docs) => {
        return docs;
      });
  },
  getUserFromEmail: (email, callback) => {
    const regex = new RegExp(email, 'i');
    return User.find({ email: regex }, (err, docs) => {
      callback(err, docs);
    });
  },
  getUserCountFromRollNo: (rollNo) => {
    const regex = new RegExp(rollNo ? '^' + rollNo : '', 'i');
    return User.countDocuments({ rollNo: regex })
      .exec()
      .then((count) => {
        return count;
      });
  },
};
