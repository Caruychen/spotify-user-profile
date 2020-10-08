import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.js";
import profile from "./modules/profile.js";
import playlists from "./modules/playlists.js";
import follow from "./modules/follow.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    profile,
    auth,
    playlists,
    follow
  }
});
