const express = require('express');
const router = express.Router();

const { Admin } = require('../models/admin');

function isAuth(req, res, next) {
  if (req.session.username) next();
  else res.send({ data: null, error: 'not authenticated' });
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  Admin.findOne({ username, password }, (err, doc) => {
    if (err) {
      console.error(err);
      return;
    }
    if (doc === null) {
      res.send({ data: null, error: 'user not found' });
    } else {
      const { username, name } = doc;
      res.send({
        data    : { username, name },
        error   : null,
        message : 'login successful'
      });
      req.session.username = username;
      req.session.save();
    }
  });
});

router.post('/logout', isAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send({ data: null, error: err.message, message: 'logout failed' });
    } else {
      res.send({ data: null, error: null, message: 'logout successful' });
    }
  });
});

module.exports = router;
