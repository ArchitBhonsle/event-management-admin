const argon2 = require("argon2");
const { Admin } = require("./models/admin");

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

addAdmin();
