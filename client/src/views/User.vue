<template>
  <div v-if="loading" class="loading-container">
    <b-spinner label="Spinning"></b-spinner>
  </div>
  <div v-else id="user">
    <b-img
      :src="
        user.images.length > 0
          ? user.images[0].url
          : require('@/assets/logos/person.svg')
      "
      fluid
      rounded
      alt="Profile"
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import UserPlayer from "@/components/UserPlayer.vue";
import UserDashboard from "@/components/UserDashboard.vue";

export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
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
      const profile = this.fetchUserProfile();
      const playlists = this.fetchPlaylists();
      const following = this.fetchFollowing("artist");
      await Promise.all([profile, playlists, following]);
      this.loading = false;
    })();
  }
};
</script>
