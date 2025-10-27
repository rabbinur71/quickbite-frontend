import axios from "axios";

// Dynamic API base URL for production
const getApiBaseUrl = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000/api";
  } else {
    // Use environment variable or default to your Render backend URL
    return (
      import.meta.env.VITE_API_URL ||
      "https://quickbite-backend.onrender.com/api"
    );
  }
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("quickbite_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("quickbite_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// Health check function
export const healthCheck = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    throw new Error("Backend is not responding");
  }
};
