const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../../db", "db.json");

const addUser = (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.send(err.message);
    }
    const dataObject = JSON.parse(data);
    const usersObject = dataObject.users;
    const { id, cash, credit } = req.body;

    if (!usersObject.hasOwnProperty(id)) {
      usersObject[id] = { cash: +cash, credit: +credit };
      fs.writeFile(dbPath, JSON.stringify(dataObject), (err) => {
        if (err) {
          res.send(err.message);
        }
        res.send(JSON.stringify(usersObject));
      });
    } else {
      res.send("User already exists.");
    }
  });
}

module.exports = addUser;