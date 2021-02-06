const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const Payment = require('../models/payment');
const User = require('../models/user');

router.use(isAuth);

router.get('/', async (req, res) => {
  try {
    const { page = 1, admin, user } = req.query;
    const pageLimit = 60;

    const filter = {};
    if (admin) filter.adminUsername = admin;
    if (user) filter.userRollNo = user;
    const payments = await Payment.find(
      filter,
      '-_id adminUsername userRollNo time amount'
    )
      .sort('time')
      .limit(pageLimit)
      .skip((page - 1) * pageLimit)
      .exec();

    const maxPage = Math.ceil(
      (await Payment.estimatedDocumentCount(filter)) / pageLimit
    );

    res.send({
      data: {
        payments,
        maxPage,
      },
      error: null,
    });
  } catch (err) {
    res.status(500).send({
      data: null,
      error: 'something went wrong',
    });
    console.error(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { rollNo, amount } = req.body;
    if (amount === 0) {
      res.sendStatus(200);
      return;
    }

    await User.findOneAndUpdate(
      { rollNo },
      { $inc: { moneyOwed: -1 * amount } }
    );
    const payment = new Payment({
      userRollNo: rollNo,
      amount,
      adminUsername: req.session.username,
    });
    await payment.save();

    res.status(200).send({ data: true, error: null });
  } catch (err) {
    res.status(500).send({ data: null, error: true });
    console.log(err);
  }
});

module.exports = router;
