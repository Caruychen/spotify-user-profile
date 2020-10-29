<template>
  <div class="ring-chart">
    <b-button id="keys-popover-target" ref="keys-title" variant="custom-split-outline">
      <b-icon-info-square-fill font-scale="0.75"></b-icon-info-square-fill>
      Keys
    </b-button>
    <b-popover target="keys-popover-target" triggers="hover focus" placement="bottom">
      {{ keyDescription }}
    </b-popover>
    <ZingchartVue
      v-if="isElMounted"
      :data="pieConfig(timeRange)"
      :height="pieOffsetHeight"
    />
  </div>
</template>

<script>
import "zingchart/es6";
import ZingchartVue from "zingchart-vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      isElMounted: false,
      keyDescription:
        "The key the track is in. Based on standard Pitch Class Notation, e.g. C, C♯/D♭, D and so on."
    };
  },
  props: {
    timeRange: String
  },
  components: {
    ZingchartVue
  },
  computed: {
    ...mapGetters("chartconfigs", [
      "pieConfig",
      "chartScale",
      "pieOffsetHeight"
    ])
  },
  methods: {
    ...mapMutations("chartconfigs", ["setPieTitleHeight"])
  },
  mounted() {
    this.isElMounted = true;
    this.setPieTitleHeight(this.$refs["keys-title"].offsetHeight);
  }
};
</script>
