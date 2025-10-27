import { useCart } from "../context/CartContext";

const OrderSummary = () => {
  const { items, getTotalPrice } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="flex justify-between items-start pb-4 border-b border-gray-100"
          >
            <div className="flex-1">
              <div className="flex items-start space-x-3">
                {/* Item Image */}
                <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  {item.type === "special" && item.people && (
                    <p className="text-sm text-gray-600">
                      For {item.people} people
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                    {item.type === "special" && (
                      <span>
                        {" "}
                        × ${item.price_per_person?.toFixed(2)}/person
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total Amount:</span>
          <span className="text-blue-600">${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {/* WhatsApp Info */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-green-600 text-2xl">📱</span>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-green-800">
              Order via WhatsApp
            </h4>
            <p className="text-sm text-green-700 mt-1">
              After confirming your address, you'll be redirected to WhatsApp to
              send your order directly to the restaurant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
