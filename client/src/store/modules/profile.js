import Vue from "vue";

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUserProfile(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    fetchUserProfile: async ({ commit }) => {
      const userProfile = await Vue.axios.get("https://api.spotify.com/v1/me");
      if (userProfile.status === 200) {
        commit("setUserProfile", userProfile.data);
      }
    }
  }
};
