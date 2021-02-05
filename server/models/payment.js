const mongoose = require('mongoose');
const User = require('./user');

const paymentSchema = new mongoose.Schema({
  adminUsername: {
    type: String,
    required: true,
  },
  userRollNo: {
    type: { type: Schema.Types.ObjectId, ref: User },
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

paymentSchema.index({ rollNo: 1, adminUsername: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
