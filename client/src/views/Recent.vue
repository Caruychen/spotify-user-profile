<template>
  <div id="recent">
    <b-jumbotron id="recent-header">
      <template v-slot:header>Recently played tracks</template>
      <hr />
    </b-jumbotron>
    <div v-if="loading" class="loading-image">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <ul v-else>
      <li v-for="(item, index) in recentList" :key="index">
        <TrackItem :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TrackItem from "@/components/TrackItem.vue";

export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
    TrackItem
  },
  computed: {
    ...mapGetters("recent", {
      recentList: "getRecentList"
    })
  },
  methods: {
    ...mapActions("recent", {
      fetchRecent: "fetchRecentItems"
    }),
    loadRecent: async function() {
      this.loading = true;
      await this.fetchRecent();
      this.loading = false;
    }
  },
  created() {
    this.loadRecent();
  }
};
</script>
