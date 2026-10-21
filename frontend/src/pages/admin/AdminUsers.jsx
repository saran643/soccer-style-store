// frontend/src/pages/admin/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowLeft, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';
import { adminService } from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminService.getUsers();
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="admin-users animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
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
              REGISTERED SUPPORTERS & CUSTOMER ARCHIVE
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)', fontWeight: '700' }}>
            Total Registered: {users.length}
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-cream)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Collector / Supporter</th>
                <th style={{ padding: '0.85rem 1rem' }}>Email & Phone</th>
                <th style={{ padding: '0.85rem 1rem' }}>Role</th>
                <th style={{ padding: '0.85rem 1rem' }}>Orders Placed</th>
                <th style={{ padding: '0.85rem 1rem' }}>Lifetime Spend</th>
                <th style={{ padding: '0.85rem 1rem' }}>Member Since</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center' }}>Loading user registry...</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700' }}>
                      {u.name}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div>{u.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{u.phone || 'No phone'}</div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-burgundy' : 'badge-outline'}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <strong>{u.orders_count}</strong> orders
                    </td>

                    <td style={{ padding: '0.75rem 1rem', fontWeight: '800', color: 'var(--color-black)' }}>
                      ₹{parseFloat(u.total_spent).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                      {new Date(u.created_at).toLocaleDateString()}
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

export default AdminUsers;
