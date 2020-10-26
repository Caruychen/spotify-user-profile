<template>
  <div id="dashboard">
    <h2>Your listening dashboard</h2>
    <BaseTimeRangeSelector
      version="button"
      @updateTimeRange="onTimeRangeUpdate"
    />
    <div class="dashboard-container">
      <FeatureHistogram :timeRange="timeRange" :loading="loading" />
      <KeysPie :timeRange="timeRange" :loading="loading" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
  watch: {
    timeRange: function() {
      this.loadAudioFeatures();
    }
  },
  methods: {
    ...mapActions("features", {
      fetchFeatures: "fetchAudioFeatures"
    }),
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
