import { spotifyHTTP } from "@/service/index.js";
import { filterTrack } from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    getRecentList: state => {
      return state.items.map(item => {
        const track = item.track;
        return filterTrack(track);
      });
    }
  },
  mutations: {
    setRecentItems(state, items) {
      state.items = items;
    }
  },
  actions: {
    fetchRecentItems: async ({ commit }) => {
      const recent = await spotifyHTTP.get("player/recently-played");
      if (recent.status === 200) {
        commit("setRecentItems", recent.data.items);
      }
    }
  }
};
