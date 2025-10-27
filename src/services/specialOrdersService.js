import { api } from "./api";

export const specialOrdersService = {
  // Get all special orders (public)
  async getSpecialOrders() {
    try {
      const response = await api.get("/special-orders");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch special orders"
      );
    }
  },

  // Get all special orders (admin - including unavailable)
  async getAllSpecialOrders() {
    try {
      const response = await api.get("/special-orders/admin");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch special orders"
      );
    }
  },

  // Create special order
  async createSpecialOrder(formData) {
    try {
      const response = await api.post("/special-orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to create special order"
      );
    }
  },

  // Update special order
  async updateSpecialOrder(id, orderData) {
    try {
      const response = await api.put(`/special-orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to update special order"
      );
    }
  },

  // Delete special order
  async deleteSpecialOrder(id) {
    try {
      const response = await api.delete(`/special-orders/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to delete special order"
      );
    }
  },
};
