import Vue from "vue";
import querystring from "query-string";

export default {
  namespaced: true,
  state: {
    artists: {},
    tracks: {}
  },
  getters: {
    getTopTen: state => (type, timeRange) => {
      const topTen = state[type][timeRange].slice(0, 10);
      return topTen;
    },
    getAllTopItems: state => (type, timeRange) => {
      return state[type][timeRange].map(item => {
        return {
          name: item.name,
          external_url: item.external_urls.spotify,
          image:
            item.images.length > 0
              ? item.images[0].url
              : require("@/assets/logos/person.svg")
        };
      });
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
        const topItems = await Vue.axios.get(
          "https://api.spotify.com/v1/me/top/" +
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
