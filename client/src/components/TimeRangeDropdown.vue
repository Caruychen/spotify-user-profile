<template>
  <div>
    <b-dropdown :text="selected">
      <b-dropdown-item
        @click="chooseTimeRange(timeRange)"
        v-for="timeRange in timeRanges"
        :key="timeRange.text"
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
  methods: {
    chooseTimeRange(selectedTimeRange) {
      this.selected = selectedTimeRange.text;
      this.$emit("updateTimeRange", selectedTimeRange.query);
    }
  }
};
</script>
