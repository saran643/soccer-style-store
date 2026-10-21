// frontend/src/pages/Cart.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Tag, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { couponService } from '../services/api';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const freeShippingThreshold = 1999.00;
  const rawSubtotal = cart.subtotal;
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0.00;
  const netSubtotal = Math.max(0, rawSubtotal - discountAmount);
  const shippingFee = netSubtotal >= freeShippingThreshold || netSubtotal === 0 ? 0.00 : 149.00;
  const finalTotal = netSubtotal + shippingFee;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      setCouponLoading(true);
      setCouponError('');
      const res = await couponService.validateCoupon(couponCode, rawSubtotal);
      if (res.data.success) {
        setAppliedCoupon(res.data.coupon);
        // Persist coupon code in sessionStorage so checkout can auto-pick it up
        sessionStorage.setItem('retro_coupon', res.data.coupon.code);
      }
    } catch (err) {
      setCouponError(err.response?.data?.message || 'Invalid coupon code.');
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    sessionStorage.removeItem('retro_coupon');
  };

  if (cart.items.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: 'var(--color-text-light)'
        }}>
          <ShoppingBag size={34} />
        </div>
        <h2 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          YOUR MATCHDAY BAG IS EMPTY
        </h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
          You have no items in your shopping bag. Explore our vintage football jerseys, boots, and pitch accessories.
        </p>
        <Link to="/shop" className="btn btn-burgundy btn-lg">
          Explore The Archives <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in" style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        <h1 className="font-display" style={{ fontSize: '2.8rem', marginBottom: '2rem' }}>
          SHOPPING BAG ({cart.totalItems} PIECES)
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* LEFT: CART ITEMS LIST */}
          <div style={{ flex: '1 1 60%' }}>
            {/* Free shipping bar */}
            <div style={{
              backgroundColor: 'var(--color-warm-white)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                <Truck size={17} style={{ color: 'var(--color-burgundy)' }} />
                {rawSubtotal >= freeShippingThreshold ? (
                  <span style={{ color: '#166534', fontWeight: '700' }}>
                    Congratulations! You have unlocked Free All-India Express Delivery.
                  </span>
                ) : (
                  <span>
                    Add <strong>₹{(freeShippingThreshold - rawSubtotal).toFixed(2)}</strong> more to unlock <strong>FREE DELIVERY</strong>.
                  </span>
                )}
              </div>
              <div style={{
                height: '7px',
                backgroundColor: 'var(--color-cream)',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%`,
                  backgroundColor: rawSubtotal >= freeShippingThreshold ? '#166534' : 'var(--color-burgundy)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Items Table */}
            <div style={{
              backgroundColor: 'var(--color-warm-white)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px'
            }}>
              {cart.items.map((item, idx) => (
                <div
                  key={item.cart_item_id}
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    padding: '1.5rem',
                    borderBottom: idx !== cart.items.length - 1 ? '1px solid var(--color-border)' : 'none',
                    flexWrap: 'wrap'
                  }}
                >
                  <img
                    src={item.primary_image}
                    alt={item.product_name}
                    style={{
                      width: '90px',
                      height: '90px',
                      objectFit: 'cover',
                      borderRadius: '2px',
                      backgroundColor: 'var(--color-cream)'
                    }}
                  />

                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-burgundy)', fontWeight: '800', textTransform: 'uppercase' }}>
                        {item.brand_name}
                      </div>
                      <Link
                        to={`/shop/${item.product_slug || item.product_id}`}
                        style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-black)' }}
                      >
                        {item.product_name}
                      </Link>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Variant: <strong>{item.size}</strong> • {item.color} • SKU: {item.sku}
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '1rem',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}>
                      {/* Quantity Controller */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-warm-white)',
                        borderRadius: '2px'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                          style={{ padding: '0.35rem 0.65rem', color: 'var(--color-black)' }}
                          aria-label="Decrease"
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem', minWidth: '28px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                          style={{ padding: '0.35rem 0.65rem', color: 'var(--color-black)' }}
                          aria-label="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--color-black)' }}>
                            ₹{parseFloat(item.lineSubtotal).toFixed(2)}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                            (₹{parseFloat(item.effective_price).toFixed(2)} each)
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.cart_item_id)}
                          style={{ color: 'var(--color-text-light)', transition: 'color 0.15s' }}
                          aria-label="Remove"
                          onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-light)'}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Link to="/shop" style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                color: 'var(--color-burgundy)',
                textTransform: 'uppercase'
              }}>
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                style={{ fontSize: '0.82rem', color: '#DC2626', fontWeight: '600' }}
              >
                Clear entire bag
              </button>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY & COUPON */}
          <div style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '2rem'
          }}>
            <h3 className="font-display" style={{ fontSize: '1.6rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-black)', paddingBottom: '0.5rem' }}>
              ORDER SUMMARY
            </h3>

            {/* Coupon Code Section */}
            <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              <label className="form-label">Promotional Code:</label>
              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(22, 101, 52, 0.08)',
                  border: '1px dashed #166534',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '2px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Tag size={16} color="#166534" />
                    <span style={{ fontWeight: '700', color: '#166534', fontSize: '0.88rem' }}>
                      {appliedCoupon.code} (-₹{appliedCoupon.discountAmount.toFixed(2)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ color: '#DC2626', fontSize: '0.78rem', fontWeight: '700' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. RETRO10"
                    className="form-input"
                    style={{ textTransform: 'uppercase' }}
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="btn btn-black btn-sm"
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </form>
              )}

              {couponError && (
                <div style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertCircle size={13} /> {couponError}
                </div>
              )}
            </div>

            {/* Line-item calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Bag Subtotal</span>
                <span style={{ fontWeight: '700' }}>₹{rawSubtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#166534' }}>
                  <span>Discount ({appliedCoupon.code})</span>
                  <span style={{ fontWeight: '700' }}>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Express Courier Shipping</span>
                <span style={{ fontWeight: '700' }}>
                  {shippingFee === 0 ? <span style={{ color: '#166534' }}>FREE</span> : `₹${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div style={{
                borderTop: '1px solid var(--color-border)',
                paddingTop: '1rem',
                marginTop: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>Final Total</span>
                <span style={{ fontWeight: '900', fontSize: '1.6rem', color: 'var(--color-burgundy)' }}>
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-burgundy btn-lg"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--color-text-light)'
            }}>
              <ShieldCheck size={16} /> Transaction-Safe MySQL Stock Verification
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
