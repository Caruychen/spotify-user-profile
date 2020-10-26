<template>
  <b-spinner v-if="loading" label="Spinning"></b-spinner>
  <div v-else class="feature-histogram">
    <b-dropdown
      variant="custom-dropdown"
      down
      :text="('Audio feature: ' + selected) | capitalize(2)"
    >
      <b-dropdown-item
        v-for="feature in featureList"
        :key="feature"
        @click="chooseFeature(feature)"
      >
        {{ feature }}
      </b-dropdown-item>
    </b-dropdown>
    <ZingchartVue
      :data="featureData"
      :series="featureSeries(timeRange, bins, selected)"
    />
  </div>
</template>

<script>
import "zingchart/es6";
import ZingchartVue from "zingchart-vue";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      myData: {
        type: "bar",
        backgroundColor: "transparent",
        plot: {
          aspect: "histogram"
        },
        "scale-y": {
          label: {
            text: "Frequency"
          }
        }
      },
      selected: "acousticness",
      bins: 20
    };
  },
  props: {
    timeRange: String,
    loading: Boolean
  },
  components: {
    ZingchartVue
  },
  computed: {
    ...mapState("features", {
      featureList: state => state.featureList
    }),
    ...mapGetters("features", {
      featureSeries: "featureDist"
    }),
    featureData: function() {
      return {
        ...this.myData,
        "scale-x": {
          label: {
            text: "Values"
          },
          labels: this.constructValueArray()
        }
      };
    }
  },
  methods: {
    chooseFeature(feature) {
      this.selected = feature;
    },
    constructValueArray() {
      let labelsArray = [];
      for (let i = 0; i < this.bins; i++) {
        labelsArray.push(i / this.bins);
      }
      return labelsArray;
    }
  }
};
</script>
