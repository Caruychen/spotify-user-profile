import { filterTrack, filterEpisode } from "@/store/helpers/helpers.js";
import { spotifyHTTP } from "@/service/index.js";
import querystring from "query-string";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    playback: {},
    source: axios.CancelToken.source(),
    isFetchPaused: false
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
        item,
        progress: state.playback.progress
      };
    }
  },
  mutations: {
    setCurrentPlayback(state, playback) {
      state.playback = playback;
    },
    setNewProgress(state, progress) {
      state.playback.progress = progress;
    },
    cancelRequests(state) {
      state.source.cancel();
    },
    resetCancelToken(state) {
      state.source = axios.CancelToken.source();
    },
    switchIsFetchPaused(state) {
      state.isFetchPaused = !state.isFetchPaused;
    },
    switchIsPlaying(state) {
      state.playback.isPlaying = !state.playback.isPlaying;
    }
  },
  actions: {
    fetchCurrentPlayback: async ({ commit, state }) => {
      try {
        // allow cancellation of playback requests when seek request is made
        const playback = await spotifyHTTP.get("me/player", {
          cancelToken: state.source.token
        });
        if (playback.status === 200) {
          if (playback.data) {
            const currentType = playback.data.currently_playing_type;
            commit("setCurrentPlayback", {
              device: playback.data.device,
              type: currentType,
              item: playback.data.item,
              isPlaying: playback.data.is_playing,
              progress: playback.data.progress_ms
            });
          } else {
            commit("setCurrentPlayback", {});
          }
        }
        if (playback.status == 204) {
          commit("setCurrentPlayback", {});
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          commit("resetCancelToken");
        }
      }
    },
    seekPosition: async ({ commit, rootState }, position) => {
      try {
        if (rootState.profile["user"].product === "premium") {
          commit("cancelRequests");
          commit("setNewProgress", position);
          await spotifyHTTP.put(
            "me/player/seek?" +
              querystring.stringify({
                position_ms: position
              })
          );
        }
      } catch (error) {
        if (error.response.status === 404 || error.response.status === 403) {
          commit("setCurrentPlayback", {});
        }
      }
    },
    playController: async ({ commit, dispatch, rootState }, input) => {
      try {
        if (rootState.profile["user"].product === "premium") {
          commit("cancelRequests");
          if (input === "play" || input === "pause") {
            commit("switchIsPlaying");
            await spotifyHTTP.put("me/player/" + input);
          } else {
            await spotifyHTTP.post("me/player/" + input);
          }
          dispatch("fetchCurrentPlayback");
        }
      } catch (error) {
        if (error.response.status === 404 || error.response.status === 403) {
          commit("setCurrentPlayback", {});
        }
      }
    }
  }
};
