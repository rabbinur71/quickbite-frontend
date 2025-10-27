import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { menuService } from "../services/menuService";
import { specialOrdersService } from "../services/specialOrdersService";
import MenuItemsList from "../components/MenuItemsList";
import MenuItemForm from "../components/MenuItemForm";
import SpecialOrdersList from "../components/SpecialOrdersList";
import SpecialOrderForm from "../components/SpecialOrderForm";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [specialOrders, setSpecialOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialOrdersLoading, setSpecialOrdersLoading] = useState(true);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showSpecialOrderForm, setShowSpecialOrderForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("menu");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setSpecialOrdersLoading(true);
      const [menuData, specialData] = await Promise.all([
        menuService.getMenuItems(),
        specialOrdersService.getAllSpecialOrders(),
      ]);
      setMenuItems(menuData);
      setSpecialOrders(specialData);
    } catch (error) {
      setError("Failed to load data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setSpecialOrdersLoading(false);
    }
  };

  // MENU HANDLERS
  const handleCreateMenuItem = async (formData) => {
    try {
      await menuService.createMenuItem(formData);
      setShowMenuForm(false);
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateMenuItem = async (formData) => {
    try {
      await menuService.updateMenuItem(editingItem.id, formData);
      setShowMenuForm(false);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await menuService.deleteMenuItem(id);
        fetchData();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleEditMenuItem = (item) => {
    setEditingItem(item);
    setShowMenuForm(true);
  };

  const handleMenuFormSubmit = (formData) =>
    editingItem
      ? handleUpdateMenuItem(formData)
      : handleCreateMenuItem(formData);

  const handleMenuFormClose = () => {
    setShowMenuForm(false);
    setEditingItem(null);
  };

  // SPECIAL ORDER HANDLERS
  const handleCreateSpecialOrder = async (formData) => {
    try {
      await specialOrdersService.createSpecialOrder(formData);
      setShowSpecialOrderForm(false);
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateSpecialOrder = async (formData) => {
    try {
      await specialOrdersService.updateSpecialOrder(editingOrder.id, formData);
      setShowSpecialOrderForm(false);
      setEditingOrder(null);
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteSpecialOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this special order?")) {
      try {
        await specialOrdersService.deleteSpecialOrder(id);
        fetchData();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleEditSpecialOrder = (order) => {
    setEditingOrder(order);
    setShowSpecialOrderForm(true);
  };

  const handleSpecialOrderFormSubmit = (formData) =>
    editingOrder
      ? handleUpdateSpecialOrder(formData)
      : handleCreateSpecialOrder(formData);

  const handleSpecialOrderFormClose = () => {
    setShowSpecialOrderForm(false);
    setEditingOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            QuickBite Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">
              Welcome, <span className="font-medium">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab("menu")}
            className={`px-5 py-3 text-sm font-medium transition border-b-2 ${
              activeTab === "menu"
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-600 hover:text-blue-600"
            }`}
          >
            Today's Menu
          </button>
          <button
            onClick={() => setActiveTab("special")}
            className={`px-5 py-3 text-sm font-medium transition border-b-2 ${
              activeTab === "special"
                ? "border-green-600 text-green-600 bg-green-50"
                : "border-transparent text-gray-600 hover:text-green-600"
            }`}
          >
            Special Orders
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {/* MENU SECTION */}
        {activeTab === "menu" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Manage Today’s Menu
              </h2>
              <button
                onClick={() => setShowMenuForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
              >
                + Add New Item
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white shadow-sm rounded-lg p-6 border-l-4 border-blue-500">
                <p className="text-gray-500 text-sm">Total Items</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {menuItems.length}
                </h3>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-6 border-l-4 border-green-500">
                <p className="text-gray-500 text-sm">Available</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {menuItems.filter((item) => item.is_available).length}
                </h3>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-6 border-l-4 border-purple-500">
                <p className="text-gray-500 text-sm">Categories</p>
                <h3 className="text-3xl font-bold text-gray-800">3</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Menu Items
              </h3>
              <MenuItemsList
                items={menuItems}
                onEdit={handleEditMenuItem}
                onDelete={handleDeleteMenuItem}
                loading={loading}
              />
            </div>
          </section>
        )}

        {/* SPECIAL ORDERS SECTION */}
        {activeTab === "special" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Manage Special Orders
              </h2>
              <button
                onClick={() => setShowSpecialOrderForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
              >
                + Add New Package
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white shadow-sm rounded-lg p-6 border-l-4 border-green-500">
                <p className="text-gray-500 text-sm">Total Packages</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {specialOrders.length}
                </h3>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-6 border-l-4 border-blue-500">
                <p className="text-gray-500 text-sm">Available</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {specialOrders.filter((order) => order.is_available).length}
                </h3>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-6 border-l-4 border-purple-500">
                <p className="text-gray-500 text-sm">Avg. Price</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  ৳
                  {specialOrders.length > 0
                    ? (
                        specialOrders.reduce(
                          (sum, order) =>
                            sum + parseFloat(order.price_per_person),
                          0
                        ) / specialOrders.length
                      ).toFixed(2)
                    : "0.00"}
                </h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Special Order Packages
              </h3>
              <SpecialOrdersList
                orders={specialOrders}
                onEdit={handleEditSpecialOrder}
                onDelete={handleDeleteSpecialOrder}
                loading={specialOrdersLoading}
              />
            </div>
          </section>
        )}
      </main>

      {/* Modals */}
      <MenuItemForm
        item={editingItem}
        onSubmit={handleMenuFormSubmit}
        onCancel={handleMenuFormClose}
        isOpen={showMenuForm}
      />

      <SpecialOrderForm
        order={editingOrder}
        onSubmit={handleSpecialOrderFormSubmit}
        onCancel={handleSpecialOrderFormClose}
        isOpen={showSpecialOrderForm}
      />
    </div>
  );
};

export default AdminDashboard;
