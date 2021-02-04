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

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
