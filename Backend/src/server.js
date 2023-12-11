require('dotenv').config();
require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
// const cookieParser = require('cookie-parser');

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser);

app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', path.join('./src', 'views'));
app.set('view engine', 'html');

app.use('/', require('./route/root'));
app.use('/users', require('./route/userRoutes'));
app.use('/products', require('./route/productRoutes'));
app.use('/productImages', require('./route/productImagesRoutes'));
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    }
    else {
        res.type('txt').send('404 Not FOund');
    }
});

app.use(errorHandler);

const port = process.env.PORT || 3131;

app.listen(port, () => {
    console.log("It's running on " + port);
});