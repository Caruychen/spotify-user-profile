import Vue from "vue";

export default {
  namespaced: true,
  state: {
    playlists: null
  },
  getters: {
    playlistsTotal(state) {
      return state.playlists.total;
    }
  },
  mutations: {
    setPlaylists(state, playlists) {
      state.playlists = playlists;
    }
  },
  actions: {
    fetchPlaylists: async ({ commit }) => {
      const playlists = await Vue.axios.get(
        "https://api.spotify.com/v1/me/playlists"
      );
      if (playlists.status === 200) {
        commit("setPlaylists", playlists.data);
      }
    }
  }
};
