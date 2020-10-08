<template>
  <nav class="nav" id="nav">
    <router-link class="nav-link" to="/user">
      <b-icon-house></b-icon-house>
      <br />
      Home
    </router-link>
    <router-link class="nav-link" to="/artists">
      <b-icon-star></b-icon-star>
      <br />
      Top Artists
    </router-link>
    <router-link class="nav-link" to="/tracks">
      <b-icon-music-note-beamed></b-icon-music-note-beamed>
      <br />
      Top Tracks
    </router-link>
    <router-link class="nav-link" to="/recent">
      <b-icon-clock-history></b-icon-clock-history>
      <br />
      Recent
    </router-link>
  </nav>
</template>
