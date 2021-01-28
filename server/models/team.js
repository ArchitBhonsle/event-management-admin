const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  members: [
    {
      user1: {
        type: String,
      },
      user2: {
        type: String,
      },
      user3: {
        type: String,
      },
      user4: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);

// teams
// - teamID
// - members [ userID ]