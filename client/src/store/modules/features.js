import { spotifyHTTP } from "@/service/index.js";
import querystring from "query-string";

export default {
  namespaced: true,
  state: {
    audioFeatures: {},
    featureList: [
      {
        name: "acousticness",
        description:
          "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."
      },
      {
        name: "danceability",
        description:
          "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."
      },
      {
        name: "energy",
        description:
          "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."
      },
      {
        name: "instrumentalness",
        description:
          "Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0."
      },
      {
        name: "liveness",
        description:
          "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live."
      },
      {
        name: "speechiness",
        description:
          "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks."
      },
      {
        name: "valence",
        description:
          "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
      }
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
      if (state.audioFeatures[timeRange].length === 0) return null;
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
      if (state.audioFeatures[timeRange].length === 0) return null;
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
              text: state.keyMap[countArray.length]
            });
            diff--;
          }
          countArray.push({
            values: [1],
            text: state.keyMap[index]
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
