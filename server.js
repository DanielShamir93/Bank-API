const express = require('express');
const app = express();
const userRoutes = require('./routes/user-routes');
const path = require('path');


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));