import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { colors } from "../theme/Theme";

const CartSidebar = () => {
  const {
    items,
    isOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    setCartOpen,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  if (!isOpen) return null;

  const handleQuantityChange = (id, type, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id, type);
    } else {
      updateQuantity(id, type, newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={() => setCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md shadow-xl"
        style={{ backgroundColor: colors.bgLight }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className="flex items-center justify-between p-4"
            style={{ borderBottom: `1px solid ${colors.textLight}` }}
          >
            <h2
              className="text-lg font-semibold"
              style={{ color: colors.textDark }}
            >
              Your Cart ({getTotalItems()})
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              style={{ color: colors.textLight }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.textDark)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.textLight)
              }
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p style={{ color: colors.textLight }}>Your cart is empty</p>
                <p className="text-sm mt-2" style={{ color: colors.textLight }}>
                  Add some delicious items from our menu!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg"
                    style={{ backgroundColor: `${colors.bgLight}80` }}
                  >
                    {/* Item Image */}
                    <div
                      className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0"
                      style={{ backgroundColor: colors.textLight + "40" }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-xs"
                          style={{ color: colors.textLight }}
                        >
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-medium truncate"
                        style={{ color: colors.textDark }}
                      >
                        {item.name}
                      </h4>
                      {item.type === "special" && item.people && (
                        <p
                          className="text-sm"
                          style={{ color: colors.textLight }}
                        >
                          {item.people} people
                        </p>
                      )}
                      <p
                        className="text-lg font-semibold"
                        style={{ color: colors.primaryStart }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.type,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          border: `1px solid ${colors.textLight}`,
                          backgroundColor: "transparent",
                          color: colors.textDark,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            colors.bgLight;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        -
                      </button>
                      <span
                        className="w-8 text-center font-medium"
                        style={{ color: colors.textDark }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.type,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          border: `1px solid ${colors.textLight}`,
                          backgroundColor: "transparent",
                          color: colors.textDark,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            colors.bgLight;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.type)}
                      style={{ color: colors.error }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#b91c1c")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = colors.error)
                      }
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div
              className="p-4 space-y-4"
              style={{ borderTop: `1px solid ${colors.textLight}` }}
            >
              {/* Total */}
              <div
                className="flex justify-between items-center text-lg font-semibold"
                style={{ color: colors.textDark }}
              >
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full text-center py-3 px-4 rounded-md font-medium"
                  style={{
                    backgroundColor: colors.primaryStart,
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryEnd;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryStart;
                  }}
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={clearCart}
                  className="block w-full text-center py-2 px-4 rounded-md text-sm font-medium"
                  style={{
                    backgroundColor: colors.bgLight,
                    color: colors.textDark,
                    border: `1px solid ${colors.textLight}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.textLight}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.bgLight;
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
