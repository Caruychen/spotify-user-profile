import { spotifyHTTP } from "@/service/index.js";

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
      const userProfile = await spotifyHTTP.get("me");
      if (userProfile.status === 200) {
        commit("setUserProfile", userProfile.data);
      }
    }
  }
};
