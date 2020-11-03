import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.js";
import profile from "./modules/profile.js";
import playlists from "./modules/playlists.js";
import follow from "./modules/follow.js";
import top from "./modules/top.js";
import recent from "./modules/recent.js";
import player from "./modules/player.js";
import features from "./modules/features.js";
import chartconfigs from "./modules/chartconfigs.js";
import artist from "./modules/artist.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: window.innerWidth
  },
  mutations: {
    setWindowWidth(state) {
      state.windowWidth = window.innerWidth;
    }
  },
  actions: {},
  modules: {
    profile,
    auth,
    playlists,
    follow,
    top,
    recent,
    player,
    features,
    chartconfigs,
    artist
  }
});
