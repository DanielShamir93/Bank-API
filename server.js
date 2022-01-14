const express = require('express');
const app = express();
const usersRoutes = require('./routes/users/users-routes');


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoutes);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));