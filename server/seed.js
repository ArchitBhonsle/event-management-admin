const argon2 = require('argon2');
const { Admin } = require('./models/admin');
const User = require('./models/user');

async function addAdmin() {
  try {
    const doc = await Admin.findOne({ username: 'hello' }).exec();
    if (doc === null) {
      console.log('Adding dummy user');
      const newAdmin = new Admin({
        username: 'hello',
        password: await argon2.hash('generalk123'),
        name: 'hello there',
      });
      await newAdmin.save();
    }
  } catch (error) {
    console.error(error);
  }
}

async function addUsers() {
  const deptMap = {
    '1': 'COMPS',
    '2': 'EXTC',
    '3': 'ELEC',
    '4': 'MECH',
    '5': 'IT',
  };

  try {
    const docNum = await User.countDocuments({});
    if (docNum !== 5 * 60) {
      User.remove({});
      for (let dep = 1; dep <= 5; ++dep) {
        for (let num = 1; num <= 60; ++num) {
          let rollNum = dep * 100000 + 1800 + num;
          rollNum = rollNum.toString();
          const newUser = new User({
            name: 'Hello There',
            email: `${rollNum}@gmail.com`,
            rollNo: rollNum,
            department: deptMap[rollNum[0]],
            password: rollNum,
            events: [],
            tokens: [],
          });
          await newUser.save();
        }
      }
      console.log('Added dummy users');
    }
  } catch (error) {
    console.error(error);
  }
}

addAdmin();
addUsers();
