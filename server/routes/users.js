const express = require('express');
const { getUserCountFromRollNo } = require('../utils/userQueries');
const router = express.Router();
const userQueries = require('../utils/userQueries');

router.get('/', (req, res) => {
  const search = req.query.search;
  const page = req.query.page;
  const pageLimit = 30;

  let result = { data: {}, error: {} };
  try {
    (async () => {
      await userQueries.getUserFromRollNo(search, 'rollNo criteria moneyOwed department name', page, pageLimit)
        .then(async (docs) => {
          result.data.users = docs;
          await docs;
      });
       
      await userQueries.getUserCountFromRollNo(search).then(async (count) => {
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

  userQueries.getUserFromRollNo(
    rollNo,
    'rollNo criteria moneyOwed department name email events',
    (err, docs) => {
      if (!err)
        res.send({
          data: docs[0],
          error: null,
        });
      else throw err;
    }
  );
});

module.exports = router;
