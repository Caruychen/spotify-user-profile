import Vue from "vue";
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
      const recent = await Vue.axios.get(
        "https://api.spotify.com/v1/me/player/recently-played"
      );
      if (recent.status === 200) {
        commit("setRecentItems", recent.data.items);
      }
    }
  }
};
