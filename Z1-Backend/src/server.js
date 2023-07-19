const express = require('express');
const bodyParser = require('body-parser');

const viewEngine = require('./config/viewEngine');
const routeweb = require('./route/routeweb');
const DBconection = require('./config/DBconection')
require('dotenv').config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/", routeweb);

viewEngine(app);
DBconection();


const port = process.env.PORT || 3131;

app.listen(port, () => {
    console.log("It's running on " + port)

})


