const User = require('../models/user');
const Event = require('../models/event');
const Payment = require('../models/payment');
const { randomNumber } = require('../utils/randomNumberInRange');
const { rword } = require('rword');
const bcrypt = require('bcrypt');

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
      await User.findOne({ rollNo: rollNo }, 'events')
      .populate('events')
      .exec()
      .then((docs) => {
        for(let i = 0; i < docs.length; ++i) {
          Event.find({ _id: docs[i] }, 
            (err, event) => {
              event.seats++;
              event.registered.pull(docs._id);
              event.save((err) => {
                if(err) console.log(err);
              });
            });
        }
      });
      await User.deleteOne({ rollNo: rollNo }, (err) => {
        if(err) console.log(err);
      })
    })();
  },
  processPayment: (rollNo, amount, admin) => {
    (async () => {
      const payment = new Payment({
        adminUsername: admin,
        rollNo: rollNo,
        amount: amount,
      });
      await payment.save();
      await User.findOne({ rollNo: rollNo }, 'moneyOwed')
      .exec()
      .then((docs) => {
        docs.moneyOwed -= amount;
        docs.save();
      });
    })();
  },
  generateUser: (name, email) => {
    const min = 100;
    const max = 999;
    const words = rword.generate(2, {
      length: '3-4',
      capitalize: 'first',
    });
    const password = words[0] + words[1] + Math.floor(Math.random() * (max - min) + min);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const regex = new RegExp('9' ? '^' + '9' : '', 'i');
    let lastRoll = 0;
    return (async () => {
      await User
        .find({ rollNo: regex })
        .exec()
        .then((docs) => {
          console.log(docs);
          if(docs.length > 0) 
            lastRoll = Number(docs[docs.length - 1].rollNo) + 1;
          else 
            lastRoll = 900000;
        });
      const newUser = new User({
        name: name,
        email: email,
        rollNo: lastRoll,
        department: 'OTHER',
        password: hash,
        tokens: []
      });
      await newUser.save();
      
      return { 
        rollNo: lastRoll,
        password: password,
      };
    })();

  }
};
