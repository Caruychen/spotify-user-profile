<template>
  <div id="dashboard">
    <h2>Your listening dashboard</h2>
    <BaseTimeRangeSelector
      version="button"
      @updateTimeRange="onTimeRangeUpdate"
    />
  </div>
</template>

<script>
import BaseTimeRangeSelector from "@/components/BaseTimeRangeSelector.vue";
// import 'zingchart/es6';
// import zingchartVue from 'zingchart-vue';

export default {
  data() {
    return {
      timeRange: "long_term"
    };
  },
  components: {
    BaseTimeRangeSelector
  },
  methods: {
    onTimeRangeUpdate(timeRange) {
      this.timeRange = timeRange;
    }
  }
};
</script>
