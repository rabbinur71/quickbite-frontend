import { useState } from "react";
import { useCart } from "../context/CartContext";
import MenuItemDetail from "./MenuItemDetail";
import { colors, buttonStyles } from "../theme/Theme";

const MenuSection = ({ menuItems }) => {
  const { addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleQuickAdd = (item, event) => {
    event.stopPropagation(); // Prevent opening detail modal
    addToCart({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: 1,
      type: "menu",
      image: item.image_urls?.[0],
    });
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  const handleAddToCartFromModal = () => {
    // This will be called when item is added from modal
    // We can add any success feedback here if needed
  };

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const getCategoryTitle = (category) => {
    switch (category) {
      case "breakfast":
        return "Breakfast";
      case "lunch":
        return "Lunch";
      case "dinner":
        return "Dinner";
      default:
        return category;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "breakfast":
        return "🌅";
      case "lunch":
        return "🍽️";
      case "dinner":
        return "🌙";
      default:
        return "🍕";
    }
  };

  return (
    <section className="mb-12">
      <h2
        className="text-3xl font-bold mb-8"
        style={{ color: colors.textDark }}
      >
        Today's Menu
      </h2>

      {Object.keys(groupedItems).length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg" style={{ color: colors.textLight }}>
            No menu items available today.
          </p>
          <p style={{ color: colors.textLight }}>Please check back later!</p>
        </div>
      ) : (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h3
              className="text-2xl font-semibold mb-4 flex items-center"
              style={{ color: colors.textDark }}
            >
              <span className="mr-2 text-2xl">{getCategoryIcon(category)}</span>
              {getCategoryTitle(category)}
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                  style={{
                    backgroundColor: colors.bgLight,
                    borderColor: colors.textLight,
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  {/* Image */}
                  {item.image_urls && item.image_urls.length > 0 ? (
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={item.image_urls[0]}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        disabled={!item.is_available}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: `${colors.bgLight}cc`,
                        }}
                        title="Quick Add to Cart"
                      >
                        <span
                          className="text-lg"
                          style={{ color: colors.textDark }}
                        >
                          +
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div
                      className="h-48 flex items-center justify-center relative"
                      style={{ backgroundColor: colors.bgLight }}
                    >
                      <span style={{ color: colors.textLight }}>No Image</span>
                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        disabled={!item.is_available}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: `${colors.bgLight}cc`,
                        }}
                        title="Quick Add to Cart"
                      >
                        <span
                          className="text-lg"
                          style={{ color: colors.textDark }}
                        >
                          +
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4
                        className="font-semibold text-lg"
                        style={{ color: colors.textDark }}
                      >
                        {item.name}
                      </h4>
                      <span
                        className="text-lg font-bold"
                        style={{ color: colors.accent }}
                      >
                        ৳{parseFloat(item.price).toFixed(2)}
                      </span>
                    </div>

                    <p
                      className="text-sm mb-4 line-clamp-2"
                      style={{ color: colors.textLight }}
                    >
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span
                        className="text-sm"
                        style={{
                          color: item.is_available
                            ? colors.success
                            : colors.error,
                        }}
                      >
                        {item.is_available ? "Available" : "Unavailable"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                        className="text-sm font-medium flex items-center space-x-1"
                        style={{
                          color: colors.accent,
                        }}
                      >
                        <span>View Details</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Menu Item Detail Modal */}
      <MenuItemDetail
        item={selectedItem}
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCartFromModal}
      />
    </section>
  );
};

export default MenuSection;
