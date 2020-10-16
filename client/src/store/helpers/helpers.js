function filterArtist(item) {
  const images = item.images;
  return {
    name: item.name,
    external_url: item.external_urls.spotify,
    image: images.length > 0 ? images : require("@/assets/logos/person.svg")
  };
}

function filterTrack(item) {
  const images = item.album.images;
  return {
    name: item.name,
    external_url: item.external_urls.spotify,
    artists: item.artists,
    image: images.length > 0 ? images : require("@/assets/logos/person.svg"),
    album: {
      name: item.album.name,
      spotifyUrl: item.album.external_urls.spotify
    },
    duration: item.duration_ms
  };
}

function filterEpisode(item) {
  const externalUrls = Object.keys(item.external_urls);
  return {
    name: item.name,
    external_url: item.external_urls[externalUrls[0]],
    image:
      item.images.length > 0
        ? item.images
        : require("@/assets/logos/person.svg"),
    duration: item.duration_ms
  };
}

export { filterArtist, filterTrack, filterEpisode };
