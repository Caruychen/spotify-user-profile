<template>
  <div id="top-ten">
    <div id="top-ten-container">
      <b-container id="top-ten-heading">
        <b-row>
          <b-col
            ><h2>Top 10 {{ type | capitalize }}</h2></b-col
          >
          <b-col
            ><TimeRangeSelector @updateTimeRange="onTimeRangeUpdate"
          /></b-col>
        </b-row>
      </b-container>
      <TopTenList :type="type" :timeRange="timeRange" />
    </div>
  </div>
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
