// frontend/src/pages/admin/AdminCoupons.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Plus, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { adminService } from '../../services/api';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    code: '',
    description: '',
    discount_type: 'percentage',
    discount_value: '',
    min_order_amount: '0',
    expiry_date: '2028-12-31',
    usage_limit: 100
  });

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const res = await adminService.getCoupons();
      if (res.data.success) {
        setCoupons(res.data.coupons);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.code.trim() || !form.discount_value) return;

    try {
      setSubmitting(true);
      setMsg({ text: '', type: '' });
      await adminService.createCoupon(form);
      setMsg({ text: `Promotional coupon '${form.code.toUpperCase()}' active in MySQL.`, type: 'success' });
      setForm({
        code: '',
        description: '',
        discount_type: 'percentage',
        discount_value: '',
        min_order_amount: '0',
        expiry_date: '2028-12-31',
        usage_limit: 100
      });
      setShowAdd(false);
      await loadCoupons();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to create coupon.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-coupons animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
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
              PROMOTIONS & DISCOUNT VOUCHERS
            </span>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="btn btn-burgundy btn-sm"
          >
            <Plus size={16} /> {showAdd ? 'Cancel' : 'Create Voucher'}
          </button>
        </div>

        {msg.text && (
          <div style={{
            backgroundColor: msg.type === 'error' ? '#FEE2E2' : '#DCFCE7',
            color: msg.type === 'error' ? '#991B1B' : '#166534',
            padding: '0.75rem 1rem',
            borderRadius: '2px',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}>
            {msg.text}
          </div>
        )}

        {showAdd && (
          <form onSubmit={handleCreate} style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '1.75rem',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', textTransform: 'uppercase' }}>
              New Promotional Code Setup
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DERBY25"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  className="form-input"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>

              <div>
                <label className="form-label">Discount Type *</label>
                <select
                  value={form.discount_type}
                  onChange={(e) => setForm({ ...form, discount_type: e.target.value })}
                  className="form-select"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Discount Value *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 15 for 15%"
                  value={form.discount_value}
                  onChange={(e) => setForm({ ...form, discount_value: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Minimum Order (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.min_order_amount}
                  onChange={(e) => setForm({ ...form, min_order_amount: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Expiry Date *</label>
                <input
                  type="date"
                  required
                  value={form.expiry_date}
                  onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Usage Limit</label>
                <input
                  type="number"
                  value={form.usage_limit}
                  onChange={(e) => setForm({ ...form, usage_limit: parseInt(e.target.value, 10) || 100 })}
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Public Description</label>
              <input
                type="text"
                placeholder="e.g. 15% discount for Cup Final matchday"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="form-input"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn btn-burgundy btn-sm" style={{ alignSelf: 'flex-start' }}>
              {submitting ? 'Creating...' : 'Activate Voucher'}
            </button>
          </form>
        )}

        {/* Coupons Table */}
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-cream)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Code</th>
                <th style={{ padding: '0.85rem 1rem' }}>Discount</th>
                <th style={{ padding: '0.85rem 1rem' }}>Min Order</th>
                <th style={{ padding: '0.85rem 1rem' }}>Times Used / Limit</th>
                <th style={{ padding: '0.85rem 1rem' }}>Expiry</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center' }}>Loading vouchers...</td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center' }}>No active coupons found.</td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ fontWeight: '800', fontFamily: 'monospace', color: 'var(--color-burgundy)', fontSize: '0.95rem' }}>
                        {c.code}
                      </span>
                      {c.description && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{c.description}</div>
                      )}
                    </td>

                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700' }}>
                      {c.discount_type === 'percentage' ? `${parseFloat(c.discount_value)}% OFF` : `₹${parseFloat(c.discount_value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} OFF`}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      ₹{parseFloat(c.min_order_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <strong>{c.times_used}</strong> / {c.usage_limit}
                    </td>

                    <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                      {c.expiry_date}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${c.is_active ? 'badge-gold' : 'badge-outline'}`}>
                        {c.is_active ? 'ACTIVE' : 'EXPIRED'}
                      </span>
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

export default AdminCoupons;
