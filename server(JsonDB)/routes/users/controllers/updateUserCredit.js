const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../../db", "db.json");

const updateUserCredit = (req, res) => {
  if (req.body.hasOwnProperty("amount")) {
    const { amount } = req.body;
    if (+amount > 0) {
      fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) {
          res.send(err.message);
        }
        const dataObject = JSON.parse(data);
        const usersObject = dataObject.users;
        const { id } = req.params;

        if (usersObject.hasOwnProperty(id)) {
          usersObject[id].credit = +amount;
          fs.writeFile(dbPath, JSON.stringify(dataObject), (err) => {
            if (err) {
              res.send(err.message);
            }
            res.send(usersObject[id]);
          });
        } else {
          res.send(`There is no user with id: ${id}.`);
        }
      });
    } else {
      res.send("Credit amount must be positive.");
    }
  } else {
    res.send("No credit amount was sent.");
  }
};

module.exports = updateUserCredit;
