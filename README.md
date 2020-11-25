# Audio Viber
demo: https://audio-viber.herokuapp.com

Audio Viber lets your learn more about your favourite music on Spotify with detailed audio feature visualisations of your top tracks and artists. Also control your Spotify directly from the web app, and get to know more about the tracks you are listening to right now.

Desktop: | Mobile
:-------:|:-------:
<img src="https://i.ibb.co/Mpsh9v5/user-desktop.png" alt="user-desktop" width="600"> | <img src="https://i.ibb.co/cgZyMPM/user-mobile.png" alt="user-mobile" width="200" border="0">

Built using:
* Vue-CLI
* Vuex
* Vue-router
* Axios
* Express
* Node
* ZingCharts
* Spotify API

## Features

### Spotify Controller

### Top artists & tracks analysis

#### Average popularity

#### Keys

#### Audio features

#### Top 10

### All Top Artists and Tracks

### Recent

## Project setup
### Using your credentials
1. Register a Spotify App and add a redirect URI, e.g. http://localhost:8081/callback.
2. Create a `.env` file in the server directory with the following variables:
    * CLIENT_ID
    * CLIENT_SECRET
    * FRONTEND_URI
    * REDIRECT_URI
3. If using a different base url to `localhost:8081`, then replace the same url in [Login.vue](client/src/views/Login.vue) and [index.js](client/src/service/index.js)
4. Run `npm install` in the client and server directory separately to install dependencies. 

### Compiles and hot-reloads for development
In the client directory, run:
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
The build files are configured by [vue.config.js](client/vue.config.js) to be stored in [server/public](server/public). The build can
be run locally with the command `npm run dev` in the server directory.