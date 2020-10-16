import Vue from "vue";

Vue.filter("capitalize", text => {
  if (!text) return "";
  text = text.toString();
  return text.charAt(0).toUpperCase() + text.slice(1);
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
