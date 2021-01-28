const User = require("../models/user");

function getUser(rollNo) {
    const regex = new RegExp(rollno, 'i');
    var users = User.find({rollno: regex}).sort();
}