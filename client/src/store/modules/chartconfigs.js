import { splitColors } from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    pieData: {
      type: "ring",
      backgroundColor: "none",
      height: "100%",
      width: "100%",
      plot: {
        valueBox: {
          text: "%t\n%npv%",
          fontSize: "12px",
          decimals: 0,
          placement: "out",
          rules: [
            {
              rule: "%v <= 0",
              text: ""
            }
          ]
        },
        slice: 80,
        borderWidth: "0px",
        animation: {
          effect: "ANIMATION_EXPAND_VERTICAL",
          method: "ANIMATION_REGULAR_EASE_OUT",
          sequence: "ANIMATION_BY_PLOT",
          speed: 50
        }
      },
      scaleR: {
        refAngle: 270
      }
    },
    chartColors: ["#6771E3", "#DD50A3","#DDD150","#50DD8A"]
  },
  getters: {
    pieConfig: (state, getters, rootState, rootGetters) => (title, timeRange) => {
      const seriesData = rootGetters["features/valueCount"]("key", timeRange).map((item, index, array) => {
        const colorInterval = splitColors(state.chartColors, index, array.length)
        return { ...item, backgroundColor: colorInterval }
      });
      return {
        layout: "horizontal",
        height: "80%",
        graphset: [
          {
            ...state.pieData,
            series: seriesData,
            tooltip: {
              text:
                '<span style="color:%color">%t:</span><br><span style="color:%color">%v tracks</span>',
              fontSize: "16",
              backgroundColor: "none",
              borderColor: "none",
              anchor: "c",
              x: "50%",
              y: "53%",
              sticky: true
            }
          }
        ]
      };
    }
  }
};
