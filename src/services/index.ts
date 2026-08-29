// api/axios.ts

import axios from "axios";
// import { useAuthStore } from "@/stores/auth.store";

const baseURL = "";

export const api = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // const { accessToken } = useAuthStore.getState();

    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      // useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  },
);