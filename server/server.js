require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8081/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:8080';
const PORT = process.env.PORT || 8081;
const scope = "user-read-private user-read-email";

if (process.env.NODE_ENV !== 'production') {
    REDIRECT_URI = 'http://localhost:8081/callback';
    FRONTEND_URI = 'http://localhost:8080';
}

const express = require('express');
const cors = require('cors')
const querystring = require('query-string')
const cookieParser = require('cookie-parser')


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

function generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  var stateKey = "spotify_auth_state";
  

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send("Hello World!");
})

server.listen(PORT, () => console.log("server listening on 8081"))