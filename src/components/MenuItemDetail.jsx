import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Star, Clock, Utensils } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Portal from "./Portal";

const MenuItemDetail = ({ item, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: quantity,
      type: "menu",
      image: item.image_urls?.[0],
      description: item.description,
    });
    onAddToCart && onAddToCart();
    onClose();
    setQuantity(1); // Reset quantity for next time
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
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

  const getCategoryName = (category) => {
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
                className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Image */}
                <div className="relative">
                  {item.image_urls && item.image_urls.length > 0 ? (
                    <img
                      src={item.image_urls[0]}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                      <Utensils className="w-16 h-16 text-amber-400" />
                    </div>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
                    <span className="text-sm">
                      {getCategoryIcon(item.category)}
                    </span>
                    <span className="text-xs font-medium text-gray-700">
                      {getCategoryName(item.category)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Price */}
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-gray-800 pr-2">
                      {item.name}
                    </h2>
                    <div className="text-2xl font-bold text-amber-600 whitespace-nowrap">
                      ৳{parseFloat(item.price).toFixed(2)}
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.is_available ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        item.is_available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.is_available
                        ? "Available"
                        : "Currently Unavailable"}
                    </span>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <div className="mb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">
                        Quantity
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-bold text-lg text-gray-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= 10}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-gray-700">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-amber-600">
                      ৳{(parseFloat(item.price) * quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!item.is_available}
                    className="w-full bg-amber-500 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span>
                      Add {quantity} to Cart - ৳
                      {(parseFloat(item.price) * quantity).toFixed(2)}
                    </span>
                  </motion.button>

                  {/* Quick Add Options */}
                  <div className="flex space-x-2 mt-3">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleQuantityChange(num)}
                        className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors ${
                          quantity === num
                            ? "bg-amber-100 border-amber-500 text-amber-700"
                            : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {num} {num === 1 ? "item" : "items"}
                      </button>
                    ))}
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

export default MenuItemDetail;
