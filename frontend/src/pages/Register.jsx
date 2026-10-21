// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Mail, User, Phone, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await register({ name, email, phone, password });
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page animate-fade-in" style={{ padding: '4rem 1.5rem 6rem' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="editorial-tag" style={{ justifyContent: 'center' }}>NEW MEMBER ADMISSION</span>
            <h1 className="font-display" style={{ fontSize: '2.3rem', marginTop: '0.35rem', marginBottom: '0.4rem' }}>
              JOIN RETRO STORE
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Join the collector community and receive archival release drops and member perks.
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #DC2626',
              color: '#991B1B',
              padding: '0.75rem 1rem',
              borderRadius: '2px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="form-label">Full Name *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marcus Vance"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
            </div>

            <div>
              <label className="form-label">Email Address *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@retrostore.com"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
            </div>

            <div>
              <label className="form-label">Phone Number (Optional)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7700 900123"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
            </div>

            <div>
              <label className="form-label">Password * (Min. 6 chars)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
            </div>

            <div>
              <label className="form-label">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-burgundy btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? 'Creating Member Account...' : 'Complete Registration'} <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} style={{ color: 'var(--color-burgundy)', fontWeight: '700' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
