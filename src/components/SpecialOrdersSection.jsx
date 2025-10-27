import { useState } from "react";
import { useCart } from "../context/CartContext";
import SpecialOrderDetail from "./SpecialOrderDetail";
import { colors } from "../theme/Theme";

const SpecialOrdersSection = ({ specialOrders }) => {
  const { addToCart } = useCart();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [peopleCounts, setPeopleCounts] = useState({});

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleQuickAdd = (order, event) => {
    event.stopPropagation();
    const people = peopleCounts[order.id] || order.min_people || 1;
    const totalPrice = parseFloat(order.price_per_person) * people;

    addToCart({
      id: order.id,
      name: order.name,
      price: totalPrice,
      quantity: 1,
      type: "special",
      people: people,
      price_per_person: parseFloat(order.price_per_person),
      image: order.image_urls?.[0],
    });
  };

  const handlePeopleChange = (orderId, count) => {
    setPeopleCounts((prev) => ({
      ...prev,
      [orderId]: Math.max(orderId.min_people || 1, count),
    }));
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  const handleAddToCartFromModal = () => {
    // Success feedback can be added here
  };

  if (specialOrders.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2
        className="text-3xl font-bold mb-8"
        style={{ color: colors.textDark }}
      >
        Special Event Packages
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {specialOrders.map((order) => {
          const people = peopleCounts[order.id] || order.min_people || 1;
          const totalPrice = parseFloat(order.price_per_person) * people;

          return (
            <div
              key={order.id}
              className="rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
              style={{
                backgroundColor: colors.bgLight,
                borderColor: colors.textLight,
              }}
              onClick={() => handleOrderClick(order)}
            >
              {/* Image */}
              {order.image_urls && order.image_urls.length > 0 ? (
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={order.image_urls[0]}
                    alt={order.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => handleQuickAdd(order, e)}
                    disabled={!order.is_available}
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

                  {/* Special Badge */}
                  <div
                    className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-lg"
                    style={{
                      background: `linear-gradient(to right, ${colors.specialStart}, ${colors.specialEnd})`,
                      color: "white",
                    }}
                  >
                    Special
                  </div>
                </div>
              ) : (
                <div
                  className="h-48 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(to bottom right, ${colors.specialStart}20, ${colors.specialEnd}20)`,
                  }}
                >
                  <span
                    className="text-lg"
                    style={{ color: colors.specialStart }}
                  >
                    Special Package
                  </span>
                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => handleQuickAdd(order, e)}
                    disabled={!order.is_available}
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
                    {order.name}
                  </h4>
                  <div className="text-right">
                    <div
                      className="text-lg font-bold"
                      style={{ color: colors.specialText }}
                    >
                      ৳{totalPrice.toFixed(2)}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: colors.textLight }}
                    >
                      ৳{parseFloat(order.price_per_person).toFixed(2)} per
                      person
                    </div>
                  </div>
                </div>

                <p
                  className="text-sm mb-4 line-clamp-2"
                  style={{ color: colors.textLight }}
                >
                  {order.description}
                </p>

                {/* Quick People Selector */}
                <div className="flex items-center justify-between mb-4">
                  <label
                    className="text-sm font-medium"
                    style={{ color: colors.textDark }}
                  >
                    For how many people?
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePeopleChange(order.id, people - 1);
                      }}
                      disabled={people <= (order.min_people || 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        border: `1px solid ${colors.textLight}`,
                        backgroundColor: "transparent",
                        color: colors.textDark,
                      }}
                      onMouseEnter={(e) => {
                        if (!e.currentTarget.disabled) {
                          e.currentTarget.style.backgroundColor =
                            colors.bgLight;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      -
                    </button>
                    <span
                      className="w-8 text-center font-medium text-sm"
                      style={{ color: colors.textDark }}
                    >
                      {people}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePeopleChange(order.id, people + 1);
                      }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                      style={{
                        border: `1px solid ${colors.textLight}`,
                        backgroundColor: "transparent",
                        color: colors.textDark,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.bgLight;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className="text-sm"
                    style={{
                      color: order.is_available ? colors.success : colors.error,
                    }}
                  >
                    {order.is_available ? "Available" : "Unavailable"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderClick(order);
                    }}
                    className="text-sm font-medium flex items-center space-x-1"
                    style={{
                      color: colors.specialText,
                    }}
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Order Detail Modal */}
      <SpecialOrderDetail
        order={selectedOrder}
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCartFromModal}
      />
    </section>
  );
};

export default SpecialOrdersSection;
