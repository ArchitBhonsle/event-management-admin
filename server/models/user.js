const mongoose = require('mongoose');
const validator = require('validator');

const Event = require('./event');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: /^[a-zA-Z\']{1,50} [a-zA-Z\']{1,50}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid');
      }
    },
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      const re = /^\d{6,7}$/g;
      if (!re.test(String(value))) {
        throw new Error('Rollno is not valid');
      }
    },
  },
  department: {
    type: String,
    index: true,
    required: true,
    trim: true,
    uppercase: true,
    enum: ['COMPS', 'ELEC', 'EXTC', 'IT', 'MECH', 'OTHER'],
  },
  semester: {
    type: Number,
    index: true,
    min: 1,
    max: 8,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  criteria: {
    1: { type: Boolean, default: false },
    2: { type: Boolean, default: false },
    3: { type: Boolean, default: false },
    C: { type: Boolean, default: false },
    T: { type: Boolean, default: false },
    F: { type: Boolean, default: false },
  },
  moneyOwed: {
    type: Number,
    default: 0,
  },
  hasFilledProfile: {
    type: Boolean,
    default: false,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: Event }],
});

module.exports = mongoose.model('User', userSchema);
