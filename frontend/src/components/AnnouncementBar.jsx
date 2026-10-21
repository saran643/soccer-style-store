// frontend/src/components/AnnouncementBar.jsx
import React, { useState } from 'react';
import { Truck, ShieldCheck, X } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div style={{
      backgroundColor: 'var(--color-burgundy)',
      color: '#FFFFFF',
      fontSize: '0.75rem',
      fontWeight: '600',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '0.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 60
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Truck size={14} /> FREE ALL-INDIA TRACKED DELIVERY ON ORDERS OVER ₹1,999
        </span>
        <span style={{ opacity: 0.5, display: 'none', md: 'inline' }}>|</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={14} /> 100% QUALITY GUARANTEED VINTAGE ARCHIVE
        </span>
        <span style={{ opacity: 0.5, display: 'none', md: 'inline' }}>|</span>
        <span style={{ color: 'var(--color-gold-light)', fontWeight: '700' }}>
          USE CODE: <strong>RETRO10</strong> FOR 10% OFF
        </span>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss banner"
        style={{
          position: 'absolute',
          right: '1rem',
          color: 'rgba(255,255,255,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
