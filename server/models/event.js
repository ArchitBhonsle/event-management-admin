const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  day: Number,
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
