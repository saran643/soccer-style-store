// frontend/src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    subtotal: 0,
    shippingFee: 0,
    freeShippingThreshold: 70,
    amountUntilFreeShipping: 70,
    totalAmount: 0
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart({
        items: [],
        totalItems: 0,
        subtotal: 0,
        shippingFee: 0,
        freeShippingThreshold: 70,
        amountUntilFreeShipping: 70,
        totalAmount: 0
      });
      return;
    }

    try {
      setLoading(true);
      const res = await cartService.getCart();
      if (res.data.success) {
        setCart(res.data.cart);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (variantId, quantity = 1) => {
    if (!isAuthenticated) {
      throw new Error('AUTH_REQUIRED');
    }

    try {
      const res = await cartService.addToCart(variantId, quantity);
      await fetchCart();
      setIsDrawerOpen(true);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await cartService.updateQuantity(cartItemId, quantity);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await cartService.removeItem(cartItemId);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.totalItems,
        isDrawerOpen,
        setIsDrawerOpen,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
