// frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Lock, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const Profile = () => {
  const { user, refreshUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    recipient_name: user?.name || '',
    phone: user?.phone || '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'United Kingdom',
    is_default: false
  });

  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });
  const [addressMsg, setAddressMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const loadAddresses = async () => {
    try {
      const res = await authService.getAddresses();
      if (res.data.success) {
        setAddresses(res.data.addresses);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setProfileMsg({ text: '', type: '' });

      const payload = {
        name,
        phone,
        ...(newPassword ? { currentPassword, newPassword } : {})
      };

      const res = await authService.updateProfile(payload);
      if (res.data.success) {
        setProfileMsg({ text: 'Profile updated successfully.', type: 'success' });
        setCurrentPassword('');
        setNewPassword('');
        await refreshUser();
      }
    } catch (err) {
      setProfileMsg({ text: err.response?.data?.message || 'Failed to update profile.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      setAddressMsg({ text: '', type: '' });
      const res = await authService.addAddress(newAddress);
      if (res.data.success) {
        setAddressMsg({ text: 'New delivery address saved.', type: 'success' });
        setShowAddressForm(false);
        setNewAddress({
          recipient_name: user?.name || '',
          phone: user?.phone || '',
          address_line1: '',
          address_line2: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'United Kingdom',
          is_default: false
        });
        await loadAddresses();
      }
    } catch (err) {
      setAddressMsg({ text: err.response?.data?.message || 'Failed to add address.', type: 'error' });
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Delete this delivery address?')) return;
    try {
      await authService.deleteAddress(id);
      await loadAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-page animate-fade-in" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <h1 className="font-display" style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>
          MEMBER PROFILE & SETTINGS
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
          Manage your account credentials, security preferences, and saved dispatch addresses.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* LEFT: PROFILE FORM */}
          <div style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '2rem'
          }}>
            <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-black)', paddingBottom: '0.5rem' }}>
              PERSONAL DETAILS & CREDENTIALS
            </h3>

            {profileMsg.text && (
              <div style={{
                backgroundColor: profileMsg.type === 'error' ? '#FEE2E2' : '#DCFCE7',
                color: profileMsg.type === 'error' ? '#991B1B' : '#166534',
                padding: '0.75rem 1rem',
                borderRadius: '2px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem'
              }}>
                {profileMsg.type === 'error' ? <AlertCircle size={15} /> : <Check size={15} />}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label className="form-label">Email Address (Read Only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="form-input"
                  style={{ backgroundColor: 'var(--color-cream)', opacity: 0.8 }}
                />
              </div>

              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7700 900123"
                  className="form-input"
                />
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-burgundy)', marginBottom: '0.75rem' }}>
                  Change Password (Leave blank to keep current)
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">New Password (Min. 6 chars)</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-burgundy"
                style={{ marginTop: '0.5rem' }}
              >
                {loading ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </form>
          </div>

          {/* RIGHT: SAVED ADDRESSES */}
          <div style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-black)', paddingBottom: '0.5rem' }}>
              <h3 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
                DISPATCH ADDRESSES ({addresses.length})
              </h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="btn btn-outline btn-sm"
              >
                <Plus size={14} /> {showAddressForm ? 'Cancel' : 'Add New'}
              </button>
            </div>

            {addressMsg.text && (
              <div style={{
                backgroundColor: addressMsg.type === 'error' ? '#FEE2E2' : '#DCFCE7',
                color: addressMsg.type === 'error' ? '#991B1B' : '#166534',
                padding: '0.75rem 1rem',
                borderRadius: '2px',
                marginBottom: '1rem',
                fontSize: '0.85rem'
              }}>
                {addressMsg.text}
              </div>
            )}

            {/* Address Form Toggle */}
            {showAddressForm && (
              <form onSubmit={handleAddAddress} style={{
                backgroundColor: 'var(--color-cream)',
                padding: '1.25rem',
                borderRadius: '2px',
                border: '1px solid var(--color-border)',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>Enter New Address Details:</div>
                <input
                  type="text"
                  required
                  placeholder="Recipient Name *"
                  value={newAddress.recipient_name}
                  onChange={(e) => setNewAddress({ ...newAddress, recipient_name: e.target.value })}
                  className="form-input"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className="form-input"
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address Line 1 *"
                  value={newAddress.address_line1}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (Optional)"
                  value={newAddress.address_line2}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
                  className="form-input"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input
                    type="text"
                    required
                    placeholder="City *"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code *"
                    value={newAddress.postal_code}
                    onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                    className="form-input"
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newAddress.is_default}
                    onChange={(e) => setNewAddress({ ...newAddress, is_default: e.target.checked })}
                    style={{ accentColor: 'var(--color-burgundy)' }}
                  />
                  <span>Set as default dispatch address</span>
                </label>
                <button type="submit" className="btn btn-burgundy btn-sm">
                  Save Address
                </button>
              </form>
            )}

            {/* Address List */}
            {addresses.length === 0 ? (
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', fontStyle: 'italic' }}>
                No saved addresses. Add an address for faster checkout.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-warm-white)',
                      borderRadius: '2px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.92rem' }}>{addr.recipient_name}</span>
                        {addr.is_default === 1 && (
                          <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Default</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                        {addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ''}<br />
                        {addr.city}, {addr.state ? `${addr.state}, ` : ''}{addr.postal_code}<br />
                        {addr.country} • Phone: {addr.phone}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      style={{ color: 'var(--color-text-light)', transition: 'color 0.15s', padding: '0.25rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-light)'}
                      aria-label="Delete Address"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
