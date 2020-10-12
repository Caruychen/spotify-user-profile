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
    isFetched: state => (type, timeRange) => {
      // const isloaded = state[type][timeRange] !== "undefined" ? true: false;
      return type + timeRange + state
    }
  },
  mutations: {
    setTopItems(state, topItems) {
      state[topItems.type][topItems.timeRange] = topItems.items;
    }
  },
  actions: {
    fetchTopItems: async ({ commit }, params) => {
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
};
