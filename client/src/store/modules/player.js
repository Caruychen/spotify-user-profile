import { filterTrack, filterEpisode } from "@/store/helpers/helpers.js";
import { spotifyHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {
    playback: {}
  },
  getters: {
    currentDevicePlayback: state => {
      if (!state.playback.item) return null;
      const type = state.playback.type;

      let item;
      switch (type) {
        case "track":
          item = filterTrack(state.playback.item);
          break;
        case "episode":
          item = filterEpisode(state.playback.item);
          break;
        default:
          item = type;
      }
      return {
        device: state.playback.device.name,
        item
      };
    }
  },
  mutations: {
    setCurrentPlayback(state, playback) {
      state.playback = playback;
    }
  },
  actions: {
    fetchCurrentPlayback: async ({ commit }) => {
      try {
        const playback = await spotifyHTTP.get("player");
        if (playback.status === 200 && playback.data) {
          const currentType = playback.data.currently_playing_type;
          commit("setCurrentPlayback", {
            device: playback.data.device,
            type: currentType,
            item: playback.data.item,
            isPlaying: playback.data.is_playing
          });
        }
      } catch (error) {
        console.error(
          `${error} in player.js - ${error.response.data.error.message}`
        );
      }
    }
  }
};
