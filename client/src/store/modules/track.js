import { spotifyHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {
    track: {},
    trackFeatures: {}
  },
  getters: {
    getTrackFromRootTop: (state, getters, rootState) => id => {
      const timeRanges = Object.keys(rootState.top["tracks"]);
      for (const timeRange of timeRanges) {
        const tracksArray = rootState.top["tracks"][timeRange].items;
        if (tracksArray) {
          const track = tracksArray.find(item => {
            return item.id === id;
          });
          if (track) return track;
        }
      }
      return false;
    },
    getTrackFromRootRecent: (state, getters, rootState) => id => {
      if (!rootState.recent.tracks) return false;
      const trackItem = rootState.recent.tracks.find(item => {
        return item.track.id === id;
      });
      return trackItem ? trackItem.track : false;
    },
    getTrackFromRootArtist: (state, getters, rootState) => id => {
      if (!rootState.artist.topTracks.tracks) return false;
      const track = rootState.artist.topTracks.tracks.find(item => {
        return item.id === id;
      });
      return track ? track : false;
    },
    getTrackFromRootPlayer: (state, getters, rootState) => id => {
      const playerItem = rootState.player.playback;
      if (!playerItem.item || playerItem.item.id != id) return false;
      return rootState.player.playback.item;
    },
    getTrackFeaturesFromRoot: (state, getters, rootState) => id => {
      const timeRanges = Object.keys(rootState.features["audioFeatures"]);
      for (const timeRange of timeRanges) {
        const featuresArray = rootState.features["audioFeatures"][timeRange];
        if (featuresArray) {
          const feature = featuresArray.find(item => {
            return item.id === id;
          });
          if (feature) return feature;
        }
      }
      return false;
    },
    getFeatureValues: (state, getters, rootState) => {
      const values = rootState.features["featureList"].map(feature => {
        return state.trackFeatures[feature.name];
      });
      return values;
    }
  },
  mutations: {
    setTrack(state, track) {
      state.track = track;
    },
    setTrackFeatures(state, trackFeatures) {
      state.trackFeatures = trackFeatures;
    }
  },
  actions: {
    loadTrack: async ({ state, getters, commit, dispatch }, id) => {
      let trackCall = Promise.resolve(true);
      let featureCall = Promise.resolve(true);
      if (!state.track || state.track.id != id) {
        // Load track data from within state if exists, else make fetch call
        const track =
          getters.getTrackFromRootPlayer(id) ||
          getters.getTrackFromRootRecent(id) ||
          getters.getTrackFromRootArtist(id) ||
          getters.getTrackFromRootTop(id);
        trackCall = track
          ? commit("setTrack", track)
          : dispatch("fetchTrack", id);
        // Load features from within state if exists, else make fetch call
        const features = getters.getTrackFeaturesFromRoot(id);
        featureCall = features
          ? commit("setTrackFeatures", features)
          : dispatch("fetchTrackFeatures", id);
      }
      await Promise.all([trackCall, featureCall]);
    },
    fetchTrack: async ({ commit }, id) => {
      try {
        const track = await spotifyHTTP.get(`tracks/${id}`);
        if (track.status === 200) {
          commit("setTrack", track.data);
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error(
          `${error} in track.js - ${error.response.data.error.message}`
        );
      }
    },
    fetchTrackFeatures: async ({ commit }, id) => {
      try {
        const features = await spotifyHTTP.get(`audio-features/${id}`);
        if (features.status === 200) {
          commit("setTrackFeatures", features.data);
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error(
          `${error} in track.js - ${error.response.data.error.message}`
        );
      }
    }
  }
};
