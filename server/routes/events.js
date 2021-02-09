const express = require('express');
const router = express.Router();

const Event = require('../models/event');

const isAuth = require('../middleware/isAuth');
const eventValidation = require('../utils/eventValidation');

const path = require('path');
const pdf = require('pdf-creator-node');
const fs = require('fs');
const templatesPath = path.resolve(__dirname, '../templates');
const eventReport = fs.readFileSync(
  path.resolve(templatesPath, 'event-report.html'),
  'utf8'
);
const teamReport = fs.readFileSync(
  path.resolve(templatesPath, 'team-report.html'),
  'utf8'
);

router.use(isAuth);

router.get('/report/:eventCode', async (req, res) => {
  const eventCode = req.params.eventCode;

  const event = await Event.findOne({ eventCode });
  if (event.teamSize === 1) {
    await event.execPopulate({
      path: 'registered',
      model: 'User',
      select: '-_id rollNo name',
      options: { lean: true },
    });

    const resultPath = path.resolve(templatesPath, `event_${eventCode}.pdf`);

    await pdf.create(
      {
        html: eventReport,
        data: {
          title: event.title,
          users: event.registered,
        },
        path: resultPath,
      },
      {
        format: 'A4',
        orientation: 'portrait',
      }
    );

    res.download(resultPath);
  } else {
    await event.execPopulate({
      path: 'registered',
      model: 'Team',
      select: '-_id name memberRollNos',
      options: { lean: true },
      populate: [
        {
          path: 'members',
          select: '-_id rollNo name',
          options: { lean: true },
        },
      ],
    });

    const resultPath = path.resolve(templatesPath, `event_${eventCode}.pdf`);

    const data = [];
    event.registered.forEach(({ name, members }) => {
      data.push({
        teamName: name,
        teamSpan: members.length,
        rollNo: members[0].rollNo,
        name: members[0].name,
      });
      members.slice(1).forEach(member => {
        data.push({
          rollNo: member.rollNo,
          name: member.name,
        });
      });
    });

    await pdf.create(
      {
        html: teamReport,
        data: {
          title: event.title,
          data,
        },
        path: resultPath,
      },
      {
        format: 'A4',
        orientation: 'portrait',
      }
    );

    res.download(resultPath);
  }
});

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
