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
See what tracks you are listening to in Spotify, and control your playback directly in-app (control for premium users only).
Controls include pause, play, skip, and seek.

### Top artists & tracks dashboard
Learn about the music you listen to with feature analysis of your top 50 artists and tracks from All Time, Last 6 Months or Last 4 Weeks.
The dashboard displays data for:
* Average artist & track popularity
* Keys that tracks are based in
* Audio features:
    * Acousticness
    * Danceability
    * Energy
    * Instrumentalness
    * Liveness
    * Speechiness
    * Valence
* Top 10 lists

Average Popularity | Keys | Audio Features
:-------:|:-------:|:---:
<img src="https://i.ibb.co/SQFHbFx/average-popularity.png" alt="average-popularity" width="300" border="0"> | <img src="https://i.ibb.co/k3vBt4X/keys.png" alt="keys" width="370" border="0"> | <img src="https://i.ibb.co/kJCrRXp/audio-features.png" alt="audio-features" width="600" border="0">

Top 10 |
<img src="https://i.ibb.co/TLgGhYm/top-ten.png" alt="top-ten" width="600" border="0">

### Artist Details
See general information about an artist's popular tracks, albums, and other related artists.

### Track Details
See more in-depth feature analysis of a specific track's audio.

### All Top Artists and Tracks
See a list of all of your top 50 artists and tracks from All Time, Last 6 Months or Last 4 Weeks.

### Recent
See an itemised list of the 20 most recent tracks you listened to.

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