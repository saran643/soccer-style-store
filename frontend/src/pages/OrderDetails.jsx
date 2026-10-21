// frontend/src/pages/OrderDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  CreditCard, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Check, 
  Calendar 
} from 'lucide-react';
import { orderService } from '../services/api';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await orderService.getOrderById(id);
        if (res.data.success) {
          setOrder(res.data.order);
        }
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--color-text-muted)' }}>
        Retrieving archived order receipt...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h2 className="font-display" style={{ fontSize: '2.5rem' }}>ORDER NOT FOUND</h2>
        <Link to="/orders" className="btn btn-burgundy" style={{ marginTop: '1.5rem' }}>Back to Orders</Link>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'status-confirmed';
      case 'Processing': return 'status-processing';
      case 'Shipped': return 'status-shipped';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  return (
    <div className="order-details-page animate-fade-in" style={{ padding: '3rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/orders" style={{
            fontSize: '0.82rem',
            color: 'var(--color-burgundy)',
            fontWeight: '700',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <ArrowLeft size={15} /> Back to My Orders
          </Link>
        </div>

        {/* Header Bar */}
        <div style={{
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-cream)',
          padding: '2rem',
          borderRadius: '2px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--color-gold-light)', textTransform: 'uppercase', fontWeight: '700' }}>
              OFFICIAL ATELIER ORDER RECEIPT
            </div>
            <h1 className="font-display" style={{ fontSize: '2.2rem', color: '#FFFFFF', margin: '0.2rem 0' }}>
              {order.order_number}
            </h1>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', display: 'flex', gap: '1rem' }}>
              <span>Placed: {new Date(order.created_at).toLocaleString()}</span>
              <span>Buyer: {order.recipient_name}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className={`badge-status ${getStatusClass(order.order_status)}`} style={{ fontSize: '0.85rem' }}>
              {order.order_status}
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#FFFFFF', marginTop: '0.5rem' }}>
              ₹{parseFloat(order.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Dispatch & Address Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '1.5rem'
          }}>
            <h4 style={{
              fontSize: '0.82rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MapPin size={16} color="var(--color-burgundy)" /> Shipping Destination
            </h4>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-black)', lineHeight: '1.6' }}>
              <strong>{order.recipient_name}</strong><br />
              {order.shipping_address}<br />
              Phone: {order.phone}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '1.5rem'
          }}>
            <h4 style={{
              fontSize: '0.82rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CreditCard size={16} color="var(--color-burgundy)" /> Payment Information
            </h4>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-black)', lineHeight: '1.6' }}>
              Method: <strong style={{ textTransform: 'uppercase' }}>{order.payment_method}</strong><br />
              Status: <span style={{ textTransform: 'uppercase', fontWeight: '700', color: order.payment_status === 'paid' ? '#166534' : '#92400E' }}>{order.payment_status}</span><br />
              {order.payments?.[0] && (
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Ref: {order.payments[0].transaction_reference}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Order Items Snapshot Table */}
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '2rem',
          marginBottom: '2.5rem'
        }}>
          <h3 className="font-display" style={{ fontSize: '1.6rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-black)', paddingBottom: '0.5rem' }}>
            PURCHASED PIECES ({order.items?.length || 0})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {order.items?.map((it) => (
              <div
                key={it.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--color-border)',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {it.product_image && (
                    <img
                      src={it.product_image}
                      alt=""
                      style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '2px', backgroundColor: 'var(--color-cream)' }}
                    />
                  )}
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.98rem' }}>
                      {it.product_name_snapshot}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Size: <strong>{it.size_snapshot}</strong> • {it.color_snapshot} • SKU: {it.sku_snapshot}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--color-black)' }}>
                    ₹{parseFloat(it.subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                    {it.quantity} × ₹{parseFloat(it.unit_price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '260px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Subtotal:</span>
              <span>₹{parseFloat(order.subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {parseFloat(order.discount_amount) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '260px', fontSize: '0.9rem', color: '#166534' }}>
                <span>Discount ({order.coupon_code}):</span>
                <span style={{ fontWeight: '700' }}>-₹{parseFloat(order.discount_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '260px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Shipping Fee:</span>
              <span>₹{parseFloat(order.shipping_fee).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '260px',
              borderTop: '2px solid var(--color-black)',
              paddingTop: '0.75rem',
              marginTop: '0.4rem',
              fontWeight: '900',
              fontSize: '1.25rem',
              color: 'var(--color-burgundy)'
            }}>
              <span>Final Total:</span>
              <span>₹{parseFloat(order.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
