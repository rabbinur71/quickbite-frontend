import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import AddressForm from "../components/AddressForm";
import { colors } from "../theme/Theme";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/");
    return null;
  }

  const handleOrderConfirm = async (addressData) => {
    try {
      setIsSubmitting(true);
      setError("");

      // Generate WhatsApp message
      const message = generateWhatsAppMessage(
        items,
        getTotalPrice(),
        addressData
      );

      // Restaurant's WhatsApp number
      const whatsappNumber = "+8801323376571";

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Clear cart
      clearCart();

      // Redirect to WhatsApp
      window.location.href = whatsappUrl;
    } catch (error) {
      setError("Failed to process order. Please try again.");
      console.error("Order confirmation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = (cartItems, totalPrice, address) => {
    let message = "Hello! I would like to order these foods:\n\n";

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      if (item.type === "special") {
        message += `${index + 1}. ${item.name} (for ${
          item.people
        } people) - $${itemTotal.toFixed(2)}\n`;
      } else {
        message += `${index + 1}. ${item.name} x${
          item.quantity
        } - $${itemTotal.toFixed(2)}\n`;
      }
    });

    message += `\nTotal: $${totalPrice.toFixed(2)}\n\n`;
    message += `My delivery address is:\n`;
    message += `${address.street}\n`;
    message += `${address.city}, ${address.state} ${address.zipCode}\n`;

    if (address.apartment) {
      message += `Apartment: ${address.apartment}\n`;
    }

    if (address.instructions) {
      message += `Delivery Instructions: ${address.instructions}\n`;
    }

    message += `\nPlease confirm my order. Thank you!`;

    return message;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bgLight }}>
      {/* Header */}
      <header
        className="border-b sticky top-0 z-40"
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                style={{
                  color: colors.textLight,
                  marginRight: "1rem",
                  fontSize: "0.875rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.textDark)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.textLight)
                }
              >
                ← Back to Menu
              </button>
              <h1
                className="text-2xl font-bold"
                style={{ color: colors.textDark }}
              >
                Checkout
              </h1>
            </div>
            <div className="text-sm" style={{ color: colors.textLight }}>
              Complete your order
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div
            className="border px-4 py-3 rounded-md text-sm mb-6"
            style={{
              backgroundColor: `${colors.error}10`,
              borderColor: `${colors.error}40`,
              color: colors.error,
            }}
          >
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Address Form */}
          <div>
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: colors.textDark }}
            >
              Delivery Information
            </h2>
            <AddressForm
              onSubmit={handleOrderConfirm}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Order Summary */}
          <div>
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: colors.textDark }}
            >
              Order Summary
            </h2>
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
