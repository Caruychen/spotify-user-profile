import { spotifyHTTP } from "@/service/index.js";
import querystring from "query-string";
import { filterArtist, filterTrack } from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    artists: {},
    tracks: {}
  },
  getters: {
    getAllTopItems: state => (type, timeRange) => {
      return state[type][timeRange].map(item => {
        return type === "artists" ? filterArtist(item) : filterTrack(item);
      });
    },
    getTopTen: (state, getters) => (type, timeRange) => {
      return getters.getAllTopItems(type, timeRange).slice(0, 10);
    }
  },
  mutations: {
    setTopItems(state, topItems) {
      state[topItems.type][topItems.timeRange] = topItems.items;
    }
  },
  actions: {
    fetchTopItems: async ({ state, commit }, params) => {
      if (!state[params.type][params.timeRange]) {
        const limit = 50;
        const topItems = await spotifyHTTP.get(
          "top/" +
            params.type +
            "?" +
            querystring.stringify({
              limit,
              time_range: params.timeRange
            })
        );
        if (topItems.status === 200) {
          commit("setTopItems", {
            items: topItems.data.items,
            type: params.type,
            timeRange: params.timeRange
          });
        }
      }
    }
  }
};
