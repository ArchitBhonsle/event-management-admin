const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  },
  day: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
  },
  maxSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    enum: ['C', 'T', 'F'],
  },
  isSeminar: {
    type: Boolean,
    required: true,
  },
  teamSize: {
    type: Number,
    required: true,
    min: 1,
  },
  isTeamSizeStrict: {
    type: Boolean,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
  },
  prizeMoney: {
    type: [Number],
    required: true,
  },
  registered: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
