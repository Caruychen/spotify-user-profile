require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const querystring = require('query-string');
const cookieParser = require('cookie-parser');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8081/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:8080';
const PORT = process.env.PORT || 8081;
const scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-follow-read user-top-read user-read-recently-played user-read-playback-state user-modify-playback-state";
const stateKey = "spotify_auth_state";

if (process.env.NODE_ENV !== 'production') {
    REDIRECT_URI = 'http://localhost:8081/callback';
    FRONTEND_URI = 'http://localhost:8080';
}

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

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '/public')));

app
    .use(express.static(path.resolve(__dirname + "/public")))
    .use(cors())
    .use(cookieParser());

app.get('/', function (req, res) {
    res.render(path.resolve(__dirname, '/public/index.html'));
});

app.get("/login", function (req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // Application requests authorization
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        })
    );
});


app.get("/callback", async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            FRONTEND_URI + "/" +
            querystring.stringify({
                error: "state_mismatch"
            })
        );
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            method: 'post',
            url: "https://accounts.spotify.com/api/token",
            data: querystring.stringify({
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: "authorization_code"
            }),
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
            },
            json: true
        };

        try {
            const response = await axios(authOptions)
            if (response.status === 200) {
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;

                const options = {
                    method: 'get',
                    url: "https://api.spotify.com/v1/me",
                    headers: { Authorization: "Bearer " + access_token },
                    json: true
                };

                // Use access token to access spotify API from server
                // const userData = await axios(options)
                // console.log(userData)

                res.redirect(
                    FRONTEND_URI +
                    "/login?" +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    })
                );
            }
        } catch (error) {
            res.redirect(
                FRONTEND_URI + '/' +
                querystring.stringify({
                    error: error.response.data.error
                })
            );
        }
    }
});

app.get("/refresh_token", async (req, res) => {
    // request access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        method: 'post',
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization:
                "Basic " +
                new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
        },
        data: querystring.stringify({
            grant_type: "refresh_token",
            refresh_token: refresh_token
        }),
        json: true
    };

    try {
        const response = await axios(authOptions);
        if (response.status === 200) {
            const access_token = response.data.access_token;
            res.send({
                access_token: access_token
            })
        }
    } catch (error) {
        res.status(error.response.status).send({
            error: error.response.data
        })
    }
})

app.listen(PORT);
