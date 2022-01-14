const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../db/db.json");
const fs = require("fs");

// Add user
router.route("/add").post((req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "db", "users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        res.send(err.message);
      }
      const dataObject = JSON.parse(data);
      const usersObject = dataObject.users;
      const { id, cash, credit } = req.body;

      if (!usersObject.hasOwnProperty(id)) {
        usersObject[id] = { cash: +cash, credit: +credit };
        fs.writeFile(
          path.join(__dirname, "..", "db", "users.json"),
          JSON.stringify(dataObject),
          (err) => {
            if (err) {
              res.send(err.message);
            }
            res.send(JSON.stringify(usersObject));
          }
        );
      } else {
        res.send("User already exists.");
      }
    }
  );
});

// Show details of all users
router.route("/all").get((req, res) => {
  const users = data.users;
  res.json(users);
});

module.exports = router;
