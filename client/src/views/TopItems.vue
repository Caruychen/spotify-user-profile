<template>
  <div id="top-items">
    <b-jumbotron id="top-views-header">
      <template v-slot:header>Top {{ slug | capitalize }}</template>
      <BaseTimeRangeSelector
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
        v-for="(item, index) in allTopItems(slug, timeRange)"
        :key="index"
        class="top-item"
      >
        <b-card overlay :img-src="item.image[0].url" :alt="item.name">
          <router-link
            :to="{
              name: item.type,
              params: {
                id: item.id
              }
            }"
          >
            <b-card-text>
              {{ index + 1 }}
            </b-card-text>
          </router-link>
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
import BaseTimeRangeSelector from "@/components/BaseTimeRangeSelector.vue";

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
    BaseTimeRangeSelector
  },
  computed: {
    ...mapGetters("top", {
      allTopItems: "getAllTopItems"
    })
  },
  watch: {
    timeRange: function() {
      this.loadTopItems();
    },
    slug: function() {
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
        type: this.slug,
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
