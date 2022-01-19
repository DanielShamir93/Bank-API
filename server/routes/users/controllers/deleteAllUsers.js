const User = require("../../../mongo/models/userModel");

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({})
    res.send("All users have been deleted.");
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = deleteAllUsers;
