<template>
  <div id="top-ten">
    <div v-if="loading">loading</div>
    <div v-else id="top-ten-list">
      <b-container>
        <b-row>
          <b-col
            ><h2>Top 10 {{ type | capitalize }}</h2></b-col
          >
          <b-col><TimeRangeDropdown @updateTimeRange="onTimeRangeUpdate" /></b-col>
        </b-row>
      </b-container>
      <ul>
        <li v-for="item in topTen(type, timeRange)" :key="item.id">
          <b-card class="overflow-hidden" id="top-ten-list-card">
            <b-row>
              <b-col cols="3">
                <b-card-img
                  class="image-column rounded-0"
                  v-if="type === 'artists'"
                  :src="item.images[item.images.length - 1].url"
                  :alt="item.name"
                ></b-card-img>
                <b-card-img
                  cols="3"
                  class="image-column rounded-0"
                  v-else
                  :src="item.album.images[item.album.images.length - 1].url"
                  :alt="item.name"
                ></b-card-img>
              </b-col>
              <b-col cols="9" class="text-column">
                <b-card-body :title="item.name" title-tag="p"></b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TimeRangeDropdown from "@/components/TimeRangeDropdown.vue";

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
    TimeRangeDropdown
  },
  filters: {
    capitalize: text => {
      if (!text) return "";
      text = text.toString();
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  },
  computed: {
    ...mapGetters("top", {
      topTen: "getTopTen"
    })
  },
  methods: {
    ...mapActions({
      fetchTopItems: "top/fetchTopItems"
    }),
    ...mapGetters({
      isFetched: "top/isFetched"
    }),
    loadTopItems: async function() {
      this.loading = true;
      const params = {
        type: this.type,
        timeRange: this.timeRange
      }
      await this.fetchTopItems(params);
      this.loading = false;
    },
    onTimeRangeUpdate(timeRange) {
      console.log(timeRange)
      console.log(this.isFetched(this.type, timeRange))
    }
  },
  created() {
    this.loadTopItems();
  }
};
</script>
