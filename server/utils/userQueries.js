const User = require('../models/user');
const Event = require('../models/event');

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
  deleteUser: (rollNo) => {
    (async () => {
      await User.find({ rollNo: rollNo }, 'events')
      .exec()
      .then((docs) => {
        for(let i=0;i<docs.data.events.length;++i) {
          docs.data.events[i].seat--;
        }
        docs.save();
      })
      await User.deleteOne({ rollNo: rollNo }, (err) => {
        if(err) console.log(err);
      })
    })();
  }
};
