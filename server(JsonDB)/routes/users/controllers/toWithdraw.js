const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../../db", "db.json");

const toWithdraw = (req, res) => {
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
          if (+usersObject[id].credit + +usersObject[id].cash >= +amount) {
            // User has enough money in the bank to withdraw
            if (+usersObject[id].cash >= +amount) {
              // User has enough cash to withdraw
              usersObject[id].cash -= +amount;
            } else {
              // User needs to use credit to withdraw
              usersObject[id].credit += +usersObject[id].cash;
              usersObject[id].credit -= +amount;
              usersObject[id].cash = 0;
            }

            fs.writeFile(dbPath, JSON.stringify(dataObject), (err) => {
              if (err) {
                res.send(err.message);
              }
              res.send(usersObject[id]);
            });
          } else {
            res.send(
              `User does not have enough money in the bank to withdraw ${amount}$.\nAccount status: cash: ${usersObject[id].cash}$, credit: ${usersObject[id].credit}$`
            );
          }
        } else {
          res.send(`There is no user with id: ${id}.`);
        }
      });
    } else {
      res.send("Withdraw amount must be positive.");
    }
  } else {
    res.send("No amount was sent.");
  }
};

module.exports = toWithdraw;
