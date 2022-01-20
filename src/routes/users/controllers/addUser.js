const User = require("../../../db/models/userModel");

const addUser = async (req, res) => {
  try {
    const { cash, credit } = req.body;
    const newUser = { cash, credit };
    const user = await User.create(newUser);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = addUser;
