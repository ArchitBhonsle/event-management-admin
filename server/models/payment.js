const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  adminUsername: {
    type: String,
    required: true,
  },
  userRollNo: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

paymentSchema.virtual('admin', {
  ref: 'Admin',
  localField: 'adminUsername',
  foreignField: 'username',
  justOne: true,
});
paymentSchema.virtual('user', {
  ref: 'User',
  localField: 'userRollNo',
  foreignField: 'rollNo',
  justOne: true,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
