// frontend/src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setItems([]);
      setWishlistIds(new Set());
      return;
    }

    try {
      setLoading(true);
      const res = await wishlistService.getWishlist();
      if (res.data.success) {
        setItems(res.data.items);
        setWishlistIds(new Set(res.data.items.map((it) => it.product_id)));
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const toggleWishlist = async (productId) => {
    if (!isAuthenticated) {
      throw new Error('AUTH_REQUIRED');
    }

    const isSaved = wishlistIds.has(productId);
    try {
      if (isSaved) {
        await wishlistService.removeFromWishlist(productId);
        setWishlistIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
        setItems((prev) => prev.filter((it) => it.product_id !== productId));
      } else {
        await wishlistService.addToWishlist(productId);
        setWishlistIds((prev) => new Set([...prev, productId]));
        await fetchWishlist();
      }
    } catch (error) {
      throw error;
    }
  };

  const isInWishlist = (productId) => wishlistIds.has(productId);

  return (
    <WishlistContext.Provider
      value={{
        items,
        wishlistCount: items.length,
        loading,
        isInWishlist,
        toggleWishlist,
        fetchWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
