const express = require('express');
const path = require('path');

const viewEngine = (app) => {
    // app.use(express.static("./src/public"));
    // app.set("views", "./src/views")
    app.use(express.static(path.join('./src', 'public')));
    app.set('views', path.join('./src', 'views'));
    app.set("view engine", "ejs");
}

module.exports = viewEngine