const MenuItemsList = ({ items, onEdit, onDelete, loading }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case "breakfast":
        return "bg-yellow-100 text-yellow-800";
      case "lunch":
        return "bg-green-100 text-green-800";
      case "dinner":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No menu items found.</p>
        <p className="text-sm text-gray-400">
          Add your first menu item to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
        >
          {/* Image Section */}
          {item.image_urls && item.image_urls.length > 0 ? (
            <div className="h-48 overflow-hidden">
              <img
                src={item.image_urls[0]}
                alt={item.name}
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
                {item.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                  item.category
                )}`}
              >
                {item.category}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">
                ৳{parseFloat(item.price).toFixed(2)}
              </span>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm ${
                    item.is_available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.is_available ? "Available" : "Unavailable"}
                </span>
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
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

export default MenuItemsList;
