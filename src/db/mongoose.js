const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/bank-api",
  () => {
    console.log("mongoDB connected");
  },
  (e) => console.error(e)
);