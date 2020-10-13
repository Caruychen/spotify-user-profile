<template>
  <div id="top-items">
    <b-jumbotron id="top-views-header">
      <template v-slot:header
        >Top {{ $route.params.slug | capitalize }}</template
      >
      <TimeRangeSelector
        version="button"
        @updateTimeRange="onTimeRangeUpdate"
      />
      <hr />
    </b-jumbotron>
    <div v-if="loading" class="loading-image">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-else class="top-items-container">
      <div
        v-for="(item, index) in allItems($route.params.slug, timeRange)"
        :key="index"
        class="top-item"
      >
        <b-card :img-src="item.image[0].url" :alt="item.name">
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
  props: {
    slug: {
      type: String,
      required: true
    }
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
    },
    $route: function() {
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
        type: this.$route.params.slug,
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
