const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const dbPath = path.join(__dirname, "../../db", "db.json");

const addUser = require("./controllers/addUser");
const getAllUsers = require("./controllers/getAllUsers");
const getUser = require("./controllers/getUser");
const makeDeposit = require("./controllers/makeDeposit");
const updateUserCredit = require("./controllers/updateUserCredit");

// Add user
router.route("/add").post(addUser);

// Show details of all users
router.route("/all").get(getAllUsers);

// Show details of user
router.route("/:id").get(getUser);

// Depositing
router.route("/:id/deposit").put(makeDeposit);

// Update credit
router.route("/:id/credit").put(updateUserCredit);

module.exports = router;
