<template>
  <div class="feature-histogram">
    <b-dropdown
      down
      split
      split-variant="custom-split-outline"
      variant="custom-split"
      ref="histogram-title"
    >
      <template #button-content>
        <b-icon-info-square-fill font-scale="0.75"></b-icon-info-square-fill>
        {{ selected.name | capitalize }}
      </template>
      <b-dropdown-item
        v-for="feature in featureList"
        :key="feature.name"
        @click="chooseFeature(feature)"
      >
        {{ feature.name }}
      </b-dropdown-item>
    </b-dropdown>
    <b-popover
      v-if="isElMounted"
      :target="popoverTarget"
      triggers="hover focus"
      placement="bottom"
    >
      {{ selected.description }}
    </b-popover>
    <ZingchartVue
      v-if="isElMounted"
      :data="histConfig(timeRange, bins, selected.name)"
      :height="offsetHeight('histogram')"
    />
  </div>
</template>

<script>
import "zingchart/es6";
import ZingchartVue from "zingchart-vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      selected: null,
      bins: 20,
      isElMounted: false
    };
  },
  props: {
    timeRange: String
  },
  components: {
    ZingchartVue
  },
  computed: {
    ...mapState("features", {
      featureList: state => state.featureList
    }),
    ...mapGetters("chartconfigs", ["histConfig", "offsetHeight"]),
    popoverTarget: function() {
      return this.$refs["histogram-title"].$el.children[0];
    }
  },
  methods: {
    ...mapMutations("chartconfigs", ["setTitleHeight"]),
    chooseFeature(feature) {
      this.selected = feature;
    }
  },
  created() {
    this.chooseFeature(this.featureList[0]);
  },
  mounted() {
    this.isElMounted = true;
    this.setTitleHeight({
      type: "histogram",
      height: this.$refs["histogram-title"].$el.offsetHeight
    });
  }
};
</script>
