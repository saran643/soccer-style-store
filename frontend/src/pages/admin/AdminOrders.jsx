// frontend/src/pages/admin/AdminOrders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { adminService } from '../../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await adminService.getOrders({ status: statusFilter, search });
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setStatusUpdating(orderId);
      await adminService.updateOrderStatus(orderId, { order_status: newStatus });
      await loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setStatusUpdating(null);
    }
  };

  const handlePaymentStatusChange = async (orderId, newPaymentStatus) => {
    try {
      setStatusUpdating(orderId);
      await adminService.updateOrderStatus(orderId, { payment_status: newPaymentStatus });
      await loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update payment status');
    } finally {
      setStatusUpdating(null);
    }
  };

  return (
    <div className="admin-orders animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        <div style={{
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-cream)',
          padding: '1rem 1.5rem',
          borderRadius: '2px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link to="/admin" style={{ color: 'var(--color-cream)', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display" style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>
              ORDER FULFILMENT & TRACKING MANAGEMENT
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)', fontWeight: '700' }}>
            Total Orders: {orders.length}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <form onSubmit={(e) => { e.preventDefault(); loadOrders(); }} style={{ display: 'flex', gap: '0.5rem', flex: '1 1 300px' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order #, customer, or email..."
              className="form-input"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            />
            <button type="submit" className="btn btn-black btn-sm">
              <Search size={15} />
            </button>
          </form>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
            style={{ width: '220px', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-cream)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Order Number</th>
                <th style={{ padding: '0.85rem 1rem' }}>Customer</th>
                <th style={{ padding: '0.85rem 1rem' }}>Items</th>
                <th style={{ padding: '0.85rem 1rem' }}>Total</th>
                <th style={{ padding: '0.85rem 1rem' }}>Payment Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Fulfillment Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Placed Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center' }}>Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center' }}>No orders found matching criteria.</td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <Link to={`/orders/${o.id}`} style={{ fontWeight: '800', color: 'var(--color-burgundy)', fontFamily: 'monospace' }}>
                        {o.order_number}
                      </Link>
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: '700' }}>{o.recipient_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{o.user_email}</div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      {o.total_items} items
                    </td>

                    <td style={{ padding: '0.85rem 1rem', fontWeight: '800' }}>
                      ₹{parseFloat(o.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    {/* Change Payment Status Inline */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <select
                        value={o.payment_status}
                        onChange={(e) => handlePaymentStatusChange(o.id, e.target.value)}
                        disabled={statusUpdating === o.id}
                        className="form-select"
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.25rem 0.5rem',
                          fontWeight: '700',
                          backgroundColor: o.payment_status === 'paid' ? '#DCFCE7' : '#FEF3C7',
                          color: o.payment_status === 'paid' ? '#166534' : '#92400E'
                        }}
                      >
                        <option value="pending">PENDING</option>
                        <option value="paid">PAID</option>
                        <option value="failed">FAILED</option>
                        <option value="refunded">REFUNDED</option>
                      </select>
                    </td>

                    {/* Change Order Status Inline */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <select
                        value={o.order_status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        disabled={statusUpdating === o.id}
                        className="form-select"
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.25rem 0.5rem',
                          fontWeight: '700'
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
                      {new Date(o.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
