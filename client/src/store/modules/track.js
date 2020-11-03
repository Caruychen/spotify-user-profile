import { spotifyHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {
    track: {}
  },
  getters: {
    getTrackFromRoot: (state, getters, rootState) => id => {
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
    }
  },
  mutations: {
    setTrack(state, track) {
      state.track = track;
    }
  },
  actions: {
    loadTrack: async ({ state, getters, commit, dispatch }, id) => {
      let trackCall = Promise.resolve(true);
      if (!state.track || state.track.id != id) {
        const track = getters.getTrackFromRoot(id);
        trackCall = track
          ? commit("setTrack", track)
          : dispatch("fetchTrack", id);
      }
      await Promise.all([trackCall]);
    },
    fetchTrack: async ({ commit }, id) => {
      try {
        const artist = await spotifyHTTP.get(`tracks/${id}`);
        if (artist.status === 200) {
          commit("setTrack", artist.data);
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error(
          `${error} in artist.js - ${error.response.data.error.message}`
        );
      }
    }
  }
}