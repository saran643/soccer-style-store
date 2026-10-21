// frontend/src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Truck, RefreshCcw, Award } from 'lucide-react';
import { newsletterService } from '../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', isSuccess: false });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus({ loading: false, message: 'Please enter a valid email address.', isSuccess: false });
      return;
    }

    try {
      setStatus({ loading: true, message: '', isSuccess: false });
      const res = await newsletterService.subscribe(email);
      setStatus({ loading: false, message: res.data.message, isSuccess: true });
      setEmail('');
    } catch (err) {
      setStatus({
        loading: false,
        message: err.response?.data?.message || 'Failed to subscribe. Please try again.',
        isSuccess: false
      });
    }
  };

  return (
    <footer style={{
      backgroundColor: 'var(--color-black)',
      color: 'var(--color-cream)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      marginTop: 'auto'
    }}>
      {/* Brand Value Props Strip */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '2.5rem 0',
        backgroundColor: '#121212'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(114, 28, 50, 0.25)',
              color: 'var(--color-gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Truck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#FFFFFF' }}>TRACKED COURIER DISPATCH</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Free All-India delivery on all orders over ₹1,999.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(114, 28, 50, 0.25)',
              color: 'var(--color-gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Award size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#FFFFFF' }}>CURATED HERITAGE ARCHIVE</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Inspected for historic fidelity and fabric touch.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(114, 28, 50, 0.25)',
              color: 'var(--color-gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <RefreshCcw size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#FFFFFF' }}>30-DAY HASSLE-FREE RETURNS</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Straightforward exchanges on all unworn kits.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(114, 28, 50, 0.25)',
              color: 'var(--color-gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#FFFFFF' }}>AUTHENTIC MATCHDAY STANDARDS</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Real K-leather boots, pro grip pads & gloves.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="container" style={{ padding: '4rem 1.5rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-burgundy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-cream)'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#F5F0E6" strokeWidth="1.5" />
                  <polygon points="12,6 16.5,9.5 15,15 9,15 7.5,9.5" fill="#F5F0E6" />
                </svg>
              </div>
              <span className="font-display" style={{ fontSize: '1.6rem', letterSpacing: '0.06em', color: '#FFFFFF' }}>
                RETRO STORE
              </span>
            </div>

            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-light)',
              lineHeight: '1.7',
              marginBottom: '1.25rem'
            }}>
              "Celebrating the culture, the kits, and the unforgettable moments that make football beautiful."
            </p>

            <div style={{ fontSize: '0.8rem', color: 'var(--color-gold)' }}>
              14 Marine Drive, Sea Face Towers, Mumbai 400020<br />
              curator@retrostore.in • +91 98200 12345
            </div>
          </div>

          {/* Column 1: The Archives */}
          <div>
            <h4 style={{
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: '800',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              position: 'relative'
            }}>
              The Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <li><Link to="/shop?category=retro-jerseys" style={{ color: 'var(--color-text-light)' }}>World Cup Classics</Link></li>
              <li><Link to="/shop?category=retro-jerseys" style={{ color: 'var(--color-text-light)' }}>European League Heritage</Link></li>
              <li><Link to="/shop?category=football-boots" style={{ color: 'var(--color-text-light)' }}>Kangaroo Leather Boots</Link></li>
              <li><Link to="/shop?surface=FG" style={{ color: 'var(--color-text-light)' }}>Firm Ground (FG) Outsoles</Link></li>
              <li><Link to="/shop?surface=TF" style={{ color: 'var(--color-text-light)' }}>Astro & Turf (TF) Cleats</Link></li>
              <li><Link to="/shop?onSale=true" style={{ color: 'var(--color-gold-light)', fontWeight: '700' }}>The Sale Room</Link></li>
            </ul>
          </div>

          {/* Column 2: Equipment & Accessories */}
          <div>
            <h4 style={{
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: '800',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              Matchday Gear
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <li><Link to="/shop?category=socks-grip" style={{ color: 'var(--color-text-light)' }}>Pro Anti-Slip Grip Socks</Link></li>
              <li><Link to="/shop?category=shin-guards-protection" style={{ color: 'var(--color-text-light)' }}>Carbon Fibre Shin Guards</Link></li>
              <li><Link to="/shop?category=goalkeeper-gloves" style={{ color: 'var(--color-text-light)' }}>Heritage Goalkeeper Gloves</Link></li>
              <li><Link to="/shop?category=footballs-training" style={{ color: 'var(--color-text-light)' }}>1970 32-Panel Match Balls</Link></li>
              <li><Link to="/shop?category=bags-luggage" style={{ color: 'var(--color-text-light)' }}>Waxed Canvas Boot Bags</Link></li>
              <li><Link to="/shop?category=accessories-care" style={{ color: 'var(--color-text-light)' }}>Leather Dubbin & Care Kits</Link></li>
            </ul>
          </div>

          {/* Column 3: The Matchday Journal Newsletter */}
          <div>
            <h4 style={{
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: '800',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              The Archival Journal
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', lineHeight: '1.6', marginBottom: '1rem' }}>
              Receive rare kit drop notifications, legendary matchday essays, and member-only promotional codes.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{
                    flex: 1,
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '2px',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={status.loading}
                  className="btn btn-burgundy btn-sm"
                  style={{ padding: '0.65rem 1rem' }}
                >
                  {status.loading ? '...' : <ArrowRight size={16} />}
                </button>
              </div>

              {status.message && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  color: status.isSuccess ? 'var(--color-gold-light)' : '#FF6B6B',
                  marginTop: '0.25rem'
                }}>
                  {status.isSuccess ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          fontSize: '0.78rem',
          color: 'var(--color-text-light)'
        }}>
          <div>
            © {new Date().getFullYear()} RETRO STORE Ltd. Built with Node.js, Express & MySQL RDBMS. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accepted Methods:</span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className="badge badge-outline" style={{ color: 'var(--color-gold-light)', borderColor: 'var(--color-gold)' }}>UPI / GPAY / PAYTM</span>
              <span className="badge badge-outline" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)' }}>RUPAY</span>
              <span className="badge badge-outline" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)' }}>VISA</span>
              <span className="badge badge-outline" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)' }}>MASTERCARD</span>
              <span className="badge badge-outline" style={{ color: 'var(--color-gold-light)', borderColor: 'var(--color-gold)' }}>CASH ON DELIVERY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
