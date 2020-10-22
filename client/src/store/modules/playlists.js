import { spotifyHTTP } from "@/service/index.js";

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
      const playlists = await spotifyHTTP.get("me/playlists");
      if (playlists.status === 200) {
        commit("setPlaylists", playlists.data);
      }
    }
  }
};
