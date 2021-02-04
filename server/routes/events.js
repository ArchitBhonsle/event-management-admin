const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');

router.use(isAuth);

router.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
