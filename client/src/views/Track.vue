<template>
  <div v-if="loading" class="loading-container">
    <b-spinner label="Spinning"></b-spinner>
  </div>
  <div v-else id="track">
    <h1>Track detail</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>
