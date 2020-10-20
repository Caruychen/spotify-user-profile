<template>
  <div class="slider-container">
    <input
      type="range"
      min="0"
      :max="nowPlaying.item.duration"
      class="slider-range"
      :style="progressStyle"
      v-model="progress"
      @mousedown="switchIsFetchPaused"
      @mouseup="
        seekPosition(currentProgress);
        switchIsFetchPaused();
      "
      @mouseover="fillColor = '#48ada3'"
      @mouseout="fillColor = '#9c9795'"
    />
    <p>{{ progress | msToMinutes }}</p>
    <p>
      -
      {{ (nowPlaying.item.duration - progress) | msToMinutes }}
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      currentProgress: 0,
      fillColor: "#9c9795"
    };
  },
  computed: {
    ...mapState("player", {
      isFetchPaused: state => state.isFetchPaused
    }),
    ...mapGetters("player", {
      nowPlaying: "currentDevicePlayback"
    }),
    fillPercentage: function() {
      return 100 * (this.progress / this.nowPlaying.item.duration);
    },
    progress: {
      get: function() {
        if (this.isFetchPaused === false) {
          return this.nowPlaying.progress;
        }
        return this.currentProgress;
      },
      set: function(newValue) {
        this.currentProgress = newValue;
      }
    },
    progressStyle: function() {
      return `background:linear-gradient(to right, ${this.fillColor} 0 ${this.fillPercentage}%, #302d3b ${this.fillPercentage}% 100%)`;
    }
  },
  methods: {
    ...mapActions("player", {
      seekPosition: "seekPosition"
    }),
    ...mapMutations("player", {
      switchIsFetchPaused: "switchIsFetchPaused"
    })
  }
};
</script>
