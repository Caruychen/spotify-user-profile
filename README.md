# Audio Viber
demo: https://audio-viber.herokuapp.com

Audio Viber lets your learn more about your favourite music on Spotify with detailed audio feature visualisations of your top tracks and artists. Also control your Spotify directly from the web app, and get to know more about the tracks you are listening to right now.

Built using:
* Vue-CLI
* Vuex
* Vue-router
* Axios
* Express
* Node
* ZingCharts
* Spotify API

## Project setup
### Using your credentials
1. Register a Spotify App and add a redirect URI, e.g. http://localhost:8081/callback.
2. Create a `.env` file in the server directory with the following variables:
    * CLIENT_ID = XXXXXX
    * CLIENT_SECRET = XXXXXXX
    * FRONTEND_URI=http://localhost:8080
    * REDIRECT_URI=http://localhost:8081/callback
3. If using a different base url to `localhost:8081`, then replace the login link in [Login.vue](client/src/views/Login.vue) and and [index.js](client/src/service/index.js)
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
