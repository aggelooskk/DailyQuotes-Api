// Importing modules
const express = require("express");
const router = express.Router();
const https = require("node:https");
const bodyParser = require("body-parser");
require('dotenv').config();

// Handling request using router
router.get("/",(req,res,next) => {
    const apiKey = process.env.API_KEY;
    const url = "https://favqs.com/api/qotd?" + apiKey;
  
    https.get(url, (response) => {
        console.log("statusCode:", response.statusCode);
        
        response.on("data", (data) => {
          const quotesData = JSON.parse(data);
          const author = quotesData.quote.author;
          const quote = quotesData.quote.body;
  
          const quoteHtml = `
          <html>
            <head>
              <title>Quote of the Day</title>
              <style>
                body {
                  background-color: rgb(203 213 225);
                  font-family: Jazz LET, fantasy;
                  margin-top: 250px;
                  margin-bottom: auto;
                  text-align: center;
                  font-size: x-large;
                }
                p {
                  color: black;
                }
              </style>
            </head>
            <body>
              <h1>${author}</h1>
              <p>${quote}</p>
            </body>
          </html>
        `;
          res.send(quoteHtml);
        });
      })
      .on("error", (error) => {
        console.error(error);
        res.send("An error occurred while fetching the quote.");
      });
  });

  
// Importing the router
module.exports = router;