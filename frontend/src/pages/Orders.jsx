// frontend/src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { orderService } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getMyOrders();
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
    <div className="orders-page animate-fade-in" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <h1 className="font-display" style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>
          MY MATCHDAY ORDERS ({orders.length})
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
          Historical records, courier tracking links, and purchased kit archive receipts.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--color-text-muted)' }}>
            Retrieving order history from MySQL...
          </div>
        ) : orders.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px'
          }}>
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
              <Package size={30} />
            </div>
            <h3 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              NO ORDERS PLACED YET
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              When you acquire vintage kits or match boots, your orders will appear here.
            </p>
            <Link to="/shop" className="btn btn-burgundy">
              Browse Catalogue <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {orders.map((o) => (
              <div
                key={o.id}
                style={{
                  backgroundColor: 'var(--color-warm-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'border-color 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: '800', fontSize: '1.05rem', color: 'var(--color-burgundy)' }}>
                      {o.order_number}
                    </span>
                    <span className={`badge-status ${getStatusClass(o.order_status)}`}>
                      {o.order_status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span>Placed on: <strong>{new Date(o.created_at).toLocaleDateString()}</strong></span>
                    <span>Items: <strong>{o.total_items}</strong></span>
                    <span>Payment: <strong style={{ textTransform: 'uppercase' }}>{o.payment_method} ({o.payment_status})</strong></span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: '700' }}>
                      Total Paid
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--color-black)' }}>
                      ₹{parseFloat(o.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  <Link
                    to={`/orders/${o.id}`}
                    className="btn btn-outline btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    Inspect Receipt <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
