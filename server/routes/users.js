const express = require('express');
const { getUserCountFromRollNo } = require('../utils/userQueries');
const router = express.Router();
const userQueries = require('../utils/userQueries');

router.get('/', (req, res) => {
  const search = req.query.search;
  const page = req.query.page;
  const pageLimit = 30;

  userQueries.getUserCountFromRollNo(search, (err, result) => {
    try {
      userQueries
      .getUserFromRollNo(search, 'rollNo criteria moneyOwed department name', (err, docs) => {
        if (!err) res.send({ docs, total: result });
        else throw err;
      })
      .limit(pageLimit)
      .skip((page - 1) * pageLimit);
    } catch (err) {
      console.log(err);
    }
  });
});

router.get('/:rollNo', (req, res) => {
  const rollNo = req.params.rollNo;

  userQueries.getUserFromRollNo(rollNo, 'rollNo criteria moneyOwed department name email events', (err, docs) => {
    if(!err) res.send(docs);
    else throw err;
  })
});

module.exports = router;
