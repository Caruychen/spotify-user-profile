import { spotifyHTTP } from "@/service/index.js";
import querystring from "query-string";
import { filterArtist, filterTrack } from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    artists: {
      long_term: { items: null, isFetching: false, fetchCall: null },
      medium_term: { items: null, isFetching: false, fetchCall: null },
      short_term: { items: null, isFetching: false, fetchCall: null }
    },
    tracks: {
      long_term: { items: null, isFetching: false, fetchCall: null },
      medium_term: { items: null, isFetching: false, fetchCall: null },
      short_term: { items: null, isFetching: false, fetchCall: null }
    }
  },
  getters: {
    getAllTopItems: state => (type, timeRange) => {
      return state[type][timeRange].items.map(item => {
        return type === "artists" ? filterArtist(item) : filterTrack(item);
      });
    },
    getTopTen: (state, getters) => (type, timeRange) => {
      return getters.getAllTopItems(type, timeRange).slice(0, 10);
    },
    avgPopularity: state => (type, timeRange) => {
      const popularityNumerator = state[type][timeRange].items
        .map(item => {
          return item.popularity;
        })
        .reduce((acc, cur) => acc + cur);
      const average = Math.round(popularityNumerator / state[type][timeRange].items.length);
      return {
        average,
        total: state[type][timeRange].items.length
      }
    }
  },
  mutations: {
    setTopItems(state, topItems) {
      state[topItems.type][topItems.timeRange].items = topItems.items;
    },
    setFetching(state, payload) {
      state[payload.type][payload.timeRange].isFetching = payload.status;
    },
    setFetchingCall(state, payload) {
      state[payload.type][payload.timeRange].fetchCall = payload.fetchCall;
    }
  },
  actions: {
    fetchTopItems: ({ state, commit, dispatch }, params) => {
      const category = state[params.type][params.timeRange];
      if (category.isFetching) {
        return category.fetchCall;
      }
      commit("setFetching", { ...params, status: true });
      const topTenCall = dispatch("topItemsCall", { ...params });
      commit("setFetchingCall", { ...params, fetchCall: topTenCall });
      return topTenCall;
    },
    topItemsCall: async ({ state, commit }, { type, timeRange }) => {
      try {
        const category = state[type][timeRange];
        if (!category.items) {
          const limit = 50;
          const topItems = await spotifyHTTP.get(
            "me/top/" +
              type +
              "?" +
              querystring.stringify({
                limit,
                time_range: timeRange
              })
          );
          if (topItems.status === 200) {
            commit("setTopItems", {
              items: topItems.data.items,
              type,
              timeRange
            });
          }
          commit("setFetching", { type, timeRange, status: false });
          commit("setFetchingCall", { type, timeRange, fetchCall: null });
          return Promise.resolve(true);
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error(
          `${error} in auth.js - ${error.response.data.error.error_description}`
        );
        return Promise.reject(error);
      }
    }
  }
};
