// frontend/src/pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X,
  Filter
} from 'lucide-react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, totalItems: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active filters read from URL params
  const currentCategory = searchParams.get('category') || '';
  const currentBrand = searchParams.get('brand') || '';
  const currentSurface = searchParams.get('surface') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentSearch = searchParams.get('search') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentInStock = searchParams.get('inStock') === 'true';
  const currentOnSale = searchParams.get('onSale') === 'true';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Initial load of categories and brands
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          productService.getCategories(),
          productService.getBrands()
        ]);
        if (catRes.data.success) setCategories(catRes.data.data);
        if (brandRes.data.success) setBrands(brandRes.data.data);
      } catch (err) {
        console.error('Error fetching shop metadata:', err);
      }
    };
    loadMetadata();
  }, []);

  // Fetch products whenever search params change
  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        setLoading(true);
        const params = {
          category: currentCategory || undefined,
          brand: currentBrand || undefined,
          surface: currentSurface || undefined,
          sort: currentSort || undefined,
          search: currentSearch || undefined,
          minPrice: currentMinPrice || undefined,
          maxPrice: currentMaxPrice || undefined,
          inStock: currentInStock ? 'true' : undefined,
          onSale: currentOnSale ? 'true' : undefined,
          page: currentPage,
          limit: 12
        };

        const res = await productService.getProducts(params);
        if (res.data.success) {
          setProducts(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogue();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value !== undefined && value !== null && value !== '') {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    // Reset page to 1 on any filter change (unless changing page)
    if (key !== 'page') {
      next.set('page', '1');
    }
    setSearchParams(next);
  };

  const resetAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = !!(
    currentCategory || currentBrand || currentSurface || currentSearch || 
    currentMinPrice || currentMaxPrice || currentInStock || currentOnSale || 
    currentSort !== 'featured'
  );

  return (
    <div className="shop-page animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* Editorial Header Banner */}
      <div style={{
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-cream)',
        padding: '3rem 0',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '2.5rem'
      }}>
        <div className="container">
          <span className="editorial-tag" style={{ color: 'var(--color-gold-light)' }}>
            THE OFFICIAL CATALOGUE
          </span>
          <h1 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#FFFFFF',
            letterSpacing: '0.04em',
            marginTop: '0.25rem',
            lineHeight: '1'
          }}>
            FOOTBALL HERITAGE ARCHIVE
          </h1>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-light)',
            maxWidth: '650px',
            marginTop: '0.5rem'
          }}>
            Explore {pagination.totalItems} verified vintage kits, genuine Kangaroo leather boots, anti-slip matchday socks, and pitch conditioning accessories.
          </p>

          {currentSearch && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '0.4rem 0.85rem',
              borderRadius: '2px',
              marginTop: '1rem',
              fontSize: '0.85rem'
            }}>
              <span>Search query: <strong>"{currentSearch}"</strong></span>
              <button
                onClick={() => updateFilter('search', '')}
                style={{ color: '#fff', display: 'flex', alignItems: 'center' }}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        {/* Mobile Filter Toggle & Sort Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="btn btn-outline btn-sm mobile-filter-btn"
            style={{ display: 'none' }}
          >
            <Filter size={16} /> Filter Catalogue
          </button>

          <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{products.length}</strong> of <strong>{pagination.totalItems}</strong> pieces
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Sort By:
            </span>
            <select
              value={currentSort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.85rem', minWidth: '170px', fontSize: '0.85rem' }}
            >
              <option value="featured">Curated Selection</option>
              <option value="newest">Newest Arrivals</option>
              <option value="bestseller">Best Sellers</option>
              <option value="rating">Highest Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Layout Grid (Sidebar Filters + Products Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem' }} className="shop-grid-layout">
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="shop-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="btn btn-outline-burgundy btn-sm"
                style={{ width: '100%', display: 'flex', gap: '0.5rem' }}
              >
                <RotateCcw size={14} /> Reset All Filters
              </button>
            )}

            {/* Category Filter */}
            <div>
              <h4 style={{
                fontSize: '0.85rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--color-black)',
                paddingBottom: '0.4rem'
              }}>
                Department
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.88rem' }}>
                <button
                  onClick={() => updateFilter('category', '')}
                  style={{
                    textAlign: 'left',
                    fontWeight: !currentCategory ? '800' : '500',
                    color: !currentCategory ? 'var(--color-burgundy)' : 'var(--color-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.2rem 0'
                  }}
                >
                  <span>All Categories</span>
                  {!currentCategory && <Check size={14} />}
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateFilter('category', cat.slug)}
                    style={{
                      textAlign: 'left',
                      fontWeight: currentCategory === cat.slug ? '800' : '500',
                      color: currentCategory === cat.slug ? 'var(--color-burgundy)' : 'var(--color-text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.2rem 0'
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                      ({cat.product_count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Playing Surface Filter (For boots) */}
            <div>
              <h4 style={{
                fontSize: '0.85rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--color-black)',
                paddingBottom: '0.4rem'
              }}>
                Playing Surface
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'FG', label: 'Firm Ground (FG)' },
                  { id: 'AG', label: 'Artificial (AG)' },
                  { id: 'SG', label: 'Soft Ground (SG)' },
                  { id: 'TF', label: 'Turf / Astro (TF)' },
                  { id: 'IC', label: 'Indoor Court (IC)' }
                ].map((s) => {
                  const isSelected = (s.id === 'ALL' && !currentSurface) || currentSurface === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => updateFilter('surface', s.id === 'ALL' ? '' : s.id)}
                      className={`badge ${isSelected ? 'badge-burgundy' : 'badge-outline'}`}
                      style={{ padding: '0.4rem 0.65rem', cursor: 'pointer', transition: 'all 0.15s' }}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h4 style={{
                fontSize: '0.85rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--color-black)',
                paddingBottom: '0.4rem'
              }}>
                Brand & Makers
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '200px', overflowY: 'auto' }}>
                <button
                  onClick={() => updateFilter('brand', '')}
                  style={{
                    textAlign: 'left',
                    fontWeight: !currentBrand ? '800' : '500',
                    color: !currentBrand ? 'var(--color-burgundy)' : 'var(--color-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.15rem 0'
                  }}
                >
                  <span>All Brands</span>
                  {!currentBrand && <Check size={14} />}
                </button>

                {brands.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => updateFilter('brand', b.slug)}
                    style={{
                      textAlign: 'left',
                      fontWeight: currentBrand === b.slug ? '800' : '500',
                      color: currentBrand === b.slug ? 'var(--color-burgundy)' : 'var(--color-text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.15rem 0'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {b.logo_url && (
                        <img
                          src={b.logo_url}
                          alt=""
                          style={{ width: '18px', height: '18px', objectFit: 'contain', borderRadius: '2px' }}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                      <span>{b.name}</span>
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                      ({b.product_count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 style={{
                fontSize: '0.85rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--color-black)',
                paddingBottom: '0.4rem'
              }}>
                Price Range (₹)
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="number"
                  placeholder="Min (₹)"
                  value={currentMinPrice}
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                  className="form-input"
                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                />
                <span style={{ color: 'var(--color-text-light)' }}>–</span>
                <input
                  type="number"
                  placeholder="Max (₹)"
                  value={currentMaxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  className="form-input"
                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {[
                  { label: 'Under ₹1,500', min: '', max: '1500' },
                  { label: '₹1,500 - ₹4,000', min: '1500', max: '4000' },
                  { label: '₹4,000 - ₹8,000', min: '4000', max: '8000' },
                  { label: 'Over ₹8,000', min: '8000', max: '' }
                ].map((tier) => (
                  <button
                    key={tier.label}
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      if (tier.min) next.set('minPrice', tier.min); else next.delete('minPrice');
                      if (tier.max) next.set('maxPrice', tier.max); else next.delete('maxPrice');
                      next.set('page', '1');
                      setSearchParams(next);
                    }}
                    className="badge badge-outline"
                    style={{ fontSize: '0.7rem', cursor: 'pointer' }}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Checkboxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                <input
                  type="checkbox"
                  checked={currentOnSale}
                  onChange={(e) => updateFilter('onSale', e.target.checked ? 'true' : '')}
                  style={{ accentColor: 'var(--color-burgundy)', width: '16px', height: '16px' }}
                />
                <span>Special Sale Room Only</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                <input
                  type="checkbox"
                  checked={currentInStock}
                  onChange={(e) => updateFilter('inStock', e.target.checked ? 'true' : '')}
                  style={{ accentColor: 'var(--color-burgundy)', width: '16px', height: '16px' }}
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* PRODUCTS GRID AREA */}
          <main>
            {loading ? (
              <div style={{
                textAlign: 'center',
                padding: '6rem 0',
                color: 'var(--color-text-muted)'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  border: '3px solid var(--color-border)',
                  borderTopColor: 'var(--color-burgundy)',
                  borderRadius: '50%',
                  margin: '0 auto 1rem',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <div>Fetching matchday archives...</div>
              </div>
            ) : products.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                backgroundColor: 'var(--color-warm-white)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px'
              }}>
                <h3 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                  NO PIECES MATCH YOUR CRITERIA
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Try resetting your surface filter, price range, or clearing your search term.
                </p>
                <button onClick={resetAllFilters} className="btn btn-burgundy">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                  gap: '1.75rem'
                }}>
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '3.5rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--color-border)'
                  }}>
                    <button
                      onClick={() => updateFilter('page', currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="btn btn-outline btn-sm"
                      style={{ opacity: currentPage <= 1 ? 0.4 : 1 }}
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>

                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        const isCurrent = pageNum === currentPage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => updateFilter('page', pageNum)}
                            className={`btn btn-sm ${isCurrent ? 'btn-burgundy' : 'btn-outline'}`}
                            style={{ minWidth: '36px', padding: '0.4rem 0.6rem' }}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => updateFilter('page', currentPage + 1)}
                      disabled={currentPage >= pagination.totalPages}
                      className="btn btn-outline btn-sm"
                      style={{ opacity: currentPage >= pagination.totalPages ? 0.4 : 1 }}
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Inline styles for spinner and responsive layout */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .shop-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .shop-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Shop;
