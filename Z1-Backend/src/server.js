const express = require('express');
const bodyParser = require('body-parser');
const routeweb = require('./route/routeweb');
const connectDB = require('./config/connectDB');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routeweb(app);

// app.use(express.static("./src/public"));
// app.set("views", "./src/views")
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


connectDB();

const port = process.env.PORT || 3131;

app.listen(port, () => {
    console.log("It's running on " + port)
})