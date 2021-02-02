const mongoose = require('mongoose');
const User = require('./user');
const Team = require('./team');

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  maxSeats: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  teamSize: {
    type: Number,
    required: true,
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: Team }],
});

module.exports = mongoose.model('Event', eventSchema);

// events
// - eventID
// - times { startTime, endTime }
// - category
// - description
// - seats
// - price
// - teamSize
// - registered [ teamID/userID ]
