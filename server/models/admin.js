const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
