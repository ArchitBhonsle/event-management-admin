const express = require('express');
const router = express.Router();
const userQueries = require('../utils/userQueries');

router.get('/', (req, res) => {
  const search = req.query.search;
  const page = req.query.page;
  const pageLimit = 10;

  userQueries
    .getUserFromRollNo(search, (err, docs) => {
      if (!err) res.send(docs);
      else throw err;
    })
    .limit(pageLimit)
    .skip((page - 1) * pageLimit);
});

module.exports = router;
