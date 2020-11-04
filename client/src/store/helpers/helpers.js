function filterArtist(item) {
  const images = item.images;
  return {
    name: item.name,
    external_url: item.external_urls.spotify,
    image: images.length > 0 ? images : require("@/assets/logos/person.svg"),
    type: item.type,
    id: item.id
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
    duration: item.duration_ms,
    type: item.type,
    id: item.id
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

function filterAlbum(item) {
  const images = item.images;
  return {
    name: item.name,
    external_url: item.external_urls.spotify,
    image: images.length > 0 ? images : require("@/assets/logos/person.svg"),
    type: item.type,
    id: item.id
  };
}

function colorInterval(colorRange, index, arrayLength) {
  const groups = colorRange.length - 1;
  const groupMaxSize = Math.ceil(arrayLength / groups);
  const colorIndex = Math.floor(index / groupMaxSize);
  const upperPortion =
    index < groupMaxSize ? index : index % (colorIndex * groupMaxSize);
  const lowerPortion = groupMaxSize - upperPortion;
  const lower = [
    parseInt(colorRange[colorIndex].substring(1, 3), 16) * lowerPortion,
    parseInt(colorRange[colorIndex].substring(3, 5), 16) * lowerPortion,
    parseInt(colorRange[colorIndex].substring(5), 16) * lowerPortion
  ];
  const upper = [
    parseInt(colorRange[colorIndex + 1].substring(1, 3), 16) * upperPortion,
    parseInt(colorRange[colorIndex + 1].substring(3, 5), 16) * upperPortion,
    parseInt(colorRange[colorIndex + 1].substring(5), 16) * upperPortion
  ];
  const result = lower.map((item, index) => {
    return Math.round((item + upper[index]) / groupMaxSize).toString(16);
  });
  return `#${result.join("")}`;
}

function colorArray(colorRange, arrayLength) {
  const array = [];
  for (let i = 0; i < arrayLength; i++) {
    array.push(colorInterval(colorRange, i, arrayLength));
  }
  return array;
}

function capitalize(text, index) {
  if (!text) return "";
  text = text.toString().split(" ");
  if (!index || index >= text.length || index < 0) {
    index = 0;
  }
  text.splice(
    index,
    1,
    text[index].charAt(0).toUpperCase() + text[index].slice(1)
  );
  return text.join(" ");
}

function msToMinutes(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export {
  filterArtist,
  filterTrack,
  filterEpisode,
  filterAlbum,
  colorInterval,
  colorArray,
  capitalize,
  msToMinutes
};
