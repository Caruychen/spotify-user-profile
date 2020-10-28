import { spotifyHTTP } from "@/service/index.js";
import querystring from "query-string";

export default {
  namespaced: true,
  state: {
    audioFeatures: {},
    featureList: [
      "acousticness",
      "danceability",
      "energy",
      "instrumentalness",
      "liveness",
      "speechiness",
      "valence"
    ],
    keyMap: {
      0: "C",
      1: "C#/D♭",
      2: "D",
      3: "D#/E♭",
      4: "E",
      5: "F",
      6: "F#/G♭",
      7: "G",
      8: "G#/A♭",
      9: "A",
      10: "A#/B♭",
      11: "B"
    }
  },
  getters: {
    trackIDs: (state, getters, rootState) => timeRange => {
      return rootState.top.tracks[timeRange].items.map(track => {
        return track.id ? track.id : null;
      });
    },
    featureDist: state => (timeRange, bins, feature) => {
      const range = 1;
      const width = range / bins;
      const values = [];

      state.audioFeatures[timeRange].forEach(item => {
        const index = Math.floor(item[feature] / width);
        let diff = index - values.length;
        if (diff < 0) {
          values[index]++;
        } else {
          while (diff > 0) {
            values.push(0);
            diff--;
          }
          values.push(1);
        }
      });
      if (bins > values.length) {
        for (let i = 0; i < bins - values.length; i++) {
          values.push(0);
        }
      }
      return [
        {
          values,
          text: feature
        }
      ];
    },
    valueCount: state => (type, timeRange) => {
      const countArray = [];
      state.audioFeatures[timeRange].forEach(item => {
        const index = item[type];
        let diff = index - countArray.length;
        if (diff < 0) {
          countArray[index].values[0]++;
        } else {
          while (diff > 0) {
            countArray.push({
              values: [0],
              text:
                type === "key"
                  ? state.keyMap[countArray.length]
                  : `${countArray.length}/${countArray.length > 4 ? "8" : "4"}`
            });
            diff--;
          }
          countArray.push({
            values: [1],
            text:
              type === "key"
                ? state.keyMap[index]
                : `${index}/${index > 4 ? "8" : "4"}`
          });
        }
      });
      return countArray;
    }
  },
  mutations: {
    setAudioFeatures(state, payload) {
      state.audioFeatures[payload.timeRange] = payload.features;
    }
  },
  actions: {
    fetchAudioFeatures: async (
      { getters, commit, dispatch, rootState },
      timeRange
    ) => {
      if (!rootState.top.tracks[timeRange].items) {
        await dispatch(
          "top/fetchTopItems",
          { type: "tracks", timeRange },
          { root: true }
        );
      }
      const features = await spotifyHTTP.get(
        "audio-features/?" +
          querystring.stringify(
            { ids: getters.trackIDs(timeRange) },
            { arrayFormat: "comma" }
          )
      );
      if (features.status === 200) {
        commit("setAudioFeatures", {
          timeRange,
          features: features.data.audio_features
        });
      }
    }
  }
};
