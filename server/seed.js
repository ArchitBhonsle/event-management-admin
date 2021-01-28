const argon2 = require("argon2");
const { Admin } = require("./models/admin");
const User = require("./models/user");

async function addAdmin() {
  try {
    const doc = await Admin.findOne({ username: "hello" }).exec();
    if (doc === null) {
      console.log("Adding dummy user");
      const newAdmin = new Admin({
        username: "hello",
        password: await argon2.hash("generalk123"),
        name: "hello there",
      });
      await newAdmin.save();
    }
  } catch (error) {
    console.error(error);
  }
}

async function addUsers() {
  try {
    const doc = await User.findOne({ rollno: "501810" }).exec();
    if (doc === null) {
      console.log("Adding dummy users");
      var roll = 501810;
      for(i=0;i<10;i++)
      {
        const newUser = new User({
          email: "abc"+i+"@gmail.com",
          rollno: roll++,
          password: "abdsafc",
          moneyOwed: false,
          events: [],
          tokens: [],
        });
        await newUser.save();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

addAdmin();
addUsers();
