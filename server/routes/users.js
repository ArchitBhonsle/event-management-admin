const express = require('express');
const router = express.Router();
const userQueries = require('../utils/userQueries');
const mailer = require('../utils/mailer');
const { use } = require('./auth');

router.get('/', (req, res) => {
  const search = req.query.search;
  const page = req.query.page;
  const pageLimit = 30;

  let result = { data: {}, error: null };
  try {
    (async () => {
      await userQueries.getUserFromRollNo(search, 'rollNo criteria moneyOwed department name', page, pageLimit)
        .then(async (docs) => {
          result.data.users = docs;
          await docs;
      });
       
      await userQueries.getUserCountFromRollNo(search)
        .then(async (count) => {
        result.data.maxPage = Math.ceil(count / pageLimit);
        await count;
      });
  
      res.send(result);
      
    })();
  } catch (err) {
    console.log(err);
  }
});

router.get('/:rollNo', (req, res) => {
  const rollNo = req.params.rollNo;

  userQueries.getUserFromRollNo(rollNo, 'rollNo criteria moneyOwed department name email events')
    .then((docs) => {
      res.send({
        data: docs[0],
        error: null,
      });
    });
});

router.delete('/:rollNo', (req, res) => {
  const rollNo = req.params.rollNo;
  userQueries.deleteUser(rollNo);
});

router.post('/payment', (req, res) => {
  const rollNo = req.body.rollNo;
  const amount = req.body.amount;
  const adminUsername = req.session.username;

  userQueries.processPayment(rollNo, amount, adminUsername);
});

router.post('/addUser', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  userQueries.generateUser(name, email);
});

module.exports = router;
