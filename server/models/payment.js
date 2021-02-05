const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  adminUsername: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
