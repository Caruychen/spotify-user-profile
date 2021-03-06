import { backendHTTP, spotifyHTTP } from "@/service/index.js";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    isRefreshing: false,
    refreshingCall: null
  },
  mutations: {
    setRefreshing(state, refreshingState) {
      state.isRefreshing = refreshingState;
    },
    setRefreshingCall(state, call) {
      state.refreshingCall = call;
    }
  },
  actions: {
    tokenRefresh: ({ state, commit, dispatch }) => {
      // Return token refresh promise, and direct concurrent refresh calls to state holding the returned promise
      if (state.isRefreshing) {
        return state.refreshingCall;
      }
      commit("setRefreshing", true);
      const refreshingCall = dispatch("refreshCall");
      commit("setRefreshingCall", refreshingCall);
      return refreshingCall;
    },
    refreshCall: async ({ commit }) => {
      try {
        const response = await backendHTTP.get("refresh_token", {
          params: {
            refresh_token: localStorage.refresh_token
          }
        });
        localStorage.access_token = response.data.access_token;
        spotifyHTTP.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.access_token;
        commit("setRefreshing", false);
        commit("setRefreshingCall", null);
        return Promise.resolve(true);
      } catch (error) {
        if (error.response.status === 400) {
          router.push({
            name: "Login"
          });
        }
        return null;
      }
    }
  }
};
