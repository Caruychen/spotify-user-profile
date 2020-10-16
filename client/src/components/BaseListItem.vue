<template>
  <b-card no-body class="overflow-hidden list-item-container">
    <b-row no-gutters>
      <b-col cols="2" :md="cols.outer">
        <b-card-img
          class="image-column rounded-0"
          :src="item.image[item.image.length - 1].url"
          :alt="item.name"
        ></b-card-img>
      </b-col>
      <b-col cols="8" :md="cols.body">
        <b-card-body :title="item.name">
          <b-card-text v-if="isTrack">
            <span v-for="(artist, index) in item.artists" :key="index">
              <a :href="artist.external_urls.spotify" target="_blank">{{
                artist.name
              }}</a
              >{{ artist.name | insertComma(index, item.artists.length) }}
            </span>
            ·
            <a :href="item.album.spotifyUrl">{{ item.album.name }}</a>
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col v-if="isTrack" cols="2" :md="cols.outer" class="item-duration">
        {{ item.duration | msToMinutes }}
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    item: Object,
    isTrack: Boolean,
    isSubColumn: Boolean
  },
  computed: {
    cols: function() {
      const total = 12;
      const outer = this.isSubColumn ? 2 : 1;
      return {
        outer,
        body: this.isTrack ? total - 2 * outer : total - outer
      };
    }
  }
};
</script>
