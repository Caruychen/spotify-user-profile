<template>
  <b-spinner v-if="loading" label="Spinning"></b-spinner>
  <ZingchartVue
    class="ring-chart"
    v-else
    :data="pieConfig('Keys',timeRange)"
  />
</template>

<script>
import "zingchart/es6";
import ZingchartVue from "zingchart-vue";
import { mapGetters } from "vuex";

export default {
  props: {
    timeRange: String,
    loading: Boolean
  },
  components: {
    ZingchartVue
  },
  computed: {
    ...mapGetters({
      valueCount: "features/valueCount",
      pieConfig: "chartconfigs/pieConfig"
    })
  }
};
</script>
