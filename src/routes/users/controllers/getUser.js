const User = require("../../../db/models/userModel");

const getUser = (req, res) => {
  try {
    const { id } = req.params;
    User.findById(id, (err, doc) => {
      if (err) {
        console.log(err);
      }
      res.json(doc);
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = getUser;
