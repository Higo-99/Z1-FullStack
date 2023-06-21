// const express = require('express');
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import routeweb from "./route/routeweb";
import 'dotenv/config'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
routeweb(app);

const port = process.env.PORT || 3131;

app.listen(port, () => {
    console.log("It's running on " + port)
})