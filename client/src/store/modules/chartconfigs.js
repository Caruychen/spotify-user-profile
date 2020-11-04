import { colorInterval, colorArray, capitalize } from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    pieData: {
      type: "ring",
      backgroundColor: "none",
      width: "100%",
      plotarea: {
        margin: "dynamic"
      },
      scaleR: {
        refAngle: 270
      }
    },
    histogramData: {
      type: "bar",
      backgroundColor: "none",
      tooltip: {
        text: "%v track(s)\n%k"
      }
    },
    radarData: {
      type: "radar",
      backgroundColor: "none",
      plot: {
        aspect: "area"
      },
      tooltip: {
        decimals: 2,
        text: "%k: %v"
      }
    },
    pieColorRange: ["#6771E3", "#DD50A3", "#DDD150", "#50DD8A"],
    histogramColorRange: ["#6771E3", "#DD50A3"],
    titleHeight: {
      pie: 0,
      histogram: 0
    }
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
    fontScale: (state, getters) => {
      return getters.chartScale === 1
        ? getters.chartScale
        : getters.chartScale * 1.25;
    },
    offsetHeight: (state, getters) => type => {
      const defaultChartHeight = 480;
      return defaultChartHeight * getters.chartScale - state.titleHeight[type];
    },
    pieConfig: (state, getters, rootState, rootGetters) => timeRange => {
      const seriesData = rootGetters["features/valueCount"](
        "key",
        timeRange
      ).map((item, index, array) => {
        const color = colorInterval(state.pieColorRange, index, array.length);
        return { ...item, backgroundColor: color };
      });
      const valueBoxFontBase = 12;
      const sliceBase = 80;
      const tooltipFontBase = 16;
      const tooltipYOffsetBase = getters.offsetHeight("pie") / 2;
      return {
        graphset: [
          {
            ...state.pieData,
            plot: {
              valueBox: {
                text: "%t\n%npv%",
                fontSize: valueBoxFontBase * getters.fontScale,
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
            tooltip: {
              text:
                '<span style="color:%color">%t:</span><br><span style="color:%color">%v tracks</span>',
              fontSize: tooltipFontBase * getters.fontScale,
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
      const fontSizeBase = 12;
      const leftMarginBase = 38;
      return {
        graphset: [
          {
            ...state.histogramData,
            plot: {
              aspect: "histogram",
              styles: colorArray(state.histogramColorRange, bins)
            },
            plotarea: {
              marginTop: "dynamic",
              marginBottom: "dynamic",
              marginLeft:
                leftMarginBase - (1 - getters.fontScale) * fontSizeBase,
              marginRight: "10"
            },
            scaleX: {
              values,
              lineColor: "none",
              tick: {
                alpha: 0.5
              },
              item: {
                fontSize: fontSizeBase * getters.fontScale
              }
            },
            scaleY: {
              label: {
                text: "Tracks",
                color: "#48ada3",
                alpha: 0.8,
                fontSize: fontSizeBase * getters.fontScale
              },
              item: {
                fontSize: fontSizeBase * getters.fontScale
              },
              guide: {
                alpha: 0.1,
                lineStyle: "dashed"
              },
              lineColor: "none",
              tick: {
                visible: false
              }
            },
            series: rootGetters["features/featureDist"](
              timeRange,
              bins,
              feature
            )
          }
        ]
      };
    },
    radarConfig: (state, getters, rootState, rootGetters) => {
      const fontBase = 12;
      return {
        graphset: [
          {
            ...state.radarData,
            scaleK: {
              values: rootState.features["featureList"].map(_ => capitalize(_.name)),
              item: {
                fontColor: "#E7DFDD",
                fontSize: fontBase * getters.fontScale,
                borderColor: "#9c9795",
                backgroundColor: "#302d3b",
                borderWidth: 1,
                padding: "5 10",
                borderRadius: 10
              },
              tick: {
                lineColor: "#9c9795",
                lineStyle: "dotted",
                lineWidth: 2,
                size: 15
              },
              guide: {
                lineColor: "#9c9795",
                lineWidth: 1,
                lineStyle: "solid",
                backgroundColor: "transparent"
              }
            },
            scaleV: {
              values: "0:1:0.25",
              item: {
                visible: true,
                fontSize: fontBase * getters.fontScale
              },
              guide: {
                lineColor: "#4a465c",
                lineStyle: "solid",
                backgroundColor: "transparent"
              }
            },
            series: [{
              values: rootGetters["track/getFeatureValues"],
              lineColor: "#6771E3",
              backgroundColor: "#6771E3",
              marker: {
                backgroundColor: "#6771E3",
                borderColor: "#E7DFDD",
                size: 3
              }
            }],
          }
        ]
      };
    }
  },
  mutations: {
    setTitleHeight(state, element) {
      state.titleHeight[element.type] = element.height;
    }
  }
};
