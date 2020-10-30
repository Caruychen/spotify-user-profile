<template>
  <b-card no-body class="overflow-hidden list-item-container">
    <b-row no-gutters>
      <b-col cols="auto" class="detail-link">
        <router-link to="/tracks">
          <b-card-img
            class="image-column rounded-0"
            :src="item.image[item.image.length - 1].url"
            :alt="item.name"
          ></b-card-img>
          <b-icon-info-square-fill></b-icon-info-square-fill>
        </router-link>
      </b-col>
      <b-col>
        <b-card-body>
          <b-card-title
            ref="title"
            :style="transitionStyle(title)"
            @mouseenter="mouseTrigger('title')"
            @mouseleave="mouseTrigger('title')"
            ><span>{{ item.name }}</span></b-card-title
          >
          <b-card-text
            ref="text"
            v-if="isTrack"
            :style="transitionStyle(text)"
            @mouseenter="mouseTrigger('text')"
            @mouseleave="mouseTrigger('text')"
          >
            <span v-for="(artist, index) in item.artists" :key="index">
              <a :href="artist.external_urls.spotify" target="_blank">{{
                artist.name
              }}</a
              >{{ artist.name | insertComma(index, item.artists.length) }}
            </span>
            <span>
              · <a :href="item.album.spotifyUrl">{{ item.album.name }}</a></span
            >
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col v-if="isTrack" cols="auto" class="item-duration">
        {{ item.duration | msToMinutes }}
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      text: {
        containerWidth: null,
        contentWidth: null,
        isHover: false
      },
      title: {
        containerWidth: null,
        contentWidth: null,
        isHover: false
      }
    };
  },
  props: {
    item: Object,
    isTrack: Boolean,
    isSubColumn: Boolean
  },
  methods: {
    mouseTrigger: function(element) {
      this[element].isHover = !this[element].isHover;
    },
    reduceContentWidth: function(collection) {
      return Array.from(collection)
        .map(item => {
          return item.offsetWidth;
        })
        .reduce((acc, cur) => acc + cur);
    },
    loadWidths: function(element) {
      const htmlElement = this.$refs[element];
      this[element].containerWidth = htmlElement.offsetWidth;
      this[element].contentWidth = this.reduceContentWidth(
        htmlElement.children
      );
    },
    transitionStyle: function(element) {
      const { containerWidth, contentWidth, isHover } = element;
      const offset = Math.min(0, containerWidth - contentWidth);
      const duration = -offset / 60;
      return isHover
        ? `transform: translateX(${offset}px); transition: ${duration}s cubic-bezier(.14,.13,.47,1)`
        : `transition: ${duration / 2}s cubic-bezier(.14,.13,.47,1);`;
    }
  },
  mounted() {
    if (this.isTrack) {
      this.loadWidths("text");
      this.loadWidths("title");
    }
  }
};
</script>
