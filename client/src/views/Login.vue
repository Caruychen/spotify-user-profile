<template>
  <div id="login">
    <h1>Explore your Spotify favourites</h1>
    <div>
      <b-button
        v-b-toggle.collapse-1
        variant="custom-split-outline"
        class="about-button"
        >What is this?</b-button
      >
      <b-collapse id="collapse-1" class="mt-2">
        <b-card class="description">
          <h2 class="card-title">Audio Viber App</h2>
          <b-card-text>
            This is an application that lets you learn more about your favourite
            music on Spotify. Discover more about your favourite tracks with
            visualisations of their acousticness, danceability, energy and much
            more! 
            <br />
            <br />
            Find out who your favourite artists are, their
            popular tracks and other similar artists. You can even learn about
            the tracks you are listening to right now, and control your Spotify
            player directly in app!
            <br />
            The best experience is optimised for desktop use, but works just as well
            on mobile and tablet devices.
          </b-card-text>
        </b-card>
      </b-collapse>
    </div>
    <a :href="buttonLink" class="btn btn-spotify-button">
      Sign in with Spotify
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    buttonLink() {
      return process.env.NODE_ENV !== "production"
        ? "http://localhost:8081/login"
        : "https://audio-viber.herokuapp.com/login";
    }
  }
};
</script>

<style scoped>
.btn {
  margin: 20px;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.25em;
  font-weight: bold;
}
</style>
