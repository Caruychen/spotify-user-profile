import axios from "axios";
import router from "@/router";
import store from "@/store";

const backendHTTP = axios.create({ baseURL: "http://localhost:8081/" });
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
    // Return to login if Bad Request
    if (status === 400) {
      router.push({
        name: "Login"
      });
    }
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
