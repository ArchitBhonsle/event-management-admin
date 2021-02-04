const argon2 = require('argon2');
const faker = require('faker');

const Admin = require('./models/admin');
const User = require('./models/user');
const Event = require('./models/event');
const { randomChoice, randomNumber } = require('./utils/random');

const addAdmin = async () => {
  try {
    const doc = await Admin.findOne({ username: 'hello' }).exec();
    if (doc === null) {
      const newAdmin = new Admin({
        username: 'hello',
        password: await argon2.hash('generalk123'),
        name: 'hello there',
      });
      await newAdmin.save();
      console.log('Added Admin');
    } else {
      console.log('Admin already added');
    }
  } catch (error) {
    console.error(error);
  }
};

const departmentMap = {
  '1': 'COMPS',
  '2': 'ELEC',
  '3': 'EXTC',
  '4': 'IT',
  '5': 'MECH',
  '9': 'OTHER',
};
const semesterMap = {
  '17': 5,
  '18': 6,
  '19': 7,
  '20': 8,
};
const generateUser = rollNo => ({
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  rollNo,
  department: departmentMap[rollNo[0]],
  semester: semesterMap[rollNo.slice(2, 4)],
  password: faker.internet.password(),
  collegeName: faker.company.companyName(),
  phoneNo: faker.phone.phoneNumber('##########'),
  hasFilledProfile: true,
});
const addUsers = async () => {
  if ((await User.countDocuments()) === 6 * 4 * 60) {
    console.log('Users already added');
    return;
  }

  await User.deleteMany({});
  for (const dept in departmentMap) {
    const depUsers = [];
    for (const sem in semesterMap) {
      for (let i = 1; i <= 60; ++i) {
        let srNo = i.toString();
        srNo = srNo.length === 1 ? '0' + srNo : srNo;
        const rollNo = dept + '0' + sem + srNo;
        depUsers.push(generateUser(rollNo));
      }
    }
    await User.insertMany(depUsers);
  }
  console.log('Added Users');
};

const generateCode = num => (100000000000 + num).toString(36).toUpperCase();
const generateTimes = day => {
  const startHour = randomNumber(1, 22);
  return {
    start: `${day}-${startHour.toString()}:00`,
    end: `${day}-${(startHour + 1).toString()}:30`,
  };
};
const generateCategory = () => ['C', 'T', 'F'][randomNumber(0, 2)];
const generatePrizeMoney = () => {
  const prizeMoney = [randomNumber(10, 15) * 100];
  for (let i = 0; i < randomNumber(0, 2); ++i) {
    prizeMoney.push(prizeMoney[prizeMoney.length - 1] - 200);
  }
  return prizeMoney;
};
const addEvents = async () => {
  if ((await Event.countDocuments()) === 3 * 15) {
    console.log('Events already added');
    return;
  }
  await Event.deleteMany({});
  const events = [];
  for (let day = 1; day <= 3; ++day) {
    for (let i = 0; i < 15; ++i) {
      events.push({
        eventCode: generateCode(day * 100 + i),
        day,
        ...generateTimes(day),
        title: faker.lorem.word(),
        description: faker.lorem.paragraph(),
        image: 'https://via.placeholder.com/150',
        seats: 0,
        maxSeats: 30,
        category: generateCategory(),
        isSeminar: randomChoice(),
        teamSize: randomNumber(1, 4),
        isTeamSizeStrict: randomChoice(),
        entryFee: randomNumber(1, 10) * 100,
        prizeMoney: generatePrizeMoney(),
      });
    }
  }
  await Event.insertMany(events);
  console.log('Added Events');
};

(async () => {
  await addAdmin();
  await addUsers();
  await addEvents();
})();
