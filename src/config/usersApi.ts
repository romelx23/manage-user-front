// config axios instance for user api
import axios from "axios";

const usersApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add request interceptor to include token
usersApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-token"); // Get token from local storage
    // Check if token exists
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    // Handle request errors if needed
    return Promise.reject(error);
  }
);

// Export the configured Axios instance
export { usersApi };
