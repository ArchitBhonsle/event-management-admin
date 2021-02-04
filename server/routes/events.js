const express = require('express');
const router = express.Router();

const Event = require('../models/event');

const isAuth = require('../middleware/isAuth');

router.use(isAuth);

router.get('/:day', async (req, res) => {
  const day = req.params.day;
  const events = await Event.find(
    { day },
    '-_id eventCode seats maxSeats start title'
  );
  res.send({
    data: events,
    error: null,
  });
});

module.exports = router;
