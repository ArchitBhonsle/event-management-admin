const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const User = require('../models/user');

const path = require('path');
const pdf = require('pdf-creator-node');
const fs = require('fs');
const templatesPath = path.resolve(__dirname, '../templates');
const userReport = fs.readFileSync(
  path.resolve(templatesPath, 'user-report.html'),
  'utf8'
);

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
    const maxPage = Math.ceil(
      (await User.estimatedDocumentCount({ rollNo: regex })) / pageLimit
    );

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

router.get('/report', async (req, res) => {
  try {
    const { department, semester } = req.query;

    let users = await User.find(
      { department, semester },
      '-_id rollNo name criteria moneyOwed'
    )
      .lean()
      .exec();

    users = users.map(({ rollNo, name, criteria, moneyOwed }) => ({
      rollNo,
      name,
      criteria: Object.entries(criteria)
        .map(([k, v]) => `${v ? '✓' : '✗'}${k}`)
        .join(' '),
      moneyOwed: '₹' + moneyOwed,
    }));

    const resultPath = path.resolve(
      templatesPath,
      `${department}_${semester}.pdf`
    );

    await pdf.create({
      html: userReport,
      data: {
        users,
      },
      path: resultPath,
    });

    res.download(resultPath);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

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

module.exports = router;
