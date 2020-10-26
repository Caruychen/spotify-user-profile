import Vue from "vue";

Vue.filter("capitalize", (text, index) => {
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
});

Vue.filter("insertComma", (text, index, length) => {
  if (!text) return "";
  text = text.toString();
  return index === length - 1 ? "" : ", ";
});

Vue.filter("msToMinutes", duration => {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
});
