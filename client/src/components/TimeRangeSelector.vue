<template>
  <div>
    <div v-if="version === 'button'" id="time-range-buttons">
      <b-button
        v-for="(timeRange, index) in timeRanges"
        :key="index"
        @click="chooseTimeRange(timeRange)"
      >{{ timeRange.text }}
      </b-button>
    </div>
    <b-dropdown v-else :text="selected">
      <b-dropdown-item
        v-for="(timeRange, index) in timeRanges"
        :key="index"
        @click="chooseTimeRange(timeRange)"
        >{{ timeRange.text }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "All Time",
      timeRanges: [
        { text: "All Time", query: "long_term" },
        { text: "Last 6 Months", query: "medium_term" },
        { text: "Last 4 Weeks", query: "short_term" }
      ]
    };
  },
  props: {
    version: String
  },
  methods: {
    chooseTimeRange(selectedTimeRange) {
      this.selected = selectedTimeRange.text;
      this.$emit("updateTimeRange", selectedTimeRange.query);
    }
  }
};
</script>
