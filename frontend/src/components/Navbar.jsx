// frontend/src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ShieldAlert, 
  LogOut, 
  Package, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { productService } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount, setIsDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick search debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const res = await productService.quickSearch(searchQuery);
        if (res.data.success) {
          setSearchResults(res.data.results);
        }
      } catch (err) {
        console.error('Quick search error:', err);
      } finally {
        setSearchLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Retro Jerseys', path: '/shop?category=retro-jerseys' },
    { name: 'Football Boots', path: '/shop?category=football-boots' },
    { name: 'Accessories', path: '/shop?category=accessories-care' },
    { name: 'New Arrivals', path: '/shop?newArrival=true' },
    { name: 'Sale', path: '/shop?onSale=true', highlight: true }
  ];

  return (
    <>
      <header style={{
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-cream)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px'
        }}>
          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'var(--color-cream)', display: 'none', padding: '0.5rem' }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo with Vintage Football Emblem */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-burgundy)',
              border: '2px solid var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              {/* Retro 32-panel hexagon emblem SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#F5F0E6" strokeWidth="1.5" />
                <polygon points="12,6 16.5,9.5 15,15 9,15 7.5,9.5" fill="#F5F0E6" />
                <line x1="12" y1="2" x2="12" y2="6" stroke="#F5F0E6" strokeWidth="1.5" />
                <line x1="21.5" y1="9" x2="16.5" y2="9.5" stroke="#F5F0E6" strokeWidth="1.5" />
                <line x1="18" y1="20" x2="15" y2="15" stroke="#F5F0E6" strokeWidth="1.5" />
                <line x1="6" y1="20" x2="9" y2="15" stroke="#F5F0E6" strokeWidth="1.5" />
                <line x1="2.5" y1="9" x2="7.5" y2="9.5" stroke="#F5F0E6" strokeWidth="1.5" />
              </svg>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="font-display" style={{
                fontSize: '1.9rem',
                lineHeight: '1',
                color: 'var(--color-cream)',
                letterSpacing: '0.08em',
                fontWeight: '400'
              }}>
                RETRO STORE
              </span>
              <span style={{
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                fontWeight: '700'
              }}>
                Atelier Football • 1888
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={({ isActive }) => ({
                  color: link.highlight ? 'var(--color-gold-light)' : (isActive ? '#FFFFFF' : 'var(--color-cream)'),
                  fontSize: '0.85rem',
                  fontWeight: link.highlight ? '800' : '600',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 0',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  opacity: isActive || link.highlight ? 1 : 0.85,
                  transition: 'opacity var(--transition-fast), color var(--transition-fast)'
                })}
              >
                {link.name}
                {link.highlight && (
                  <span style={{
                    backgroundColor: 'var(--color-burgundy)',
                    color: '#fff',
                    fontSize: '0.6rem',
                    padding: '0.1rem 0.35rem',
                    borderRadius: '2px',
                    marginLeft: '2px'
                  }}>
                    HOT
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search Catalog"
              style={{
                color: 'var(--color-cream)',
                display: 'flex',
                alignItems: 'center',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-cream)'}
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              style={{
                color: 'var(--color-cream)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-cream)'}
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-7px',
                  right: '-8px',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-black)',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Shopping Bag"
              style={{
                color: 'var(--color-cream)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-cream)'}
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-7px',
                  right: '-8px',
                  backgroundColor: 'var(--color-burgundy)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Menu */}
            <div style={{ position: 'relative' }} ref={userMenuRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-label="User Account"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-cream)',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '4px',
                  border: isAuthenticated ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  backgroundColor: isAuthenticated ? 'rgba(255,255,255,0.05)' : 'transparent',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <User size={19} />
                {isAuthenticated && (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    maxWidth: '90px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {user?.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '230px',
                  backgroundColor: 'var(--color-black)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                  padding: '0.6rem 0',
                  zIndex: 100,
                  color: 'var(--color-cream)'
                }}>
                  {isAuthenticated ? (
                    <>
                      <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', marginTop: '2px' }}>
                          {user?.role === 'admin' ? 'Administrator' : 'Collector Member'}
                        </div>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.65rem 1rem',
                            color: 'var(--color-gold-light)',
                            fontWeight: '700',
                            fontSize: '0.82rem',
                            backgroundColor: 'rgba(183, 154, 99, 0.1)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                          }}
                        >
                          <ShieldAlert size={16} /> Admin Dashboard
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.6rem 1rem',
                          fontSize: '0.82rem',
                          color: 'var(--color-cream)'
                        }}
                      >
                        <User size={16} /> My Profile & Addresses
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.6rem 1rem',
                          fontSize: '0.82rem',
                          color: 'var(--color-cream)'
                        }}
                      >
                        <Package size={16} /> Order History
                      </Link>

                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.4rem', paddingTop: '0.4rem' }}>
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                            navigate('/');
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.6rem 1rem',
                            fontSize: '0.82rem',
                            color: '#FF6B6B',
                            textAlign: 'left'
                          }}
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ padding: '0.6rem 1rem 0.3rem' }}>
                        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.6rem' }}>
                          Sign in to access your saved cart, orders, and archival wishlist.
                        </div>
                        <Link
                          to="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="btn btn-burgundy btn-sm"
                          style={{ width: '100%', marginBottom: '0.4rem' }}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setUserDropdownOpen(false)}
                          className="btn btn-outline btn-sm"
                          style={{ width: '100%', borderColor: 'rgba(255,255,255,0.2)', color: 'var(--color-cream)' }}
                        >
                          Create Account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(23, 23, 23, 0.85)',
          backdropFilter: 'blur(5px)',
          zIndex: 90,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '6rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '650px',
            backgroundColor: 'var(--color-warm-white)',
            borderRadius: '4px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            margin: '0 1rem'
          }}>
            <form onSubmit={handleSearchSubmit} style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid var(--color-border)',
              padding: '0.75rem 1.25rem'
            }}>
              <Search size={22} style={{ color: 'var(--color-text-muted)', marginRight: '0.75rem' }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search retro kits, Copa Mundial, grip socks, classic brands..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.05rem',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-black)'
                }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{ color: 'var(--color-text-muted)', padding: '0.3rem' }}
              >
                <X size={20} />
              </button>
            </form>

            {/* Quick Results Container */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.5rem 0' }}>
              {searchLoading && (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Searching the archives...
                </div>
              )}

              {!searchLoading && searchQuery.trim() && searchResults.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <p style={{ fontWeight: '700', color: 'var(--color-black)', marginBottom: '0.25rem' }}>
                    No kits or boots found for "{searchQuery}"
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Try searching for France 98, Predator, Umbro, or Leather Football.
                  </p>
                </div>
              )}

              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  to={`/shop/${item.slug || item.id}`}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 1.25rem',
                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                    transition: 'background-color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-cream)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <img
                    src={item.primary_image}
                    alt={item.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-burgundy)', fontWeight: '700', textTransform: 'uppercase' }}>
                      {item.brand_name} • {item.category_name}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-black)' }}>
                      {item.name}
                    </div>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--color-black)' }}>
                    ₹{parseFloat(item.price).toFixed(2)}
                  </div>
                  <ChevronRight size={18} style={{ color: 'var(--color-text-light)' }} />
                </Link>
              ))}

              {searchQuery.trim() && searchResults.length > 0 && (
                <div style={{ padding: '0.75rem 1.25rem', backgroundColor: 'var(--color-cream)', textAlign: 'center' }}>
                  <button
                    onClick={handleSearchSubmit}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: 'var(--color-burgundy)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    View all results for "{searchQuery}" →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '74px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--color-black)',
          zIndex: 45,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  color: link.highlight ? 'var(--color-gold-light)' : (isActive ? '#FFFFFF' : 'var(--color-cream)'),
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)'
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {isAuthenticated ? (
              <>
                <div style={{ color: 'var(--color-cream)', fontSize: '0.9rem' }}>
                  Signed in as <strong>{user?.name}</strong>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-burgundy btn-sm"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ color: '#FF6B6B', borderColor: '#FF6B6B' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-burgundy"
                  style={{ flex: 1 }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline"
                  style={{ flex: 1, color: 'var(--color-cream)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inline styles for media query responsive helpers */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
