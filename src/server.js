const express = require("express");
const app = express();
const usersRoutes = require("./routes/users/users-routes");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);

// 404
app.get("/*", (req, res) => {
  res.status(404).send("Page not found.");
});
app.post("/*", (req, res) => {
  res.status(404).send("Page not found.");
});
app.put("/*", (req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
