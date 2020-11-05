import axios from "axios";
import store from "@/store";

const backendHTTP = axios.create({
  baseURL: process.env.NODE_ENV !== "production"
    ? "http://localhost:8081/"
    : "https://audio-viber.herokuapp.com/"
});
const spotifyHTTP = axios.create({ baseURL: "https://api.spotify.com/v1/" });

spotifyHTTP.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access_token");

spotifyHTTP.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const status = error.response ? error.response.status : null;
    const originalConfig = error.config;

    // Uses refresh token when access code is unauthorized
    if (status === 401) {
      const refreshStatus = await store.dispatch("auth/tokenRefresh");
      if (refreshStatus) {
        originalConfig.headers.Authorization =
          "Bearer " + localStorage.getItem("access_token");
        return spotifyHTTP(originalConfig);
      }
    }

    return Promise.reject(error);
  }
);

export { spotifyHTTP, backendHTTP };
