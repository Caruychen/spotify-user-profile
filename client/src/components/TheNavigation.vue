<template>
  <div id="nav">
    <b-nav vertical>
      <b-nav-item to="/user">
        <b-icon-house></b-icon-house>
        <br />
        Home
      </b-nav-item>
      <b-nav-item to="/artists">
        <b-icon-star></b-icon-star>
        <br />
        Top Artists
      </b-nav-item>
      <b-nav-item to="/tracks">
        <b-icon-music-note-beamed></b-icon-music-note-beamed>
        <br />
        Top Tracks
      </b-nav-item>
      <b-nav-item to="/recent">
        <b-icon-clock-history></b-icon-clock-history>
        <br />
        Recent
      </b-nav-item>
    </b-nav>
  </div>
</template>

<style scoped>
#nav {
  position: fixed;
  min-height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#nav a {
  padding: 20px;
}
</style>
