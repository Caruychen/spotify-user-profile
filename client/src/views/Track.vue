<template>
  <div v-if="loading" class="loading-container">
    <b-spinner label="Spinning"></b-spinner>
  </div>
  <div v-else id="track">
    <b-card no-body class="track-header">
      <b-row no-gutters>
        <b-col md="auto">
          <b-card-img
            :src="track.album.images[0].url"
            :alt="track.name"
          ></b-card-img>
          <b-card-body v-if="!mdScreenPlus" overlay>
            <div class="back-button" @click="goBack()">
              <b-icon-chevron-left></b-icon-chevron-left>
            </div>
            <b-card-title title-tag="h1">
              {{ track.name }}
            </b-card-title>
            <b-card-text>
              <span v-for="(artist, index) in track.artists" :key="index">
                <a :href="artist.external_urls.spotify" target="_blank">{{
                  artist.name
                }}</a
                >{{ artist.name | insertComma(index, track.artists.length) }}
              </span>
              <br />
              <a :href="track.album.external_urls.spotify">{{
                track.album.name
              }}</a>
              <br />
              <b class="track-statistic">{{ track.popularity }}%</b>
              popularity
            </b-card-text>
          </b-card-body>
        </b-col>
        <b-col v-if="mdScreenPlus">
          <b-card-body>
            <div class="back-button" @click="goBack()">
              <b-icon-chevron-left></b-icon-chevron-left>
            </div>
            <b-card-title title-tag="h1">{{ track.name }}</b-card-title>
            <b-card-text>
              <span v-for="(artist, index) in track.artists" :key="index">
                <a :href="artist.external_urls.spotify" target="_blank">{{
                  artist.name
                }}</a
                >{{ artist.name | insertComma(index, track.artists.length) }}
              </span>
              <br />
              <a :href="track.album.external_urls.spotify">{{
                track.album.name
              }}</a>
              <br />
              <b class="track-statistic">{{ track.popularity }}%</b>
              popularity
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <b-container class="track-content">
      <b-row>
        <ZingchartVue :data="radarConfig" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import "zingchart/es6";
import ZingchartVue from "zingchart-vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    ZingchartVue
  },
  computed: {
    ...mapState(["windowWidth"]),
    ...mapState("track", ["track"]),
    ...mapGetters("chartconfigs", ["radarConfig"]),
    mdScreenPlus: function() {
      return this.windowWidth >= 768;
    }
  },
  methods: {
    ...mapActions("track", ["loadTrack"]),
    goBack: function() {
      this.$router.go(-1);
    }
  },
  created() {
    (async () => {
      this.loading = true;
      await this.loadTrack(this.id);
      this.loading = false;
    })();
  }
};
</script>
