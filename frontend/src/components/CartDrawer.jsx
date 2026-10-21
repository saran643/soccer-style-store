// frontend/src/components/CartDrawer.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeItem } = useCart();

  if (!isDrawerOpen) return null;

  const freeShippingThreshold = 1999.00;
  const progressPercent = Math.min(100, (cart.subtotal / freeShippingThreshold) * 100);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(23, 23, 23, 0.6)',
          backdropFilter: 'blur(3px)',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Drawer Surface */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        backgroundColor: 'var(--color-warm-white)',
        boxShadow: '-4px 0 25px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 101,
        animation: 'fadeIn 0.25s ease'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-cream)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={20} />
            <h3 className="font-display" style={{ fontSize: '1.4rem', letterSpacing: '0.06em', color: '#FFFFFF', margin: 0 }}>
              YOUR MATCHDAY BAG ({cart.totalItems})
            </h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close Bag"
            style={{ color: 'var(--color-cream)', display: 'flex', alignItems: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--color-cream)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
            <Truck size={15} style={{ color: 'var(--color-burgundy)' }} />
            {cart.subtotal >= freeShippingThreshold ? (
              <span style={{ fontWeight: '700', color: '#166534' }}>
                You have qualified for Free Delivery across India!
              </span>
            ) : (
              <span>
                Add <strong>₹{(freeShippingThreshold - cart.subtotal).toFixed(2)}</strong> more for <strong>FREE DELIVERY</strong>
              </span>
            )}
          </div>
          <div style={{
            height: '6px',
            backgroundColor: 'var(--color-soft-grey)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: cart.subtotal >= freeShippingThreshold ? '#166534' : 'var(--color-burgundy)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: 'var(--color-text-light)'
              }}>
                <ShoppingBag size={30} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-black)' }}>
                Your bag is empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Discover iconic retro kits, Kangaroo leather boots, and matchday essentials.
              </p>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/shop');
                }}
                className="btn btn-burgundy"
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cart.items.map((item) => (
                <div
                  key={item.cart_item_id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                >
                  <img
                    src={item.primary_image}
                    alt={item.product_name}
                    style={{
                      width: '76px',
                      height: '76px',
                      objectFit: 'cover',
                      borderRadius: '2px',
                      backgroundColor: '#EFEAE0'
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                        {item.brand_name}
                      </div>
                      <Link
                        to={`/shop/${item.product_slug || item.product_id}`}
                        onClick={() => setIsDrawerOpen(false)}
                        style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-black)', lineHeight: '1.3' }}
                      >
                        {item.product_name}
                      </Link>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '3px' }}>
                        Size: <strong>{item.size}</strong> • {item.color}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      {/* Quantity Controls */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--color-border)',
                        borderRadius: '2px'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                          style={{ padding: '0.25rem 0.5rem', color: 'var(--color-black)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: '700', padding: '0 0.4rem', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                          style={{ padding: '0.25rem 0.5rem', color: 'var(--color-black)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--color-black)' }}>
                          ₹{parseFloat(item.lineSubtotal).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.cart_item_id)}
                          style={{ color: 'var(--color-text-light)', transition: 'color 0.15s' }}
                          aria-label="Remove item"
                          onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-light)'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & CTAs */}
        {cart.items.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-warm-white)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Subtotal</span>
              <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-black)' }}>
                ₹{cart.subtotal.toFixed(2)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              <span>Shipping</span>
              <span>{cart.shippingFee === 0 ? 'FREE' : `₹${cart.shippingFee.toFixed(2)}`}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="btn btn-burgundy"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/cart');
                }}
                className="btn btn-outline"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                View & Edit Shopping Bag
              </button>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              fontSize: '0.72rem',
              color: 'var(--color-text-light)',
              marginTop: '0.85rem'
            }}>
              <ShieldCheck size={14} /> 256-Bit SSL Encrypted Checkout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
