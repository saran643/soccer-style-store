// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
    setError('');
  };

  return (
    <div className="login-page animate-fade-in" style={{ padding: '4rem 1.5rem 6rem' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="editorial-tag" style={{ justifyContent: 'center' }}>ARCHIVAL ACCESS</span>
            <h1 className="font-display" style={{ fontSize: '2.3rem', marginTop: '0.35rem', marginBottom: '0.4rem' }}>
              SIGN IN TO RETRO STORE
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Access your saved kit bag, order history, and collector privileges.
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
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
              </div>
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

            <button
              type="submit"
              disabled={loading}
              className="btn btn-burgundy btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Account'} <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-cream)',
            padding: '1rem',
            borderRadius: '2px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              color: 'var(--color-burgundy)',
              marginBottom: '0.65rem'
            }}>
              <Key size={14} /> Quick Demo Accounts (Click to fill)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => fillCredentials('admin@retrostore.com', 'Admin@123')}
                className="btn btn-outline btn-sm"
                style={{ textAlign: 'left', justifyContent: 'flex-start', fontSize: '0.78rem' }}
              >
                <strong>Admin:</strong> admin@retrostore.com / Admin@123
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('marcus@retrostore.com', 'Customer@123')}
                className="btn btn-outline btn-sm"
                style={{ textAlign: 'left', justifyContent: 'flex-start', fontSize: '0.78rem' }}
              >
                <strong>Customer:</strong> marcus@retrostore.com / Customer@123
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            New to RETRO STORE?{' '}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} style={{ color: 'var(--color-burgundy)', fontWeight: '700' }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
