const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user/user.js');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/DevConnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modify this line to use a middleware function
app.use('/', userRoutes.router);
 
app.listen(port, () => console.log(`app listening on port ${port}!`));
