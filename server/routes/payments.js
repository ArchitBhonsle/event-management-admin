const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const Payment = require('../models/payment');
const User = require('../models/user');

router.use(isAuth);

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
      rollNo,
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
