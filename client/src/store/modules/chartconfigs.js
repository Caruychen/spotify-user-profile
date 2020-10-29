import { colorInterval, colorArray } from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    pieData: {
      type: "ring",
      backgroundColor: "none",
      width: "100%",
      scaleR: {
        refAngle: 270
      }
    },
    histogramData: {
      type: "bar",
      backgroundColor: "none",
      plot: {
        aspect: "histogram"
      },
      plotarea: {
        margin: "dynamic"
      },
      "scale-y": {
        label: {
          text: "Frequency"
        },
        guide: {
          alpha: 0.2
        }
      },
      tooltip: {
        text: "%v track(s)\n%k"
      }
    },
    pieColorRange: ["#6771E3", "#DD50A3", "#DDD150", "#50DD8A"],
    histogramColorRange: ["#6771E3", "#DD50A3"],
    pieTitleHeight: 0,
    pieDefaultHeight: 480
  },
  getters: {
    chartScale: (state, getters, rootState) => {
      if (rootState.windowWidth < 380) {
        return 0.6;
      } else if (rootState.windowWidth < 800) {
        return 0.7;
      }
      return 1;
    },
    pieOffsetHeight: (state, getters) => {
      return state.pieDefaultHeight * getters.chartScale - state.pieTitleHeight;
    },
    pieConfig: (state, getters, rootState, rootGetters) => timeRange => {
      const seriesData = rootGetters["features/valueCount"](
        "key",
        timeRange
      ).map((item, index, array) => {
        const color = colorInterval(state.pieColorRange, index, array.length);
        return { ...item, backgroundColor: color };
      });
      const fontScale =
        getters.chartScale === 1
          ? getters.chartScale
          : getters.chartScale * 1.25;
      const valueBoxFontBase = 12;
      const sliceBase = 80;
      const tooltipFontBase = 16;
      const tooltipYOffsetBase = getters.pieOffsetHeight / 2;
      return {
        graphset: [
          {
            ...state.pieData,
            plot: {
              valueBox: {
                text: "%t\n%npv%",
                fontSize: valueBoxFontBase * fontScale,
                decimals: 0,
                placement: "out",
                rules: [
                  {
                    rule: "%v <= 0",
                    text: ""
                  }
                ]
              },
              slice: sliceBase * getters.chartScale,
              borderWidth: "0px",
              animation: {
                effect: "ANIMATION_EXPAND_VERTICAL",
                method: "ANIMATION_REGULAR_EASE_OUT",
                sequence: "ANIMATION_BY_PLOT",
                speed: 50
              }
            },
            plotarea: {
              margin: "dynamic"
            },
            tooltip: {
              text:
                '<span style="color:%color">%t:</span><br><span style="color:%color">%v tracks</span>',
              fontSize: tooltipFontBase * fontScale,
              backgroundColor: "none",
              borderColor: "none",
              anchor: "c",
              x: "50%",
              y: tooltipYOffsetBase,
              sticky: true
            },
            series: seriesData
          }
        ]
      };
    },
    histConfig: (state, getters, rootState, rootGetters) => (
      timeRange,
      bins,
      feature
    ) => {
      if (!bins || bins <= 0) bins = 1;
      const values = [];
      for (let i = 0; i < bins; i++) {
        values.push(i / bins);
      }
      return {
        graphset: [
          {
            ...state.histogramData,
            plot: {
              styles: colorArray(state.histogramColorRange, bins)
            },
            series: rootGetters["features/featureDist"](
              timeRange,
              bins,
              feature
            ),
            scaleX: {
              values
            }
          }
        ]
      };
    }
  },
  mutations: {
    setPieTitleHeight(state, height) {
      state.pieTitleHeight = height;
    }
  }
};
