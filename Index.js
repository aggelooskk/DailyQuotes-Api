const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");
require('dotenv').config();

// Importing all the routes
const homeroute = require("./routes/Home.js")

// Creating express server
const app = express();

// Serve your css file as static
app.use('/css', express.static(__dirname + '/public/css'));

// Respond with html page when GET request is node in homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

// Handling routes request
app.use("/home",homeroute);

// App listening on port 3000
app.listen((3000),()=>{
    console.log("Server is Running");
});