import Vue from "vue";

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    getRecentList: state => {
      return state.items.map(item => {
        const track = item.track;
        return {
          name: track.name,
          artists: track.artists,
          album: {
            name: track.album.name,
            image: track.album.images[track.album.images.length - 1].url,
            spotifyUrl: track.album.external_urls.spotify
          },
          duration: track.duration_ms
        };
      });
    }
  },
  mutations: {
    setRecentItems(state, items) {
      state.items = items;
    }
  },
  actions: {
    fetchRecentItems: async ({ commit }) => {
      const recent = await Vue.axios.get(
        "https://api.spotify.com/v1/me/player/recently-played"
      );
      if (recent.status === 200) {
        commit("setRecentItems", recent.data.items);
      }
    }
  }
};
