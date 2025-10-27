import { api } from "./api";

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem("quickbite_token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      localStorage.removeItem("quickbite_token");
      throw new Error(error.response?.data?.error || "Failed to get user data");
    }
  },

  getToken() {
    return localStorage.getItem("quickbite_token");
  },

  logout() {
    localStorage.removeItem("quickbite_token");
  },
};

// Add request interceptor to include token in all requests
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      authService.logout();
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);
