const SpecialOrdersList = ({ orders, onEdit, onDelete, loading }) => {
  const getAvailabilityColor = (isAvailable) => {
    return isAvailable ? "text-green-600" : "text-red-600";
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No special order packages found.</p>
        <p className="text-sm text-gray-400">
          Add your first special order package to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
        >
          {/* Image Section */}
          {order.image_urls && order.image_urls.length > 0 ? (
            <div className="h-48 overflow-hidden">
              <img
                src={order.image_urls[0]}
                alt={order.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          {/* Content Section */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {order.name}
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {order.description}
            </p>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per person:</span>
                <span className="font-semibold text-green-600">
                  ৳{parseFloat(order.price_per_person).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Minimum people:</span>
                <span className="font-semibold text-gray-800">
                  {order.min_people}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`text-sm ${getAvailabilityColor(
                  order.is_available
                )}`}
              >
                {order.is_available ? "Available" : "Unavailable"}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(order)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(order.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecialOrdersList;
