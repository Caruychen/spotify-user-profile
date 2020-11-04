import { spotifyHTTP } from "@/service/index.js";
import { filterTrack } from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    tracks: []
  },
  getters: {
    getRecentList: state => {
      return state.tracks.map(item => {
        const track = item.track;
        return filterTrack(track);
      });
    }
  },
  mutations: {
    setRecentItems(state, tracks) {
      state.tracks = tracks;
    }
  },
  actions: {
    fetchRecentItems: async ({ commit }) => {
      const recent = await spotifyHTTP.get("me/player/recently-played");
      if (recent.status === 200) {
        commit("setRecentItems", recent.data.items);
      }
    }
  }
};
