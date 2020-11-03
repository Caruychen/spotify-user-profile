<template>
  <div v-if="loading" class="loading-container">
    <b-spinner label="Spinning"></b-spinner>
  </div>
  <div v-else id="track">
    <b-card no-body class="track-header">
      <b-row no-gutters>
        <b-col md="auto">
          <b-card-img
            :src="track.images[0].url"
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
              <b class="track-statistic">{{
                track.followers.total.toLocaleString()
              }}</b>
              followers
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
              <b class="track-statistic">{{
                track.followers.total.toLocaleString()
              }}</b>
              followers
              <br />
              <b class="track-statistic">{{ track.popularity }}%</b>
              popularity
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
  computed: {
    ...mapState("track", ["track"])
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
