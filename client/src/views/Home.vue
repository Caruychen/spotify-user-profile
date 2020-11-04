<template>
  <div class="home">
    <TheNavigation />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavigation from "@/components/TheNavigation.vue";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    TheNavigation
  },
  methods: {
    ...mapMutations({
      setWindowWidth: "setWindowWidth"
    })
  },
  created() {
    window.addEventListener("resize", this.setWindowWidth);
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
