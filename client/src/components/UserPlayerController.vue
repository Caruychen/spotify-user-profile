<template>
  <b-row v-if="isPremium" class="player-controller" align-h="center">
    <b-col cols="3" lg="1">
      <b-icon-skip-start-fill
        @click="playController('previous')"
      ></b-icon-skip-start-fill>
    </b-col>
    <b-col cols="3" lg="1" class="pause-play">
      <b-icon-pause-fill
        v-if="isPlaying"
        @click="playController('pause')"
      ></b-icon-pause-fill>
      <b-icon-play-fill
        v-else
        @click="playController('play')"
      ></b-icon-play-fill>
    </b-col>
    <b-col cols="3" lg="1">
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
    }),
    ...mapState("profile", {
      isPremium: state => state.user.product === "premium"
    })
  },
  methods: {
    ...mapActions("player", {
      playController: "playController"
    })
  }
};
</script>
