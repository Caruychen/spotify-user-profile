<template>
  <b-spinner v-if="loading" label="Spinning"></b-spinner>
  <ul v-else>
    <li v-for="(item, index) in topTen(type, timeRange)" :key="index">
      <b-card class="overflow-hidden">
        <b-row>
          <b-col cols="3" xl="2">
            <b-card-img
              class="image-column rounded-0"
              :src="item.image[item.image.length - 1].url"
              :alt="item.name"
            ></b-card-img>
          </b-col>
          <b-col cols="9" xl="10" class="text-column">
            <b-card-body :title="item.name" title-tag="p"></b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    type: String,
    timeRange: String
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
    }
  },
  created() {
    this.loadTopItems();
  }
};
</script>
