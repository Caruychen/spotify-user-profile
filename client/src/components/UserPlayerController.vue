<template>
  <b-row class="player-controller">
    <b-col>
      <b-icon-skip-start-fill
        @click="playController('previous')"
      ></b-icon-skip-start-fill>
    </b-col>
    <b-col>
      <b-icon-pause-fill
        v-if="isPlaying"
        @click="playController('pause')"
      ></b-icon-pause-fill>
      <b-icon-play-fill
        v-else
        @click="playController('play')"
      ></b-icon-play-fill>
    </b-col>
    <b-col>
      <b-icon-skip-end-fill
        @click="playController('next')"
      ></b-icon-skip-end-fill>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("player", {
      isPlaying: state => state.playback.isPlaying
    })
  },
  methods: {
    ...mapActions("player", {
      playController: "playController"
    })
  }
};
</script>
