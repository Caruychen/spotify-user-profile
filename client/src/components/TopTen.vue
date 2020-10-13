<template>
  <b-col md class="top-ten-container">
    <b-container class="top-ten-heading">
      <b-row align-v="center">
        <b-col
          ><h2>Top 10 {{ type | capitalize }}</h2></b-col
        >
        <b-col><TimeRangeSelector @updateTimeRange="onTimeRangeUpdate"/></b-col>
      </b-row>
    </b-container>
    <TopTenList :type="type" :timeRange="timeRange" />
  </b-col>
</template>

<script>
import TimeRangeSelector from "@/components/TimeRangeSelector.vue";
import TopTenList from "@/components/TopTenList.vue";

export default {
  data() {
    return {
      timeRange: "long_term"
    };
  },
  props: {
    type: String
  },
  components: {
    TimeRangeSelector,
    TopTenList
  },
  methods: {
    onTimeRangeUpdate(timeRange) {
      this.timeRange = timeRange;
    }
  }
};
</script>
