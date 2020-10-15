<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col cols="2" lg="1">
        <b-card-img
          class="image-column rounded-0"
          :src="item.album.image"
          :alt="item.name"
        ></b-card-img>
      </b-col>
      <b-col cols="8" lg="10">
        <b-card-body :title="item.name">
          <b-card-text>
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
      <b-col cols="2" lg="1" class="item-duration">
        {{ item.duration | msToMinutes }}
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    item: Object
  },
  filters: {
    insertComma: function(text, index, length) {
      return index === length - 1 ? "" : ", ";
    },
    msToMinutes: function(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = ((duration % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
  }
};
</script>
