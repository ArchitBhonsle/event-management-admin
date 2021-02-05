const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  memberRollNos: [String],
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

teamSchema.virtual('members', {
  ref: 'User',
  localField: 'memberRollNos',
  foreignField: 'rollNo',
  justOne: true,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
