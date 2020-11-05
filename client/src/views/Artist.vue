<template>
  <div v-if="loading" class="loading-container">
    <b-spinner label="Spinning"></b-spinner>
  </div>
  <div v-else id="artist">
    <b-card no-body class="artist-header">
      <b-row no-gutters>
        <b-col md="auto">
          <b-card-img
            :src="artist.images[0].url"
            :alt="artist.name"
          ></b-card-img>
        </b-col>
        <b-col cols="*">
          <b-card-body :overlay="!mdScreenPlus">
            <div class="back-button" @click="goBack()">
              <b-icon-chevron-left></b-icon-chevron-left>
            </div>
            <b-card-title title-tag="h1">{{ artist.name }}</b-card-title>
            <b-card-text>
              <b class="artist-statistic">{{
                artist.followers.total.toLocaleString()
              }}</b>
              followers
              <br />
              <b class="artist-statistic">{{ artist.popularity }}%</b>
              popularity
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <b-container class="artist-content">
      <b-row>
        <b-col md="6">
          <h2>Popular tracks</h2>
          <ul>
            <li
              v-for="(track, index) in topTracks(moreTracks.range)"
              :key="index"
            >
              <BaseListCard :item="track" />
            </li>
          </ul>
          <b-button
            @click="switchListRange('moreTracks')"
            variant="custom-split-outline"
            >See {{ moreTracks.text }}</b-button
          >
        </b-col>
        <b-col md="6">
          <h2>Fans also like</h2>
          <ul>
            <li
              v-for="(artist, index) in relatedArtists(moreArtists.range)"
              :key="index"
            >
              <BaseListCard :item="artist" />
            </li>
          </ul>
          <b-button
            @click="switchListRange('moreArtists')"
            variant="custom-split-outline"
            >See {{ moreArtists.text }}</b-button
          >
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col class="album-items-title">
          <h2>Albums</h2>
        </b-col>
        <b-col cols="12" class="album-items-container">
          <div v-for="(item, index) in albums" :key="index" class="album-item">
            <b-card overlay :img-src="item.image[0].url" :alt="item.name">
            </b-card>
            <b-link :href="item.external_url" target="_blank">
              {{ item.name }}
            </b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BaseListCard from "@/components/BaseListCard.vue";

export default {
  data() {
    return {
      loading: false,
      moreTracks: {
        checked: false,
        range: 5,
        text: "more"
      },
      moreArtists: {
        checked: false,
        range: 5,
        text: "more"
      }
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    BaseListCard
  },
  computed: {
    ...mapState(["windowWidth"]),
    ...mapState("artist", ["artist"]),
    ...mapGetters("artist", ["topTracks", "relatedArtists", "albums"]),
    mdScreenPlus: function() {
      return this.windowWidth >= 768;
    },
    isMoreTracks: function() {
      return this.moreTracks.checked;
    },
    isMoreArtists: function() {
      return this.moreArtists.checked;
    }
  },
  watch: {
    isMoreTracks: function() {
      this.updateListRange("moreTracks");
    },
    isMoreArtists: function() {
      this.updateListRange("moreArtists");
    }
  },
  methods: {
    ...mapActions("artist", ["loadArtist"]),
    goBack: function() {
      this.$router.go(-1);
    },
    switchListRange: function(list) {
      this[list].checked = !this[list].checked;
    },
    updateListRange: function(list) {
      this[list].checked
        ? ((this[list].range = 10), (this[list].text = "less"))
        : ((this[list].range = 5), (this[list].text = "more"));
    }
  },
  created() {
    (async () => {
      this.loading = true;
      await this.loadArtist(this.id);
      this.loading = false;
    })();
  }
};
</script>
