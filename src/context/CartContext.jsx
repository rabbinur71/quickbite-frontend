import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

// Cart item structure
// { id, name, price, quantity, type: 'menu' | 'special', people?: number (for special orders) }

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.type === action.payload.type
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        return { ...state, items: [...state.items, action.payload] };
      }
    }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id && item.type === action.payload.type
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0), // Remove if quantity is 0
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.type === action.payload.type
            )
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "SET_CART_OPEN":
      return { ...state, isOpen: action.payload };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  isOpen: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load cart from localStorage on initial load
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("quickbite_cart");
      return savedCart ? JSON.parse(savedCart) : initialState;
    }
    return initialState;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quickbite_cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const updateQuantity = (id, type, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, type, quantity } });
  };

  const removeFromCart = (id, type) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id, type } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const setCartOpen = (isOpen) => {
    dispatch({ type: "SET_CART_OPEN", payload: isOpen });
  };

  // Calculate total price
  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // Calculate total items count
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items: state.items,
    isOpen: state.isOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleCart,
    setCartOpen,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
