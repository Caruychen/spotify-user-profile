<template>
  <nav class="nav" id="nav">
    <router-link class="nav-link" to="/user">
      <b-icon-house></b-icon-house>
      <br />
      Home
    </router-link>
    <router-link
      class="nav-link"
      :to="{
        name: 'TopItems',
        params: {
          slug: topViews[0]
        }
      }"
    >
      <b-icon-star></b-icon-star>
      <br />
      Top Artists
    </router-link>
    <router-link
      class="nav-link"
      :to="{
        name: 'TopItems',
        params: {
          slug: topViews[1]
        }
      }"
    >
      <b-icon-music-note-beamed></b-icon-music-note-beamed>
      <br />
      Top Tracks
    </router-link>
    <router-link class="nav-link" to="/recent">
      <b-icon-clock-history></b-icon-clock-history>
      <br />
      Recent
    </router-link>
    <router-link class="nav-link" to="/login">
      <b-icon-box-arrow-right></b-icon-box-arrow-right>
      <br />
      Log out
    </router-link>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      topViews: state => state.topTypes
    })
  },
  methods: {
    logOut() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }
};
</script>
