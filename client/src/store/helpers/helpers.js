export default {
  filterItem(item, type) {
    const images = type === "artists" ? item.images : item.album.images;
    return {
      name: item.name,
      external_url: item.external_urls.spotify,
      image: images.length > 0 ? images : require("@/assets/logos/person.svg")
    };
  }
};
