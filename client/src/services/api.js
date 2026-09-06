import axios from "axios";

// Detect environment and configure production backend fallback
const getBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_API_URL;
  if (rawUrl && typeof rawUrl === "string" && rawUrl.trim()) {
    let url = rawUrl.trim();
    if (!url.endsWith("/api/v1")) {
      url = url.replace(/\/$/, "") + "/api/v1";
    }
    return url;
  }

  // Fallback: in production (e.g. deployed on Vercel), use Render backend
  if (import.meta.env.PROD) {
    return "https://ecommerce-1-d1j4.onrender.com/api/v1";
  }

  return "http://localhost:5000/api/v1";
};

const BASE_URL = getBaseUrl();

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60s to account for Render free-tier cold starts
});

// ======================
// REQUEST INTERCEPTOR
// ======================

API.interceptors.request.use(
  (config) => {
    try {
      const userData = localStorage.getItem("chunchun_user");

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
      localStorage.removeItem("chunchun_user");

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
