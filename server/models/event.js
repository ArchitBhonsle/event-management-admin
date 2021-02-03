const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: '',
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
  prizeMoney: Number,
  teamSize: {
    type: Number,
    required: true,
  },
  registered: [{ type: String }],
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
