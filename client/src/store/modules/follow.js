// import Vue from "vue";
import querystring from "query-string";
import { spotifyHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {
    following: null
  },
  getters: {
    followingTotal(state) {
      return state.following.total;
    }
  },
  mutations: {
    setFollowing(state, following) {
      state.following = following;
    }
  },
  actions: {
    fetchFollowing: async ({ commit }, type) => {
      const following = await spotifyHTTP.get(
        "me/following?" +
          querystring.stringify({
            type
          })
      );
      if (following.status === 200) {
        commit("setFollowing", following.data.artists);
      }
    }
  }
};
