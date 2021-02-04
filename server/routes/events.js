const express = require('express');
const router = express.Router();

const Event = require('../models/event');

const isAuth = require('../middleware/isAuth');

router.use(isAuth);

router.get('/:day', async (req, res) => {
  try {
    const day = req.params.day;
    const events = await Event.find(
      { day },
      '-_id eventCode seats maxSeats start title isSeminar category'
    );
    res.send({
      data: events,
      error: null,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
