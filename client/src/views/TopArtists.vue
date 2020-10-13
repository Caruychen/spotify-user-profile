<template>
  <div id="top-artists">
    <b-jumbotron id="top-views-header" header="Top Artists">
      <TimeRangeSelector
        version="button"
        @updateTimeRange="onTimeRangeUpdate"
      />
      <hr />
    </b-jumbotron>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="loading" />
    <div v-else class="top-items-container">
      <div v-for="(item, index) in allItems('artists', timeRange)" :key="index" class="top-item">
        <b-card :img-src="item.image" :alt="item.name">
          <b-card-text>
            {{ index + 1 }}
          </b-card-text>
        </b-card>
        <b-link :href="item.external_url" target="_blank">
          {{ item.name }}
        </b-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TimeRangeSelector from "@/components/TimeRangeSelector.vue";

export default {
  data() {
    return {
      loading: false,
      timeRange: "long_term"
    };
  },
  components: {
    TimeRangeSelector
  },
  computed: {
    ...mapGetters("top", {
      allItems: "getAllTopItems"
    })
  },
  watch: {
    timeRange: function() {
      this.loadTopItems();
    }
  },
  methods: {
    ...mapActions({
      fetchTopItems: "top/fetchTopItems"
    }),
    loadTopItems: async function() {
      this.loading = true;
      const params = {
        type: "artists",
        timeRange: this.timeRange
      };
      await this.fetchTopItems(params);
      this.loading = false;
    },
    onTimeRangeUpdate(timeRange) {
      this.timeRange = timeRange;
    }
  },
  created() {
    this.loadTopItems();
  }
};
</script>