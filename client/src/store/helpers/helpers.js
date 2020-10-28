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

function splitColors(colorArray, index, arrayLength) {
  const groups = colorArray.length - 1;
  const groupMaxSize = Math.ceil(arrayLength / groups);
  const colorIndex = Math.floor(index / groupMaxSize);
  const upperPortion = index < groupMaxSize ? index : index % (colorIndex * groupMaxSize);
  const lowerPortion = groupMaxSize - upperPortion;
  const lower = [
    parseInt(colorArray[colorIndex].substring(1, 3), 16) * lowerPortion,
    parseInt(colorArray[colorIndex].substring(3, 5), 16) * lowerPortion,
    parseInt(colorArray[colorIndex].substring(5), 16) * lowerPortion
  ]
  const upper = [
    parseInt(colorArray[colorIndex+1].substring(1, 3), 16) * upperPortion,
    parseInt(colorArray[colorIndex+1].substring(3, 5), 16) * upperPortion,
    parseInt(colorArray[colorIndex+1].substring(5), 16) * upperPortion
  ]
  const result = lower.map((item, index) => {
    return Math.round((item + upper[index]) / groupMaxSize).toString(16)
  })
  return `#${result.join("")}`
}

export { filterArtist, filterTrack, filterEpisode, splitColors };
