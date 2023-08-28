import React, { createContext, useContext, useReducer } from "react";

// Define the initial state and reducer function
const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_CART_ITEM_QUANTITY":
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    default:
      return state;
  }
};

// Create the context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCart = () => {
  return useContext(CartContext);
};
