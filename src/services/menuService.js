import { api } from "./api";

export const menuService = {
  // Get all menu items (admin)
  async getMenuItems() {
    try {
      const response = await api.get("/menu-items");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch menu items"
      );
    }
  },

  // Get available menu items (public)
  async getAvailableMenuItems() {
    try {
      const response = await api.get("/menu-items/available");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch menu items"
      );
    }
  },

  // Create menu item (updated for file upload)
  async createMenuItem(formData) {
    try {
      const response = await api.post("/menu-items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to create menu item"
      );
    }
  },

  // Update menu item
  async updateMenuItem(id, menuData) {
    try {
      const response = await api.put(`/menu-items/${id}`, menuData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to update menu item"
      );
    }
  },

  // Delete menu item
  async deleteMenuItem(id) {
    try {
      const response = await api.delete(`/menu-items/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to delete menu item"
      );
    }
  },
};
