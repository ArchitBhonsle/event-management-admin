const express = require('express');
const router = express.Router();

const Event = require('../models/event');

const isAuth = require('../middleware/isAuth');
const eventValidation = require('../utils/eventValidation');

router.use(isAuth);

router.get('/:eventCode', async (req, res) => {
  try {
    const eventCode = req.params.eventCode;
    const event = await Event.findOne(
      { eventCode },
      '-_id eventCode day start end title description image maxSeats category isSeminar teamSize isTeamSizeStrict entryFee prizeMoney'
    );
    if (eventCode) {
      res.send({
        data: event,
        error: null,
      });
    } else {
      res.send({
        data: null,
        error: 'event not found',
      });
    }
  } catch (err) {
    res.status(500).send({
      data: null,
      error: 'something went wrong',
    });
    console.error(err);
  }
});

router.put('/:eventCode', async (req, res) => {
  try {
    const eventCode = req.params.eventCode;

    const {
      processed: { eventCode: _, ...otherFields },
      errors: { eventCode: eventCodeError, ...otherErrors },
    } = await eventValidation(req.body);

    if (
      eventCodeError === 'already exists' &&
      Object.keys(otherErrors).length === 0
    ) {
      await Event.findOneAndUpdate({ eventCode }, otherFields, {
        new: true,
      });
      res.send({
        data: true,
        error: null,
      });
    } else {
      res.send({
        data: null,
        error: otherErrors,
      });
    }
  } catch (err) {
    res.status(500).send({
      data: null,
      error: 'something went wrong',
    });
    console.error(err);
  }
});

router.get('/pages/:day', async (req, res) => {
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
    res.status(500).send({
      data: null,
      error: 'something went wrong',
    });
    console.error(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { processed, errors } = await eventValidation(req.body);

    if (Object.keys(errors).length === 0) {
      const event = new Event(processed);
      await event.save();
      res.send({
        data: true,
        error: null,
      });
    } else {
      res.send({
        data: null,
        error: errors,
      });
    }
  } catch (err) {
    res.status(500).send({
      data: null,
      error: 'something went wrong',
    });
    console.error(err);
  }
});

module.exports = router;
