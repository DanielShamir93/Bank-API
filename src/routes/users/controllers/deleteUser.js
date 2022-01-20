const User = require("../../../db/models/userModel");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteOne({ _id: id });
    res.send(`User ${id} has been deleted from database.`);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = deleteUser;
