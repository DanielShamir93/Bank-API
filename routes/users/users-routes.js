const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const dbPath = path.join(__dirname, "../../db", "db.json");
const addUser = require("./controllers/addUser");

// Add user
router.route("/add").post(addUser);

// Send details of all users
router.route("/all").get((req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.send(err.message);
    }
    res.send(JSON.parse(data));
  });
});

// Send details of specific user
router.route("/:id")
  .get((req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        res.send(err.message);
      }
      const dataObject = JSON.parse(data);
      const { id } = req.params;

      res.send(dataObject.users[id]);
    });
});

// Depositing
router.route("/:id/deposit")
  .put((req, res) => {
    if (req.body.hasOwnProperty('deposit')) {
      const { deposit } = req.body;
      if (+deposit > 0) {
        
        fs.readFile(dbPath, "utf8", (err, data) => {
          if (err) {
            res.send(err.message);
          }
          const dataObject = JSON.parse(data);
          const usersObject = dataObject.users;
          const { id } = req.params;
      
          if (usersObject.hasOwnProperty(id)) {
            usersObject[id].cash += +deposit;
            fs.writeFile(dbPath, JSON.stringify(dataObject), (err) => {
              if (err) {
                res.send(err.message);
              }
              res.send(JSON.stringify(usersObject[id]));
            });
          } else {
            res.send(`There is no user with id: ${id}.`);
          }
        });
      } else {
        res.send(`Deposit must be positive.`);
      }
    }
});

module.exports = router;
