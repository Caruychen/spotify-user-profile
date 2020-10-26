<template>
  <b-spinner v-if="loading" label="Spinning"></b-spinner>
  <ZingchartVue class="keys-ring" v-else :data="pieData" :series="keys(timeRange)" />
</template>

<script>
import "zingchart/es6";
import ZingchartVue from "zingchart-vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      pieData: {
        type: "ring",
        backgroundColor: "none",
        title: {
          text: "Song keys",
          fontColor: "#E7DFDD",
          textAlign: "right"
        },
        plot: {
          valueBox: {
            text: "%t\n%npv%",
            placement: "out",
            fontSize: "12px",
            decimals: 0,
            mediaRules: [
              {
                minWidth: 500,
                rules: [
                  {
                    rule: "%npv > 5 ",
                    placement: "in",
                    fontColor: "white"
                  }
                ]
              }
            ]
          },
          borderWidth: "0px",
          animation: {
            effect: "ANIMATION_EXPAND_VERTICAL",
            method: "ANIMATION_REGULAR_EASE_OUT",
            sequence: "ANIMATION_BY_PLOT",
            speed: 50
          },
          slice: 115
        },
        scaleR: {
          refAngle: 270
        },
        tooltip: {
          text:
            '<span style="color:%color">%t:</span><br><span style="color:%color">%v tracks</span>',
          fontSize: "18",
          backgroundColor: "none",
          borderColor: "none",
          anchor: "c",
          x: "50%",
          y: "54%",
          sticky: true
        }
      }
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
    ...mapGetters("features", {
      keys: "keys"
    })
  }
};
</script>
