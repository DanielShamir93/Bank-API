const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../../db", "db.json");

const makeDeposit = (req, res) => {
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
          usersObject[id].cash += +amount;
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
      res.send('Deposit amount must be positive.');
    }
  } else {
    res.send('No deposit amount was made.');
  }
};

module.exports = makeDeposit;
