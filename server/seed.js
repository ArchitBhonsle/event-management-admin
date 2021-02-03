const argon2 = require('argon2');
const faker = require('faker');

const Admin = require('./models/admin');
const User = require('./models/user');
const Event = require('./models/event');
const randomNumber = require('./utils/randomNumberInRange');

async function addAdmin() {
  try {
    const doc = await Admin.findOne({ username: 'hello' }).exec();
    if (doc === null) {
      console.log('Adding Admin');
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

const category = ['TECH', 'CULT', 'FUN'];
async function addEvents() {
  try {
    const docNum = await Event.countDocuments({});
    if (docNum !== 10) {
      let docs = [];
      for (let i = 0; i < 10; ++i) {
        const date = faker.date.future();
        docs.push({
          eventId: faker.lorem.word(),
          startTime: date,
          endTime: new Date(
            date.getTime() + randomNumber(1, 4) * 1000 * 60 * 30
          ),
          category: category[randomNumber(0, 2)],
          description: faker.lorem.paragraph(),
          maxSeats: randomNumber(15, 30),
          seats: randomNumber(0, 14),
          price: randomNumber(1, 10) * 100,
          prizeMoney: randomNumber(1, 5) * 1000,
          teamSize: 1,
        });
      }
      await Event.insertMany(docs);
      console.log('Adding Events');
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
      const events = await Event.find({}, '_id').exec();
      for (let dep = 1; dep <= 5; ++dep) {
        for (let num = 1; num <= 60; ++num) {
          let rollNum = dep * 100000 + 1800 + num;
          rollNum = rollNum.toString();
          const filteredEvents = events.filter(() => Math.round(Math.random()));
          const newUser = new User({
            name: faker.name.findName(),
            email: faker.internet.email(),
            rollNo: rollNum,
            department: deptMap[rollNum[0]],
            password: rollNum,
            events: filteredEvents,
            tokens: [],
          });
          const savedUser = await newUser.save();
          await Promise.all(
            filteredEvents.map(async id => {
              await Event.findByIdAndUpdate(id, {
                $push: { registered: savedUser._id },
              });
            })
          );
        }
      }
      console.log('Added Users');
    }
  } catch (error) {
    console.error(error);
  }
}

(async function () {
  await addAdmin();
  await addEvents();
  await addUsers();
})();
