// frontend/src/pages/OrderConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Check 
} from 'lucide-react';
import { orderService } from '../services/api';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const location = useLocation();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    if (!order) {
      const fetchOrder = async () => {
        try {
          const res = await orderService.getOrderById(orderNumber);
          if (res.data.success) {
            setOrder(res.data.order);
          }
        } catch (err) {
          console.error('Error fetching order receipt:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--color-text-muted)' }}>
        Generating verified receipt from database...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h2 className="font-display" style={{ fontSize: '2.5rem' }}>ORDER NOT FOUND</h2>
        <Link to="/" className="btn btn-burgundy" style={{ marginTop: '1.5rem' }}>Return Home</Link>
      </div>
    );
  }

  const orderId = order.orderNumber || order.order_number;
  const status = order.orderStatus || order.order_status || 'Confirmed';
  const total = order.totalAmount || order.total_amount;

  return (
    <div className="order-confirmation-page animate-fade-in" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Success Header Banner */}
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: 'rgba(22, 101, 52, 0.1)',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <span className="editorial-tag" style={{ color: '#166534' }}>
            TRANSACTION COMMITTED • STATUS: {status.toUpperCase()}
          </span>

          <h1 className="font-display" style={{ fontSize: '2.8rem', marginTop: '0.4rem', marginBottom: '0.5rem' }}>
            THANK YOU FOR YOUR ORDER
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto 1.5rem' }}>
            Your football heritage piece has been safely reserved in our inventory. A dispatch notification will be generated upon courier handover.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            backgroundColor: 'var(--color-cream)',
            border: '1px dashed var(--color-border)',
            padding: '0.85rem 1.5rem',
            borderRadius: '2px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                Order Number
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-burgundy)', fontFamily: 'monospace' }}>
                {orderId}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                Amount Charged
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-black)' }}>
                ₹{parseFloat(total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '2rem',
          marginBottom: '2.5rem'
        }}>
          <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
            ORDER DISPATCH LIFECYCLE
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {[
              { label: 'Confirmed', desc: 'Stock allocated', active: true },
              { label: 'Processing', desc: 'Atelier packaging', active: status === 'Processing' || status === 'Shipped' || status === 'Delivered' },
              { label: 'Shipped', desc: 'With courier', active: status === 'Shipped' || status === 'Delivered' },
              { label: 'Delivered', desc: 'At destination', active: status === 'Delivered' }
            ].map((step, idx) => (
              <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: step.active ? 'var(--color-burgundy)' : 'var(--color-cream)',
                  color: step.active ? '#FFFFFF' : 'var(--color-text-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.5rem',
                  fontWeight: '700',
                  fontSize: '0.85rem'
                }}>
                  {step.active ? <Check size={18} /> : idx + 1}
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.85rem', color: step.active ? 'var(--color-black)' : 'var(--color-text-light)' }}>
                  {step.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/orders" className="btn btn-black btn-lg">
            <Package size={18} /> View in My Orders
          </Link>
          <Link to="/shop" className="btn btn-outline btn-lg">
            Continue Exploring Catalogue <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
