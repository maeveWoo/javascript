const express = require('express');
const square = require('./square');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
    console.log('The area of a square with a width of 4 is ' + square.area(4));
    res.send('Hello World!');
});

app.listen(port, function() {
    console.log(`Example app listening on port ${port}`);
});