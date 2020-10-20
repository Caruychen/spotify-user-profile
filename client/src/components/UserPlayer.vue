<template>
  <div id="current-playback">
    <b-card v-if="nowPlaying" no-body>
      <b-card-img :src="nowPlaying.item.image[0].url"></b-card-img>
      <b-card-body overlay>
        <b-card-title>{{ nowPlaying.item.name }}</b-card-title>
        <b-card-text>
          <span v-for="(artist, index) in nowPlaying.item.artists" :key="index">
            <a :href="artist.external_urls.spotify" target="_blank">{{
              artist.name
            }}</a
            >{{
              artist.name | insertComma(index, nowPlaying.item.artists.length)
            }}
          </span>
          <span class="device-text">{{ nowPlaying.device }}</span>
        </b-card-text>
        <UserPlayerSlider />
        <UserPlayerController />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import UserPlayerSlider from "@/components/UserPlayerSlider.vue";
import UserPlayerController from "@/components/UserPlayerController.vue";

export default {
  data() {
    return {
      timer: null
    };
  },
  components: {
    UserPlayerSlider,
    UserPlayerController
  },
  computed: {
    ...mapState("player", {
      isFetchPaused: state => state.isFetchPaused
    }),
    ...mapGetters("player", {
      nowPlaying: "currentDevicePlayback"
    })
  },
  methods: {
    ...mapActions("player", {
      fetchPlayback: "fetchCurrentPlayback",
      seekPosition: "seekPosition"
    })
  },
  created() {
    (async () => {
      this.fetchPlayback();
    })();
  },
  mounted() {
    this.timer = setInterval(async () => {
      if (!this.isFetchPaused) {
        this.fetchPlayback();
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
