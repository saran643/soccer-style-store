// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Compass, 
  Star, 
  Quote, 
  TrendingUp, 
  Check, 
  Layers 
} from 'lucide-react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [collections, setCollections] = useState({
    bestSellers: [],
    newArrivals: [],
    theArchive: [],
    matchdayEssentials: [],
    specialOffers: []
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [featRes, catRes] = await Promise.all([
          productService.getFeatured(),
          productService.getCategories()
        ]);

        if (featRes.data.success) {
          setCollections(featRes.data);
        }
        if (catRes.data.success) {
          setCategories(catRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="home-page animate-fade-in">
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-cream)',
        borderBottom: '2px solid var(--color-burgundy)',
        overflow: 'hidden'
      }}>
        {/* Editorial Background Image with Film Grain Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1920&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          opacity: 0.32,
          filter: 'contrast(120%) grayscale(25%)'
        }} />

        <div className="container" style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '6rem',
          paddingBottom: '6.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '1280px'
        }}>
          {/* Editorial Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'rgba(114, 28, 50, 0.45)',
            border: '1px solid rgba(183, 154, 99, 0.35)',
            padding: '0.35rem 0.85rem',
            borderRadius: '2px',
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={14} style={{ color: 'var(--color-gold-light)' }} />
            <span style={{
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-light)',
              fontWeight: '700'
            }}>
              VINTAGE FOOTBALL CULTURE & BOUTIQUE
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display" style={{
            fontSize: 'clamp(3rem, 7vw, 6.2rem)',
            lineHeight: '0.94',
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            maxWidth: '920px',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            THE BEAUTIFUL GAME. <span style={{ color: 'var(--color-gold-light)' }}>FOREVER.</span>
          </h1>

          {/* Supporting Text */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
            color: 'var(--color-cream)',
            maxWidth: '680px',
            lineHeight: '1.6',
            marginBottom: '2.5rem',
            opacity: 0.95,
            fontFamily: 'var(--font-sans)',
            fontWeight: '300'
          }}>
            Classic kits. Timeless culture. Everything football. Step onto the pitch with authentic retro jerseys, handcrafted Kangaroo leather boots, and pro-spec matchday essentials.
          </p>

          {/* Hero Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/shop?category=retro-jerseys" className="btn btn-burgundy btn-lg">
              SHOP RETRO JERSEYS <ArrowRight size={18} />
            </Link>
            <Link to="/shop" className="btn btn-outline btn-lg" style={{ color: 'var(--color-cream)', borderColor: 'rgba(255,255,255,0.3)' }}>
              EXPLORE THE COLLECTION
            </Link>
          </div>

          {/* Micro badges below hero */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginTop: '3.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            flexWrap: 'wrap',
            fontSize: '0.78rem',
            color: 'rgba(245, 240, 230, 0.75)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={16} color="var(--color-gold)" /> Hand-inspected stitch fidelity
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={16} color="var(--color-gold)" /> Pro silicone grip technology
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={16} color="var(--color-gold)" /> Real MySQL inventory tracking
            </span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span className="editorial-tag">CURATED DEPARTMENTS</span>
              <h2 className="font-display" style={{ fontSize: '2.4rem', marginTop: '0.35rem' }}>
                EXPLORE BY FOOTBALL DISCIPLINE
              </h2>
            </div>
            <Link to="/shop" style={{
              fontSize: '0.82rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-burgundy)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              View Full Index <ArrowRight size={16} />
            </Link>
          </div>

          {/* Categories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--color-border)'
                }}
                className="category-card"
              >
                {/* Background Image with Zoom */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${cat.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease'
                }} className="category-bg" />

                {/* Dark Vignette Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(23,23,23,0.1) 0%, rgba(23,23,23,0.85) 100%)'
                }} />

                {/* Card Text */}
                <div style={{ position: 'relative', zIndex: 2, color: 'var(--color-cream)' }}>
                  <div style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold-light)',
                    fontWeight: '700'
                  }}>
                    {cat.product_count} Products In Catalogue
                  </div>
                  <h3 className="font-display" style={{
                    fontSize: '1.75rem',
                    color: '#FFFFFF',
                    letterSpacing: '0.04em',
                    marginTop: '0.2rem',
                    lineHeight: '1.1'
                  }}>
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL COLLECTION: THE ARCHIVE (Retro Jerseys) */}
      <section style={{
        padding: '4.5rem 0',
        backgroundColor: 'var(--color-warm-white)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span className="editorial-tag">THE ARCHIVE</span>
              <h2 className="font-display" style={{ fontSize: '2.5rem', marginTop: '0.35rem' }}>
                CLASSIC RETRO KITS & HISTORIC CAMPAIGNS
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '600px', marginTop: '0.25rem' }}>
                From Pasadena 94 to Saint-Denis 98 and Old Trafford 92. Authentic recreations with period-correct collar cords, flock sponsors, and woven badges.
              </p>
            </div>
            <Link to="/shop?category=retro-jerseys" className="btn btn-outline-burgundy btn-sm">
              Explore All Jerseys ({collections.theArchive.length}+)
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {collections.theArchive.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. EDITORIAL BANNER: MATCHDAY ESSENTIALS */}
      <section style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-light)',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Compass size={14} /> MATCHDAY WEAPONRY
            </span>
            <h2 className="font-display" style={{
              fontSize: '3.2rem',
              lineHeight: '1',
              color: '#FFFFFF',
              marginTop: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              K-LEATHER TOUCH. <br />
              <span style={{ color: 'var(--color-gold-light)' }}>ANTI-SLIP LOCKDOWN.</span>
            </h2>
            <p style={{
              color: 'rgba(245, 240, 230, 0.85)',
              fontSize: '1rem',
              lineHeight: '1.7',
              marginBottom: '2rem'
            }}>
              Experience the unmatched touch of pure Kangaroo leather in our Copa Mundial and Puma King boot selections. Pair them with our dual-surface anti-slip grip socks and ultralight carbon fibre shin shields for modern matchday dominance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/shop?category=football-boots" className="btn btn-burgundy">
                SHOP FOOTBALL BOOTS
              </Link>
              <Link to="/shop?category=socks-grip" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                DISCOVER GRIP SOCKS
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <img
                src="/images/products/predator-mania-2002.jpg"
                alt="Matchday boots and pitch essentials"
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Info Pill */}
            <div style={{
              position: 'absolute',
              bottom: '-18px',
              left: '24px',
              backgroundColor: 'var(--color-warm-white)',
              color: 'var(--color-black)',
              padding: '0.75rem 1.25rem',
              borderRadius: '2px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              border: '1px solid var(--color-gold)'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#166534',
                boxShadow: '0 0 0 3px rgba(22, 101, 52, 0.2)'
              }} />
              <div style={{ fontSize: '0.78rem', fontWeight: '700' }}>
                MATCHDAY DISPATCH: <span style={{ color: 'var(--color-burgundy)' }}>ORDER BY 3PM FOR SAME-DAY PACKING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS & TRENDING GRID */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span className="editorial-tag">COLLECTORS' FAVORITES</span>
              <h2 className="font-display" style={{ fontSize: '2.5rem', marginTop: '0.35rem' }}>
                BEST SELLERS & PITCH ICONS
              </h2>
            </div>
            <Link to="/shop?sort=bestseller" className="btn btn-black btn-sm">
              View All Best Sellers
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {collections.bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPECIAL OFFERS / SALE ROOM */}
      <section style={{
        padding: '4.5rem 0',
        backgroundColor: 'var(--color-warm-white)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-burgundy">SPECIAL PROMOTIONS</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-burgundy)' }}>UP TO 25% OFF</span>
              </div>
              <h2 className="font-display" style={{ fontSize: '2.5rem', marginTop: '0.35rem' }}>
                THE ARCHIVAL SALE ROOM
              </h2>
            </div>
            <Link to="/shop?onSale=true" className="btn btn-burgundy btn-sm">
              Enter The Sale Room
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {collections.specialOffers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. HERITAGE BRANDS */}
      <section style={{ padding: '3.5rem 0', backgroundColor: 'var(--color-cream)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="editorial-tag" style={{ justifyContent: 'center' }}>ESTEEMED HERITAGE</span>
          <h3 className="font-display" style={{ fontSize: '1.8rem', marginTop: '0.35rem', marginBottom: '2rem' }}>
            FEATURED BRANDS OF THE BEAUTIFUL GAME
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            opacity: 0.75
          }}>
            {['UMBRO', 'ADIDAS ORIGINALS', 'NIKE HERITAGE', 'KAPPA', 'LOTTO', 'PUMA KING', 'MITRE', 'REUSCH'].map((brand) => (
              <span
                key={brand}
                className="font-display"
                style={{
                  fontSize: '1.5rem',
                  letterSpacing: '0.08em',
                  color: 'var(--color-black)'
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section style={{
        padding: '4.5rem 0',
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-light)',
              fontWeight: '700'
            }}>
              VOICES FROM THE TERRACES
            </span>
            <h2 className="font-display" style={{ fontSize: '2.5rem', color: '#FFFFFF', marginTop: '0.35rem' }}>
              WHAT FOOTBALL COLLECTORS ARE SAYING
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: '#141414',
              padding: '2rem',
              borderRadius: '2px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="var(--color-gold)" stroke="none" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--color-cream)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                "The 1998 France shirt arrived in pristine packaging. The jacquard fabric texture and flock numbers are identical to the shirt Zidane wore on that July night. This store is doing God's work for kit history."
              </p>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#FFFFFF' }}>Liam Henderson</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>Verified Collector • London</div>
            </div>

            <div style={{
              backgroundColor: '#141414',
              padding: '2rem',
              borderRadius: '2px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="var(--color-gold)" stroke="none" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--color-cream)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                "Switched from synthetic boots back to the Copa Mundial and Pro Tech grip socks. Night and day difference. Zero foot roll inside the boot and unmatched first touch. Fast courier dispatch too."
              </p>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#FFFFFF' }}>Marcus Gallagher</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>Semi-Pro Midfielder • Manchester</div>
            </div>

            <div style={{
              backgroundColor: '#141414',
              padding: '2rem',
              borderRadius: '2px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="var(--color-gold)" stroke="none" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--color-cream)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                "The hand-stitched 1970 leather football is sitting proudly in my study. The leather craftsmanship and vintage valve detail are sublime. A true football boutique with authentic soul."
              </p>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#FFFFFF' }}>Alessandro Rossi</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>Curator • Milan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hover effect styling for category cards */}
      <style>{`
        .category-card:hover .category-bg {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
};

export default Home;
