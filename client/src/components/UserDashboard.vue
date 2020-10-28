<template>
  <div id="dashboard">
    <h2>Your listening dashboard</h2>
    <BaseTimeRangeSelector
      version="button"
      @updateTimeRange="onTimeRangeUpdate"
    />
    <hr />
    <b-spinner v-if="loading" label="Spinning"></b-spinner>
    <div v-else class="dashboard-container">
      <div class="grid-container">
        <div class="grid-item">
          <h3>Average artist popularity:</h3>
          <p>{{ avgPopularity("artists", timeRange).average }}%</p>
        </div>
        <div class="grid-item">
          <h3>Total artists:</h3>
          <p>{{ avgPopularity("artists", timeRange).total }}</p>
        </div>
        <div class="grid-item">
          <h3>Average track popularity:</h3>
          <p>{{ avgPopularity("tracks", timeRange).average }}%</p>
        </div>
        <div class="grid-item">
          <h3>Total tracks:</h3>
          <p>{{ avgPopularity("tracks", timeRange).total }}</p>
        </div>
      </div>
      <KeysPie :timeRange="timeRange" :loading="loading" />
      <FeatureHistogram :timeRange="timeRange" :loading="loading" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseTimeRangeSelector from "@/components/BaseTimeRangeSelector.vue";
import FeatureHistogram from "@/components/UserDashboardFeatureHist.vue";
import KeysPie from "@/components/UserDashboardKeysPie.vue";

export default {
  data() {
    return {
      loading: false,
      timeRange: "long_term"
    };
  },
  components: {
    BaseTimeRangeSelector,
    FeatureHistogram,
    KeysPie
  },
  computed: {
    ...mapGetters("top", {
      avgPopularity: "avgPopularity"
    })
  },
  watch: {
    timeRange: async function() {
      this.loading = true;
      const artistUpdate = await this.loadTopItems("artists");
      const trackUpdate = await this.loadTopItems("tracks");
      await Promise.all([artistUpdate, trackUpdate]);
      this.loading = false;
      this.loadAudioFeatures();
    }
  },
  methods: {
    ...mapActions({
      fetchFeatures: "features/fetchAudioFeatures",
      fetchTopItems: "top/fetchTopItems"
    }),
    loadTopItems: async function(type) {
      const params = {
        type,
        timeRange: this.timeRange
      };
      await this.fetchTopItems(params);
    },
    loadAudioFeatures: async function() {
      this.loading = true;
      await this.fetchFeatures(this.timeRange);
      this.loading = false;
    },
    onTimeRangeUpdate(timeRange) {
      this.timeRange = timeRange;
    }
  },
  created() {
    this.loadAudioFeatures();
  }
};
</script>
