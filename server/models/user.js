const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate(value) {
      // Add karo front end walo
    },
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
  rollno: {
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
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  criteria: {
    crit1: { type: Boolean, default: false },
    crit2: { type: Boolean, default: false },
    crit3: { type: Boolean, default: false },
  },
  moneyOwed: {
    type: Number,
    default: 0,
    trim: true,
  },
  events: [
    {
      type: String,
    },
  ],
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userSchema.methods.authenticateUser = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), email: user.email },
    'yomama',
    { expiresIn: '7 days' }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user with this email');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

// - email
// - rollno
// - password
// - criteria { cr1, cr2, cr3... }
// - moneyOwed
// - events [ eventID ]
