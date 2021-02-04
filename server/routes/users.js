const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const User = require('../models/user');

router.use(isAuth);

router.get('/', async (req, res) => {
  try {
    const search = req.query.search;
    const page = req.query.page;
    const pageLimit = 30;

    const regex = new RegExp(search ? '^' + search : '', 'i');
    const users = await User.find({ rollNo: regex })
      .limit(pageLimit)
      .skip((page - 1) * pageLimit)
      .select('-_id rollNo criteria moneyOwed department name')
      .exec();
    const maxPage =
      (await User.estimatedDocumentCount({ rollNo: regex })) / pageLimit;

    res.send({
      data: {
        users,
        maxPage,
      },
      error: null,
    });
  } catch (err) {
    res.status(500).send({
      data: null,
      error: 'something went wrong',
    });
    console.log(err);
  }
});

// router.post('/', (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;

//   userQueries.generateUser(name, email);
// });

router.get('/:rollNo', async (req, res) => {
  try {
    const rollNo = req.params.rollNo;

    const user = await User.findOne(
      { rollNo },
      '-_id rollNo criteria moneyOwed department name email events'
    ).populate('events', '-_id eventCode start end entryFee');

    res.send({
      data: user,
      error: null,
    });
  } catch (err) {
    res.send(500).send({
      data: null,
      error: 'something went wrong',
    });
    console.error(err);
  }
});

// router.delete('/:rollNo', (req, res) => {
//   const rollNo = req.params.rollNo;
//   userQueries.deleteUser(rollNo);
// });

module.exports = router;
