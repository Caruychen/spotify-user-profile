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
    <b-jumbotron :header="user.display_name" header-level="4">
      <template v-slot:lead>
        <b-row>
          <b-col tag="span">
            <b>{{ playlistsTotal }}</b
            ><br />playlists
          </b-col>
          <b-col tag="span">
            <b>{{ followingTotal }}</b>
            <br />
            following
          </b-col>
          <b-col tag="span">
            <b>{{ user.followers.total }}</b>
            <br />
            followers
          </b-col>
        </b-row>
      </template>
    </b-jumbotron>
    <UserPlayer />
    <UserDashboard />
    <b-container id="top-ten-lists">
      <h2>Your top 10</h2>
      <b-row>
        <UserTopTen type="artists" />
        <UserTopTen type="tracks" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import UserTopTen from "@/components/UserTopTen.vue";
import UserPlayer from "@/components/UserPlayer.vue";
import UserDashboard from "@/components/UserDashboard.vue";

export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
    UserTopTen,
    UserPlayer,
    UserDashboard
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
        console.error(
          `${error} in User.vue - ${error.response.data.error.message}`
        );
      }
    })();
  }
};
</script>
