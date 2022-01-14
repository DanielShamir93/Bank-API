const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../../db", "db.json");

const getUser = (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.send(err.message);
    }
    const dataObject = JSON.parse(data);
    const { id } = req.params;

    res.send(dataObject.users[id]);
  });
};

module.exports = getUser;
