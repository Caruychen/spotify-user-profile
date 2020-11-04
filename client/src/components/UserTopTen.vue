<template>
  <b-col md="6" class="top-ten-container">
    <b-container class="top-ten-heading">
      <b-row align-v="center" no-gutters>
        <b-col
          ><h3>Top 10 {{ type | capitalize }}</h3></b-col
        >
      </b-row>
    </b-container>
    <ul>
      <li v-for="(item, index) in topTen(type, timeRange)" :key="index">
        <BaseListCard :item="item" />
      </li>
    </ul>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";
import BaseListCard from "@/components/BaseListCard.vue";

export default {
  props: {
    type: String,
    timeRange: String
  },
  components: {
    BaseListCard
  },
  computed: {
    ...mapGetters("top", {
      topTen: "getTopTen"
    })
  }
};
</script>
