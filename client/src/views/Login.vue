<template>
  <div id="login">
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
