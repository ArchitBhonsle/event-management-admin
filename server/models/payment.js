const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  adminUsername: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    validate(value) {
      const re = /^\d{6,7}$/g;
      if (!re.test(String(value))) {
        throw new Error('Rollno is not valid');
      }
    },
  },
  amount: {
    type: Number,
    required: true,
  },
});