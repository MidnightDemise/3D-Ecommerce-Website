
'use client'
// CartContext.js
import { createContext, useContext, useEffect, useState } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {


    const [cartProducts, setCartProducts] = useState([]);




    // const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

    // const initialCartProducts = isLocalStorageAvailable
    //     ? JSON.parse(localStorage.getItem('cartProducts')) || []
    //     : [];





    // // Save to localStorage whenever cartProducts changes
    // useEffect(() => {
    //   if (isLocalStorageAvailable) {
    //     localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    //   }
    // }, [cartProducts, isLocalStorageAvailable]);


  const addToCart = (product) => {
    setCartProducts((prevCartProducts) => [...prevCartProducts, product._id]);
  };

  const removeFromCart = (productId) => {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.filter((product) => product._id !== productId)
    );
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
