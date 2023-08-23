require('dotenv').config();
require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine');
const cors = require('cors');
const { corsOptions } = require('./config/corsOptions');
const path = require('path');
// const cookieParser = require('cookie-parser');

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser);

app.use("/", require('./route/root'));
app.use("/users", require('./route/usersRoute'));
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepted('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepted('json')) {
        res.json({ message: '404 Not Found' })
    }
    else {
        res.type('txt').send('404 Not FOund');
    }
});

viewEngine(app);

const port = process.env.PORT || 3131;

app.listen(port, () => {
    console.log("It's running on " + port);
});