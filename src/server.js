const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine');
const routeweb = require('./route/routeweb');
const connectDB = require('./config/connectDB');
require('dotenv').config();

// import express from "express";
// import bodyParser from "body-parser";
// import viewEngine from "./config/viewEngine";
// import routeweb from "./route/routeweb";
// import 'dotenv/config'
// import connectDB from "./config/connectDB";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
routeweb(app);

connectDB();

const port = process.env.PORT || 3131;

app.listen(port, () => {
    console.log("It's running on " + port)
})