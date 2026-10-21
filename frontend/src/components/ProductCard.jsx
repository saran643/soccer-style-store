// frontend/src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const isSaved = isInWishlist(product.id);
  const price = parseFloat(product.price);
  const originalPrice = product.original_price ? parseFloat(product.original_price) : null;
  const hasDiscount = product.discount_percent > 0;

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await toggleWishlist(product.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/shop/${product.slug || product.id}`);
  };

  return (
    <div
      className="card-surface"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Badges container */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {hasDiscount && (
          <span className="badge badge-burgundy">
            -{product.discount_percent}% OFF
          </span>
        )}
        {product.is_bestseller === 1 && (
          <span className="badge badge-gold">
            BESTSELLER
          </span>
        )}
        {product.era && product.era !== 'Classic' && product.era !== 'Modern' && (
          <span className="badge badge-black">
            ERA {product.era}
          </span>
        )}
        {product.playing_surface && product.playing_surface !== 'N/A' && (
          <span className="badge badge-outline" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
            {product.playing_surface}
          </span>
        )}
      </div>

      {/* Wishlist Toggle Button */}
      <button
        onClick={handleWishlistClick}
        aria-label="Add to Wishlist"
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 5,
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          backgroundColor: isSaved ? 'var(--color-burgundy)' : 'rgba(255,255,255,0.9)',
          color: isSaved ? '#FFFFFF' : 'var(--color-black)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          transition: 'all var(--transition-fast)'
        }}
      >
        <Heart size={17} fill={isSaved ? '#FFFFFF' : 'none'} strokeWidth={isSaved ? 0 : 2} />
      </button>

      {/* Image Container with Smooth Zoom */}
      <Link to={`/shop/${product.slug || product.id}`} style={{
        display: 'block',
        aspectRatio: '4 / 3.8',
        overflow: 'hidden',
        backgroundColor: '#EAE5DB',
        position: 'relative'
      }}>
        <img
          src={product.primary_image || '/images/products/vintage-1970-football.jpg'}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)'
          }}
          onError={(e) => {
            e.currentTarget.src = '/images/products/vintage-1970-football.jpg';
          }}
        />

        {/* Quick View Button on Hover */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all var(--transition-normal)',
          pointerEvents: isHovered ? 'auto' : 'none'
        }}>
          <button
            onClick={handleQuickView}
            className="btn btn-black btn-sm"
            style={{ width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}
          >
            <Eye size={15} /> Inspect Piece
          </button>
        </div>
      </Link>

      {/* Card Content Area */}
      <div style={{
        padding: '1.25rem 1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Brand & Category line */}
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--color-text-muted)',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.35rem'
          }}>
            {product.brand_name} {product.category_name && `• ${product.category_name}`}
          </div>

          {/* Product Title */}
          <Link to={`/shop/${product.slug || product.id}`}>
            <h3 style={{
              fontSize: '0.96rem',
              fontWeight: '700',
              lineHeight: '1.4',
              color: 'var(--color-black)',
              marginBottom: '0.65rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.7rem'
            }}>
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < Math.floor(product.rating || 5) ? 'var(--color-gold)' : 'none'}
                  stroke="var(--color-gold)"
                />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-black)' }}>
              {parseFloat(product.rating || 5.0).toFixed(1)}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
              ({product.review_count || 12})
            </span>
          </div>
        </div>

        {/* Price and CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '0.85rem',
          marginTop: '0.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{
                fontSize: '1.15rem',
                fontWeight: '800',
                color: hasDiscount ? 'var(--color-burgundy)' : 'var(--color-black)',
                fontFamily: 'var(--font-sans)'
              }}>
                ₹{price.toFixed(2)}
              </span>
              {originalPrice && (
                <span style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-light)',
                  textDecoration: 'line-through'
                }}>
                  ₹{originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: '600' }}>
              In Stock & Ready to Dispatch
            </div>
          </div>

          <Link
            to={`/shop/${product.slug || product.id}`}
            className="btn btn-outline-burgundy btn-sm"
            style={{ padding: '0.45rem 0.85rem' }}
          >
            Select Size
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
