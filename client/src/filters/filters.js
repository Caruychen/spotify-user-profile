import Vue from "vue";

Vue.filter("capitalize", text => {
  if (!text) return "";
  text = text.toString();
  return text.charAt(0).toUpperCase() + text.slice(1);
});
