import axios from "axios";

const getApiBaseUrl = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000/api";
  } else {
    //  production fallback + allow override via env var
    return (
      import.meta.env.VITE_API_URL ||
      "https://quickbite-backend-6d7i.onrender.com/api"
    );
  }
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("quickbite_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
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
