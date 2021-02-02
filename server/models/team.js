const mongoose = require('mongoose');
const User = require('./user');

const teamSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  name: String,
});

module.exports = mongoose.model('Team', teamSchema);

// teams
// - teamID
// - members [ userID ]
