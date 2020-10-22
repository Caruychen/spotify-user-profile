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
        <BaseListCard :item="item" :isTrack="true" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseListCard from "@/components/BaseListCard.vue";

export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
    BaseListCard
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
