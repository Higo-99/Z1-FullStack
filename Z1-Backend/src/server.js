const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine');
const routeweb = require('./route/routeweb');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routeweb);

viewEngine(app);

const port = process.env.PORT || 3131;

app.listen(port, () => {
    console.log("It's running on " + port);
});