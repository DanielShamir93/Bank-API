const User = require("../../../mongo/models/userModel");

const addUser = async (req, res) => {
  try {
    const { cash, credit } = req.body;
    const newUser = { cash, credit };
    const user = await User.create(newUser);
    res.json(user);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = addUser;
