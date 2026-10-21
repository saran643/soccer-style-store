// frontend/src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Truck, 
  Lock, 
  Check, 
  AlertCircle, 
  Plus, 
  MapPin 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { authService, orderService, couponService } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, fetchCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [useNewAddress, setUseNewAddress] = useState(false);

  // New Address Form
  const [newAddress, setNewAddress] = useState({
    recipient_name: user?.name || '',
    phone: user?.phone || '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    saveAddress: true
  });

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [demoCard, setDemoCard] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardHolder: user?.name || 'M VANCE',
    expiry: '12/28',
    cvv: '888'
  });

  // Coupon state (picked up from Cart page sessionStorage or entered here)
  const [couponCode, setCouponCode] = useState(() => sessionStorage.getItem('retro_coupon') || '');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch saved addresses
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const res = await authService.getAddresses();
        if (res.data.success && res.data.addresses.length > 0) {
          setAddresses(res.data.addresses);
          const defaultAddr = res.data.addresses.find((a) => a.is_default) || res.data.addresses[0];
          setSelectedAddressId(defaultAddr.id);
        } else {
          setUseNewAddress(true);
        }
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setUseNewAddress(true);
      }
    };

    loadAddresses();
  }, []);

  // Validate coupon on mount if present in sessionStorage
  useEffect(() => {
    const checkSavedCoupon = async () => {
      const savedCode = sessionStorage.getItem('retro_coupon');
      if (savedCode && cart.subtotal > 0) {
        try {
          const res = await couponService.validateCoupon(savedCode, cart.subtotal);
          if (res.data.success) {
            setAppliedCoupon(res.data.coupon);
          }
        } catch (err) {
          sessionStorage.removeItem('retro_coupon');
        }
      }
    };
    checkSavedCoupon();
  }, [cart.subtotal]);

  if (cart.items.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>YOUR BAG IS EMPTY</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Cannot proceed to checkout without any pieces in your bag.</p>
        <Link to="/shop" className="btn btn-burgundy">Return to Catalogue</Link>
      </div>
    );
  }

  const rawSubtotal = cart.subtotal;
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0.00;
  const netSubtotal = Math.max(0, rawSubtotal - discountAmount);
  const shippingFee = netSubtotal >= 1999 || netSubtotal === 0 ? 0.00 : 149.00;
  const finalTotal = netSubtotal + shippingFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedAddressId && !useNewAddress) {
      setErrorMessage('Please select or enter a shipping address.');
      return;
    }

    if (useNewAddress) {
      if (!newAddress.recipient_name || !newAddress.phone || !newAddress.address_line1 || !newAddress.city || !newAddress.postal_code) {
        setErrorMessage('Please fill in all mandatory address fields.');
        return;
      }
    }

    try {
      setSubmitting(true);

      const payload = {
        addressId: !useNewAddress ? selectedAddressId : null,
        shippingAddressData: useNewAddress ? newAddress : null,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        paymentMethod: paymentMethod === 'card' ? 'online_demo' : 'cod',
        notes: orderNotes.trim() || null
      };

      const res = await orderService.createOrder(payload);

      if (res.data.success) {
        sessionStorage.removeItem('retro_coupon');
        await fetchCart();
        navigate(`/orders/confirmation/${res.data.order.orderNumber}`, {
          state: { order: res.data.order }
        });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Transaction failed. Please check your inventory or address.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page animate-fade-in" style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        <h1 className="font-display" style={{ fontSize: '2.8rem', marginBottom: '2rem' }}>
          SECURE MATCHDAY CHECKOUT
        </h1>

        {errorMessage && (
          <div style={{
            backgroundColor: '#FEE2E2',
            border: '1px solid #DC2626',
            color: '#991B1B',
            padding: '1rem',
            borderRadius: '2px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* LEFT: SHIPPING ADDRESS & PAYMENT DETAILS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Step 1: Delivery Address */}
            <div style={{
              backgroundColor: 'var(--color-warm-white)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '2rem'
            }}>
              <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={20} color="var(--color-burgundy)" /> 1. SHIPPING ADDRESS
              </h3>

              {/* Saved Addresses Selector */}
              {addresses.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    {addresses.map((addr) => {
                      const isSelected = !useNewAddress && selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => {
                            setSelectedAddressId(addr.id);
                            setUseNewAddress(false);
                          }}
                          style={{
                            padding: '1rem',
                            border: isSelected ? '2px solid var(--color-burgundy)' : '1px solid var(--color-border)',
                            backgroundColor: isSelected ? 'rgba(114, 28, 50, 0.03)' : 'var(--color-warm-white)',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>
                              {addr.recipient_name} ({addr.phone})
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                              {addr.address_line1}, {addr.address_line2 && `${addr.address_line2}, `}
                              {addr.city}, {addr.state && `${addr.state}, `}{addr.postal_code}, {addr.country}
                            </div>
                          </div>
                          {isSelected && (
                            <span className="badge badge-burgundy" style={{ fontSize: '0.65rem' }}>
                              Selected
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setUseNewAddress(!useNewAddress)}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      color: 'var(--color-burgundy)',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Plus size={15} /> {useNewAddress ? 'Use saved address' : 'Ship to a different address'}
                  </button>
                </div>
              )}

              {/* New Address Inputs */}
              {(useNewAddress || addresses.length === 0) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newAddress.recipient_name}
                      onChange={(e) => setNewAddress({ ...newAddress, recipient_name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      placeholder="+44 7700 900000"
                      className="form-input"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Address Line 1 *</label>
                    <input
                      type="text"
                      required
                      value={newAddress.address_line1}
                      onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                      placeholder="House number and street name"
                      className="form-input"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={newAddress.address_line2}
                      onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
                      placeholder="Apartment, suite, unit"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={newAddress.postal_code}
                      onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      disabled
                      value="India"
                      className="form-input"
                      style={{ backgroundColor: 'var(--color-cream)' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Payment Method */}
            <div style={{
              backgroundColor: 'var(--color-warm-white)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '2rem'
            }}>
              <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="var(--color-burgundy)" /> 2. PAYMENT METHOD
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Option 1: Demo Card / Online Gateway */}
                <label style={{
                  padding: '1rem',
                  border: paymentMethod === 'card' ? '2px solid var(--color-burgundy)' : '1px solid var(--color-border)',
                  backgroundColor: paymentMethod === 'card' ? 'rgba(114, 28, 50, 0.03)' : 'var(--color-warm-white)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    style={{ accentColor: 'var(--color-burgundy)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>
                      UPI / Cards / NetBanking (Instant Demo Gateway)
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Pre-filled sandbox payment gateway for instant order verification.
                    </div>
                  </div>
                </label>

                {/* Option 2: Cash on Delivery */}
                <label style={{
                  padding: '1rem',
                  border: paymentMethod === 'cod' ? '2px solid var(--color-burgundy)' : '1px solid var(--color-border)',
                  backgroundColor: paymentMethod === 'cod' ? 'rgba(114, 28, 50, 0.03)' : 'var(--color-warm-white)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    style={{ accentColor: 'var(--color-burgundy)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>
                      Cash on Delivery (COD)
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Pay our tracked courier cash or contactless terminal upon arrival.
                    </div>
                  </div>
                </label>
              </div>

              {/* Demo Card Simulator (if Card chosen) */}
              {paymentMethod === 'card' && (
                <div style={{
                  backgroundColor: 'var(--color-cream)',
                  border: '1px solid var(--color-border)',
                  padding: '1.25rem',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-burgundy)', marginBottom: '0.75rem' }}>
                    Demo Payment Simulation Card
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>Card Number</label>
                      <input
                        type="text"
                        disabled
                        value={demoCard.cardNumber}
                        className="form-input"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>Cardholder</label>
                      <input
                        type="text"
                        disabled
                        value={demoCard.cardHolder}
                        className="form-input"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>Expiry</label>
                      <input
                        type="text"
                        disabled
                        value={demoCard.expiry}
                        className="form-input"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>CVV</label>
                      <input
                        type="text"
                        disabled
                        value={demoCard.cvv}
                        className="form-input"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Order Instructions */}
            <div style={{
              backgroundColor: 'var(--color-warm-white)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '1.5rem 2rem'
            }}>
              <label className="form-label">Delivery Instructions (Optional):</label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Leave with building security or call on arrival"
                className="form-textarea"
              />
            </div>
          </div>

          {/* RIGHT: ORDER REVIEW & PLACE ORDER */}
          <div style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '2rem',
            position: 'sticky',
            top: '90px'
          }}>
            <h3 className="font-display" style={{ fontSize: '1.6rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-black)', paddingBottom: '0.5rem' }}>
              ORDER REVIEW ({cart.totalItems})
            </h3>

            {/* Items list preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '250px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
              {cart.items.map((it) => (
                <div key={it.cart_item_id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img
                    src={it.primary_image}
                    alt=""
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', lineHeight: '1.3' }}>{it.product_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Size: {it.size} • Qty: {it.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>
                    ₹{parseFloat(it.lineSubtotal).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                <span>₹{rawSubtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#166534' }}>
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span style={{ fontWeight: '700' }}>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Courier Shipping</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#166534' }}>FREE</strong> : `₹${shippingFee.toFixed(2)}`}</span>
              </div>

              <div style={{
                borderTop: '1px solid var(--color-border)',
                paddingTop: '0.85rem',
                marginTop: '0.4rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>Total Amount</span>
                <span style={{ fontWeight: '900', fontSize: '1.6rem', color: 'var(--color-burgundy)' }}>
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-burgundy btn-lg"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              {submitting ? 'Committing MySQL Transaction...' : `Place Order (₹${finalTotal.toFixed(2)})`}
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--color-text-light)'
            }}>
              <Lock size={14} /> Safe Order Processing & Inventory Lock
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
