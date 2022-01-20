const User = require("../../../db/models/userModel");

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({})
    res.status(200).send("All users have been deleted.");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = deleteAllUsers;