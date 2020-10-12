import Vue from "vue";

export default {
  namespaced: true,
  mutations: {
    setAccessToken(accessToken) {
      localStorage.access_token = accessToken;
    }
  },
  actions: {
    tokenRefresh: async ({ commit }) => {
      try {
        const response = await Vue.axios.get(
          "http://localhost:8081/refresh_token",
          {
            params: {
              refresh_token: localStorage.refresh_token
            }
          }
        );
        if (response.status === 200) {
          commit("setAccessToken", response.data.access_token);
          return response.status;
        }
      } catch (error) {
        console.log(
          `${error} - ${error.response.data.error.error_description}`
        );
        return null;
      }
    }
  }
};
