const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../../db", "db.json");

const getAllUsers = (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.send(err.message);
    }
    res.send(JSON.parse(data));
  });
}

module.exports = getAllUsers;