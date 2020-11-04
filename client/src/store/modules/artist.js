import { spotifyHTTP } from "@/service/index.js";
import querystring from "query-string";
import {
  filterArtist,
  filterTrack,
  filterAlbum
} from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    artist: {},
    albums: {},
    topTracks: {},
    relatedArtists: {}
  },
  getters: {
    getArtistFromTopState: (state, getters, rootState) => id => {
      const timeRanges = Object.keys(rootState.top["artists"]);
      for (const timeRange of timeRanges) {
        const artistsArray = rootState.top["artists"][timeRange].items;
        if (artistsArray) {
          const artist = artistsArray.find(item => {
            return item.id === id;
          });
          if (artist) return artist;
        }
      }
      return false;
    },
    topTracks: state => listRange => {
      return state.topTracks.tracks
        .map(track => {
          return filterTrack(track);
        })
        .slice(0, listRange);
    },
    relatedArtists: state => listRange => {
      return state.relatedArtists.artists
        .map(artist => {
          return filterArtist(artist);
        })
        .slice(0, listRange);
    },
    albums: state => {
      return state.albums.items.map(album => {
        return filterAlbum(album);
      });
    }
  },
  mutations: {
    setArtist(state, artist) {
      state.artist = artist;
    },
    setArtistSubData(state, artistData) {
      state[artistData.category] = artistData.data;
    }
  },
  actions: {
    loadArtist: async ({ state, getters, commit, dispatch }, id) => {
      let artistCall = Promise.resolve(true);
      if (!state.artist || state.artist.id != id) {
        const artist = getters.getArtistFromTopState(id);
        artistCall = artist
          ? commit("setArtist", artist)
          : dispatch("fetchArtist", id);
      }
      const albumCall = dispatch("fetchAlbums", id);
      const topTracksCall = dispatch("fetchTopTracks", id);
      const relatedArtistsCall = dispatch("fetchRelatedArtists", id);
      await Promise.all([
        artistCall,
        albumCall,
        topTracksCall,
        relatedArtistsCall
      ]);
    },
    fetchArtist: async ({ commit }, id) => {
      try {
        const artist = await spotifyHTTP.get(`artists/${id}`);
        if (artist.status === 200) {
          commit("setArtist", artist.data);
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error(
          `${error} in artist.js - ${error.response.data.error.message}`
        );
      }
    },
    fetchAlbums: async ({ commit }, id) => {
      try {
        const albums = await spotifyHTTP.get(`artists/${id}/albums`);
        if (albums.status === 200) {
          commit("setArtistSubData", {
            data: albums.data,
            category: "albums"
          });
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error(
          `${error} in artist.js - ${error.response.data.error.message}`
        );
      }
    },
    fetchTopTracks: async ({ commit }, id) => {
      try {
        const topTracks = await spotifyHTTP.get(
          "artists/" +
            id +
            "/top-tracks?" +
            querystring.stringify({
              country: "from_token"
            })
        );
        if (topTracks.status === 200) {
          commit("setArtistSubData", {
            data: topTracks.data,
            category: "topTracks"
          });
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error(
          `${error} in artist.js - ${error.response.data.error.message}`
        );
      }
    },
    fetchRelatedArtists: async ({ commit }, id) => {
      try {
        const albums = await spotifyHTTP.get(`artists/${id}/related-artists`);
        if (albums.status === 200) {
          commit("setArtistSubData", {
            data: albums.data,
            category: "relatedArtists"
          });
        }
        return Promise.resolve(true);
      } catch (error) {
        console.error(
          `${error} in artist.js - ${error.response.data.error.message}`
        );
      }
    }
  }
};
