import axios from "axios";
import router from "@/router";
import store from "@/store";

const backendHTTP = axios.create({ baseURL: "http://localhost:8081/" });
const spotifyHTTP = axios.create({ baseURL: "https://api.spotify.com/v1/me/" });

spotifyHTTP.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.access_token;

spotifyHTTP.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const status = error.response.status;
    const originalConfig = error.config;
    // Capture authentication error - return to login
    if (status === 400) {
      router.push({
        name: "Login"
      });
    }
    // Uses refresh token if access token invalid or expired
    if (status === 401) {
      const refreshStatus = await store.dispatch("auth/refreshCall");
      if (refreshStatus === 200) {
        spotifyHTTP.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.access_token;
        originalConfig.headers.Authorization =
          "Bearer " + localStorage.access_token;
        return spotifyHTTP(originalConfig);
      }
    }

    return Promise.reject(error);
  }
);

export { spotifyHTTP, backendHTTP };
