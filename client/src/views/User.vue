<template>
  <div id="user">
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="loading" />
    <div v-else>
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
              followed
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
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
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
        const following = this.fetchFollowing();
        await Promise.all([profile, playlists, following]);

        this.loading = false;
      } catch (error) {
        console.log(`${error} - ${error.response.data.error.message}`);
      }
    })();
  }
};
</script>
