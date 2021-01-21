const express = require('express');
const router = express.Router();
const argon2 = require('argon2');

const { Admin } = require('../models/admin');

function isAuth(req, res, next) {
  if (req.session.username) next();
  else res.send({ data: null, error: 'not authenticated' });
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const doc = await Admin.findOne({ username });
    if (doc === null) {
      res.send({
        data  : null,
        error : [ { field: 'username', message: "user doesn't exist" } ]
      });
      return;
    }
    if (!await argon2.verify(doc.password, password)) {
      res.send({
        data  : null,
        error : [ { field: 'password', message: 'incorrect password' } ]
      });
    }
    req.session.username = doc.username;
    req.session.save();
    res.send({
      data  : { user: { username: doc.username, name: doc.name } },
      error : null
    });
  } catch (error) {
    console.error(error);
  }
});

router.post('/logout', isAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send({ data: null, error: 'unknown error occurred' });
    } else {
      res.send({ data: true, error: null });
    }
  });
});

router.get('/', isAuth, async (req, res) => {
  const username = req.session.user;
  try {
    const user = await Admin.findOne({ username });
    if (user === null) {
      res.send({
        data  : null,
        error : "user doesn't exist"
      });
      return;
    }
    res.send({
      data  : { user: { username: user.username, name: user.name } },
      error : null
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
