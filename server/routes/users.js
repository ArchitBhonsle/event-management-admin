const express = require("express");
const router = express.Router();
const argon2 = require("argon2");

const Users = require("../models/user");
const userQueries = require("../middleware/userQueries");

router.get("/", (req, res) => {
  const search = req.query.rollno;
  const page = req.query.page;

  userQueries.getUserFromRollNo(search, (err, docs) => {
    if(!err)
      res.send(docs);
    else
      throw err;
  });
});

module.exports = router;
