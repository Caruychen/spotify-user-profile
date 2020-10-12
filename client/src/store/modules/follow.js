import Vue from "vue";
import querystring from "query-string";

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
      const following = await Vue.axios.get(
        "https://api.spotify.com/v1/me/following?" +
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
