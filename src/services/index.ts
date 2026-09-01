import axios from "axios";

const baseURL = "https://payload-cms-poc-seven.vercel.app/api/content/v1/";

export const api = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const errorResponse = error.response?.data;

    if (errorResponse && typeof errorResponse === "object") {
      const structuredError = {
        error: errorResponse.error || "Error desconocido",
        errors: errorResponse.errors || [],
      };

      error.response.data = structuredError;
    }

    return Promise.reject(error);
  },
);
