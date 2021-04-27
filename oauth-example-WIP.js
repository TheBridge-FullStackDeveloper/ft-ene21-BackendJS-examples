const fetch = require('node-fetch');
const express = require('express');
const cryptoRandomString = require('crypto-random-string');
require('dotenv').config();

const server = express();
const listenPort = 8080;

const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const githubClientID = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

// This is the URL we'll send the user to first
// to get their authorization
const authorizeURL = 'https://github.com/login/oauth/authorize';

// This is the endpoint we'll request an access token from
const tokenURL = 'https://github.com/login/oauth/access_token';

// This is the GitHub base URL for API requests
const apiURLBase = 'https://api.github.com/';

// The URL for this script, used as the redirect URL
const baseURL = 'http://localhost:8080/home';





async function apiRequest(url, moreHeaders = {}) {

  let initialHeaders = {
    'Accept': 'application/vnd.github.v3+json, application/json',
    'User-Agent': 'http://127.0.0.1:8080/'
  }

  if (access_token) {
    const authHeaders = {
      'Authorization' : `Bearer ${access_token}`
    };

    initialHeaders = { ...initialHeaders, ...authHeaders}
  }
  
  initialHeaders = { ...initialHeaders, ...moreHeaders };
  
  const response = await fetch(url, initialHeaders);
  //const data = await response.json();

  console.log(response);

  //return data;
}

let access_token = '';
let state = '';

server.get('/', (req, res) => {
  res.send('<a href="/login">Lógate con GH</a>');
});



server.get('/home', (req, res) => {
  
  // When GitHub redirects the user back here,
  // there will be a "code" and "state" parameter in the query string
  if (req.query.code) {

    // Verify the state matches our stored state
    if (!req.query.state || req.query.state != state) {

      res.redirect(302, `${baseURL}?error=invalid_state`);
    }

    // Exchange the auth code for an access token
    access_token = apiRequest(tokenURL, {
      'grant_type': 'authorization_code',
      'client_id': githubClientID,
      'client_secret': githubClientSecret,
      'redirect_uri': baseURL,
      'code': req.query.code
    });

    res.redirect(302, baseURL);
  }
  else {
    res.send('Bienvenido <a href="/logout">Salir</a>');
  }
});








// Start the login process by sending the user
// to GitHub's authorization page
server.get('/login', (req, res) => {
  
  access_token = '';

  // Generate a random hash and store in the session
  state = cryptoRandomString({ length: 16 });

  res.redirect(302, `${authorizeURL}?response_type=code&client_id=${githubClientID}&redirect_uri=${baseURL}&scope=user%20public_repo&state=${state}`)
});

server.listen(listenPort,
  () => console.log(`Server started listening on ${listenPort}`)
);