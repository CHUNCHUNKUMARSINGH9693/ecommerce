import axios from "axios";

// Detect environment
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ======================
// REQUEST INTERCEPTOR
// ======================

API.interceptors.request.use(
  (config) => {
    try {
      const userData = localStorage.getItem("utkarsh_user");

      if (userData) {
        const user = JSON.parse(userData);

        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Invalid user data in localStorage");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ======================
// RESPONSE INTERCEPTOR
// ======================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    // SERVER NOT REACHABLE
    if (!error.response) {
      console.error(
        "Backend server is unreachable. Make sure backend is running."
      );

      console.error("Current API URL:", BASE_URL);
    }

    // UNAUTHORIZED
    else if (error.response.status === 401) {
      console.error("Session expired. Please login again.");

      // Optional auto logout
      localStorage.removeItem("utkarsh_user");

      // Optional redirect
      // window.location.href = "/login";
    }

    // INTERNAL SERVER ERROR
    else if (error.response.status === 500) {
      console.error("Internal server error.");
    }

    // OTHER ERRORS
    else {
      console.error(
        error.response.data?.message || "Something went wrong"
      );
    }

    return Promise.reject(error);
  }
);

export default API;