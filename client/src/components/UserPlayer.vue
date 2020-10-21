<template>
  <div v-if="nowPlaying" id="current-playback">
    <b-card no-body>
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img :src="nowPlaying.item.image[0].url"></b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body class="card-img-overlay">
            <b-card-title>{{ nowPlaying.item.name }}</b-card-title>
            <b-card-text>
              <span
                v-for="(artist, index) in nowPlaying.item.artists"
                :key="index"
              >
                <a :href="artist.external_urls.spotify" target="_blank">{{
                  artist.name
                }}</a
                >{{
                  artist.name
                    | insertComma(index, nowPlaying.item.artists.length)
                }}
              </span>
              <span class="device-text">{{ nowPlaying.device }}</span>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <UserPlayerSlider />
    <UserPlayerController />
  </div>
  <div v-else>
    <b-button :href="openSpotify" variant="spotify-button" target="_blank">
      Start listening on Spotify
    </b-button>
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
    ...mapState("profile", {
      openSpotify: state => state.user.external_urls.spotify
    }),
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
