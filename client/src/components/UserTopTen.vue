<template>
  <b-col md="6" class="top-ten-container">
    <b-container class="top-ten-heading">
      <b-row align-v="center" no-gutters>
        <b-col
          ><h3>Top 10 {{ type | capitalize }}</h3></b-col
        >
        <b-col
          ><BaseTimeRangeSelector @updateTimeRange="onTimeRangeUpdate"
        /></b-col>
      </b-row>
    </b-container>
    <div v-if="loading" class="loading-container">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <ul v-else>
      <li v-for="(item, index) in topTen(type, timeRange)" :key="index">
        <BaseListCard
          :item="item"
          :isTrack="type === 'tracks'"
          :isSubColumn="true"
        />
      </li>
    </ul>
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseTimeRangeSelector from "@/components/BaseTimeRangeSelector.vue";
import BaseListCard from "@/components/BaseListCard.vue";

export default {
  data() {
    return {
      loading: false,
      timeRange: "long_term"
    };
  },
  props: {
    type: String
  },
  components: {
    BaseTimeRangeSelector,
    BaseListCard
  },
  computed: {
    ...mapGetters("top", {
      topTen: "getTopTen"
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
        type: this.type,
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
