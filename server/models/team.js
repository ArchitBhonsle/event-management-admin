const mongoose = require('mongoose');
const User = require('./user');

const teamSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('Team', teamSchema);
