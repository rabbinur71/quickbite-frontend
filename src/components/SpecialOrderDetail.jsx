import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Users,
  Calendar,
  Star,
  Clock,
  Utensils,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Portal from "./Portal";

const SpecialOrderDetail = ({ order, isOpen, onClose, onAddToCart }) => {
  const [peopleCount, setPeopleCount] = useState(order?.min_people || 1);
  const { addToCart } = useCart();

  if (!isOpen || !order) return null;

  const handlePeopleChange = (newCount) => {
    const minPeople = order.min_people || 1;
    const maxPeople = 50; // Reasonable maximum
    if (newCount >= minPeople && newCount <= maxPeople) {
      setPeopleCount(newCount);
    }
  };

  const calculateTotalPrice = () => {
    return parseFloat(order.price_per_person) * peopleCount;
  };

  const handleAddToCart = () => {
    const totalPrice = calculateTotalPrice();

    addToCart({
      id: order.id,
      name: order.name,
      price: totalPrice,
      quantity: 1,
      type: "special",
      people: peopleCount,
      price_per_person: parseFloat(order.price_per_person),
      image: order.image_urls?.[0],
      description: order.description,
    });

    onAddToCart && onAddToCart();
    onClose();
    setPeopleCount(order.min_people || 1); // Reset for next time
  };

  const getPackageHighlights = () => {
    // Can be customized these based on package type or add to database
    const highlights = {
      "Family Feast Package": [
        "Appetizers & Main Course",
        "Desserts Included",
        "Serves 4-6 People",
        "2 Hours Delivery",
      ],
      "Office Party Package": [
        "Variety of Snacks",
        "Beverages Included",
        "Ideal for Teams",
        "Setup Assistance",
      ],
      "Birthday Celebration": [
        "Custom Cake",
        "Party Decorations",
        "Snacks & Drinks",
        "Celebration Setup",
      ],
      "Romantic Dinner for Two": [
        "Premium Dishes",
        "Elegant Dessert",
        "Candlelight Setup",
        "Special Ambiance",
      ],
    };

    return (
      highlights[order.name] || [
        "Premium Ingredients",
        "Professional Setup",
        "Timely Delivery",
        "Customizable Options",
      ]
    );
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={onClose}
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Image */}
                <div className="relative">
                  {order.image_urls && order.image_urls.length > 0 ? (
                    <img
                      src={order.image_urls[0]}
                      alt={order.name}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center">
                      <Calendar className="w-20 h-20 text-purple-400" />
                    </div>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Special Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      Special Package
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Per Person Price */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {order.name}
                      </h2>
                      <div className="flex items-center space-x-2 text-purple-600">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold">
                          ৳{parseFloat(order.price_per_person).toFixed(2)} per
                          person
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        order.is_available ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        order.is_available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {order.is_available
                        ? "Available for Booking"
                        : "Currently Unavailable"}
                    </span>
                  </div>

                  {/* Description */}
                  {order.description && (
                    <div className="mb-6 p-4 bg-purple-50 rounded-2xl">
                      <p className="text-gray-700 leading-relaxed">
                        {order.description}
                      </p>
                    </div>
                  )}

                  {/* Package Highlights */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Star className="w-5 h-5 text-purple-500 mr-2" />
                      Package Includes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getPackageHighlights().map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-gray-700"
                        >
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* People Selector */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Number of People
                        </h4>
                        <p className="text-sm text-gray-600">
                          Minimum: {order.min_people || 1} person
                          {order.min_people > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handlePeopleChange(peopleCount - 1)}
                          disabled={peopleCount <= (order.min_people || 1)}
                          className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">
                            {peopleCount}
                          </div>
                          <div className="text-xs text-gray-500">people</div>
                        </div>
                        <button
                          onClick={() => handlePeopleChange(peopleCount + 1)}
                          disabled={peopleCount >= 50}
                          className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Quick People Options */}
                    <div className="flex space-x-2">
                      {[order.min_people || 1, 10, 20, 30].map(
                        (count) =>
                          count >= (order.min_people || 1) && (
                            <button
                              key={count}
                              onClick={() => handlePeopleChange(count)}
                              className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors ${
                                peopleCount === count
                                  ? "bg-purple-100 border-purple-500 text-purple-700"
                                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              {count} {count === 1 ? "person" : "people"}
                            </button>
                          )
                      )}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Price per person</span>
                        <span>
                          ৳{parseFloat(order.price_per_person).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Number of people</span>
                        <span>× {peopleCount}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-800">
                            Total Package Price
                          </span>
                          <span className="text-2xl font-bold text-purple-600">
                            ৳{calculateTotalPrice().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Information */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-1">
                          Booking Notice
                        </h4>
                        <p className="text-sm text-yellow-700">
                          For special orders, please book at least 24 hours in
                          advance. Our team will contact you to confirm details
                          and delivery timing.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!order.is_available}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>
                      Book for {peopleCount} People - ৳
                      {calculateTotalPrice().toFixed(2)}
                    </span>
                  </motion.button>

                  {/* Contact Info */}
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Questions?{" "}
                      <button
                        onClick={() =>
                          window.open(`https://wa.me/8801323376571`, "_blank")
                        }
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Contact us via WhatsApp
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default SpecialOrderDetail;
