<template>
  <div id="user">
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="loading" />
    <div v-else>
      <b-img :src="user.images[0].url" fluid alt="Profile image"></b-img>
      <h1>{{ user.display_name }}</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState("profile", {
      user: state => state.user
    })
  },
  methods: {
    ...mapActions("profile", {
      fetchUserProfile: "fetchUserProfile"
    })
  },
  created() {
    this.loading = true;
    this.fetchUserProfile().then(() => (this.loading = false));
    console.log(this.user);
  }
};
</script>
