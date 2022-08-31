import { createContext, useState } from "react";

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
// });

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCarOpen, setIsCartOpen] = useState(false);

  return (
    <CartContext.Provider value={{ isCarOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};
