<template>
  <b-spinner v-if="loading" label="Spinning"></b-spinner>
  <div v-else id="user">
    <b-img
      :src="user.images[0].url"
      fluid
      rounded
      alt="Profile image"
      id="user-profile-image"
    ></b-img>
    <b-jumbotron
      id="user-profile-header"
      :header="user.display_name"
      header-level="4"
    >
      <b-container id="user-profile-summary">
        <b-row align-h="center" cols-md="3">
          <b-col>
            playlists <br /><b>{{ playlistsTotal }}</b>
          </b-col>
          <b-col>
            following
            <br />
            <b>{{ followingTotal }}</b>
          </b-col>
          <b-col>
            followers
            <br />
            <b>{{ user.followers.total }}</b>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
    <b-container class="top-ten-lists-container">
      <b-row>
        <TopTen type="artists" />
        <TopTen type="tracks" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import TopTen from "@/components/TopTen.vue";

export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
    TopTen
  },
  computed: {
    ...mapState("profile", {
      user: state => state.user
    }),
    ...mapGetters({
      playlistsTotal: "playlists/playlistsTotal",
      followingTotal: "follow/followingTotal"
    })
  },
  methods: {
    ...mapActions({
      fetchUserProfile: "profile/fetchUserProfile",
      fetchPlaylists: "playlists/fetchPlaylists",
      fetchFollowing: "follow/fetchFollowing"
    })
  },
  created() {
    this.loading = true;
    (async () => {
      try {
        const profile = this.fetchUserProfile();
        const playlists = this.fetchPlaylists();
        const following = this.fetchFollowing("artist");
        await Promise.all([profile, playlists, following]);

        this.loading = false;
      } catch (error) {
        console.log(`${error} - ${error.response.data.error.message}`);
      }
    })();
  }
};
</script>
