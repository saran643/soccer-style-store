// frontend/src/pages/Wishlist.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
  const { items, loading, toggleWishlist } = useWishlist();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--color-text-muted)' }}>
        Retrieving your saved archive pieces...
      </div>
    );
  }

  return (
    <div className="wishlist-page animate-fade-in" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container">
        <h1 className="font-display" style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>
          ARCHIVAL WISHLIST ({items.length})
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
          Your curated selection of classic jerseys, heritage football boots, and pitch gear.
        </p>

        {items.length === 0 ? (
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
              color: 'var(--color-burgundy)'
            }}>
              <Heart size={30} />
            </div>
            <h3 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              YOUR WISHLIST IS EMPTY
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Click the heart icon on any product in our shop to save pieces to your private archive.
            </p>
            <Link to="/shop" className="btn btn-burgundy">
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {items.map((prod) => (
              <div
                key={prod.product_id}
                className="card-surface"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Remove heart button */}
                <button
                  onClick={() => toggleWishlist(prod.product_id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 5,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>

                <Link to={`/shop/${prod.slug || prod.product_id}`} style={{
                  aspectRatio: '4 / 3.8',
                  overflow: 'hidden',
                  backgroundColor: '#EDE7DC',
                  display: 'block'
                }}>
                  <img
                    src={prod.primary_image}
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-burgundy)', fontWeight: '700', textTransform: 'uppercase' }}>
                      {prod.brand_name} • {prod.category_name}
                    </div>
                    <Link to={`/shop/${prod.slug || prod.product_id}`}>
                      <h3 style={{ fontSize: '0.98rem', fontWeight: '700', margin: '0.35rem 0', color: 'var(--color-black)' }}>
                        {prod.name}
                      </h3>
                    </Link>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '0.85rem',
                    marginTop: '0.75rem'
                  }}>
                    <span style={{ fontWeight: '800', fontSize: '1.15rem', color: 'var(--color-black)' }}>
                      ₹{parseFloat(prod.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <Link
                      to={`/shop/${prod.slug || prod.product_id}`}
                      className="btn btn-burgundy btn-sm"
                    >
                      <ShoppingBag size={14} /> View Piece
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
