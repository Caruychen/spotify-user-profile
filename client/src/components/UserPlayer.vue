<template>
  <div id="current-playback">
    <b-card v-if="nowPlaying" no-body>
      <!-- <template v-slot:header>
        <p class="mb-0">Listening on: {{ nowPlaying.device }}</p>
      </template> -->
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
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      timer: null
    };
  },
  computed: {
    ...mapGetters("player", {
      nowPlaying: "currentDevicePlayback"
    })
  },
  methods: {
    ...mapActions({
      fetchPlayback: "player/fetchCurrentPlayback"
    })
  },
  created() {
    (async () => {
      try {
        await this.fetchPlayback();
      } catch (error) {
        console.log(`${error} - ${error.response.data.error.message}`);
      }
    })();
  },
  mounted() {
    this.timer = setInterval(async () => {
      this.fetchPlayback();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
