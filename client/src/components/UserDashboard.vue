<template>
  <div id="dashboard">
    <h2>Your Top 50 Artists and Tracks</h2>
    <BaseTimeRangeSelector
      version="button"
      @updateTimeRange="onTimeRangeUpdate"
    />
    <hr />
    <b-spinner v-if="loading" label="Spinning"></b-spinner>
    <div v-else class="dashboard-container">
      <div class="grid-container">
        <div class="item-header-1">
          <b-button
            id="popularity-popover-target"
            variant="custom-split-outline"
          >
            <b-icon-info-square-fill
              font-scale="0.75"
            ></b-icon-info-square-fill>
            Average popularity
          </b-button>
        </div>
        <b-popover
          target="popularity-popover-target"
          triggers="hover focus"
          placement="bottom"
        >
          {{ popularityDescription }}
        </b-popover>
        <div class="item-main">
          <b>{{ avgPopularity("tracks", timeRange) }}%</b>
          <p>Average track popularity</p>
        </div>
        <div class="item-main">
          <b>{{ avgPopularity("artists", timeRange) }}%</b>
          <p>Average artist popularity</p>
        </div>
      </div>
      <KeysPie :timeRange="timeRange" />
      <FeatureHistogram :timeRange="timeRange" />
      <b-container id="top-ten-lists">
        <b-row>
          <UserTopTen type="artists" :timeRange="timeRange" />
          <UserTopTen type="tracks" :timeRange="timeRange" />
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseTimeRangeSelector from "@/components/BaseTimeRangeSelector.vue";
import FeatureHistogram from "@/components/UserDashboardFeatureHist.vue";
import KeysPie from "@/components/UserDashboardKeysPie.vue";
import UserTopTen from "@/components/UserTopTen.vue";

export default {
  data() {
    return {
      loading: false,
      timeRange: "long_term",
      popularityDescription:
        "The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is mostly based on the total number of plays the track has had and how recent those plays are. Songs that are being played a lot now will have a higher popularity than songs that were played in the past. Artist popularities are derived from track popularity by Spotify. The average popularities shown here are calculated as the mean average of your top 50 tracks/artists popularities."
    };
  },
  components: {
    BaseTimeRangeSelector,
    FeatureHistogram,
    KeysPie,
    UserTopTen
  },
  computed: {
    ...mapGetters("top", {
      avgPopularity: "avgPopularity"
    })
  },
  watch: {
    timeRange: function() {
      this.loadListeningData();
    }
  },
  methods: {
    ...mapActions({
      fetchFeatures: "features/fetchAudioFeatures",
      fetchTopItems: "top/fetchTopItems"
    }),
    loadTopItems: function(type) {
      const params = {
        type,
        timeRange: this.timeRange
      };
      this.fetchTopItems(params);
    },
    loadListeningData: async function() {
      this.loading = true;
      const artists = this.loadTopItems("artists");
      const tracks = this.loadTopItems("tracks");
      await Promise.all([artists, tracks]);
      await this.fetchFeatures(this.timeRange);
      this.loading = false;
    },
    onTimeRangeUpdate(timeRange) {
      this.timeRange = timeRange;
    }
  },
  created() {
    this.loadListeningData();
  }
};
</script>
