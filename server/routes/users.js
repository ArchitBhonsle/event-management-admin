const express = require("express");
const router = express.Router();
const argon2 = require("argon2");

const Users = require("../models/user");
const userQueries = require("../middleware/userQueries");

router.get("/", (req, res) => {
  const rollno = req.query.rollno;
  const page = req.query.page;
  const pageLimit = 10;

  userQueries.getUserFromRollNo(rollno, (err, docs) => {
    if(!err)
      res.send(docs);
    else
      throw err;
  }).limit(pageLimit)
    .skip((page - 1) * pageLimit);
});

module.exports = router;
