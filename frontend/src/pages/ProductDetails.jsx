// frontend/src/pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  Share2, 
  Plus, 
  Minus,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { productService, reviewService } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ text: '', type: '' });

  // Review Form States
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await productService.getProductById(identifier);
      if (res.data.success) {
        const prod = res.data.product;
        setProduct(prod);
        setSelectedImage(prod.images?.[0]?.image_url || '/images/products/vintage-1970-football.jpg');
        // Default to first variant with stock, or first variant
        if (prod.variants && prod.variants.length > 0) {
          const available = prod.variants.find((v) => v.stock_quantity > 0) || prod.variants[0];
          setSelectedVariant(available);
        }
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [identifier]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--color-text-muted)' }}>
        Fetching piece from archive...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h2 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>PIECE NOT FOUND</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>This historical item may have been archived or removed.</p>
        <Link to="/shop" className="btn btn-burgundy">Return to Catalogue</Link>
      </div>
    );
  }

  const price = parseFloat(product.price);
  const originalPrice = product.original_price ? parseFloat(product.original_price) : null;
  const isSaved = isInWishlist(product.id);
  const effectivePrice = selectedVariant ? price + parseFloat(selectedVariant.additional_price || 0) : price;

  const handleAddToCart = async (isBuyNow = false) => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (!selectedVariant) {
      setFeedbackMsg({ text: 'Please select a size before adding to bag.', type: 'error' });
      return;
    }

    if (selectedVariant.stock_quantity < quantity) {
      setFeedbackMsg({ text: `Only ${selectedVariant.stock_quantity} left in stock.`, type: 'error' });
      return;
    }

    try {
      setBtnLoading(true);
      await addToCart(selectedVariant.id, quantity);
      setFeedbackMsg({ text: 'Added to your bag.', type: 'success' });
      if (isBuyNow) {
        navigate('/checkout');
      }
    } catch (err) {
      setFeedbackMsg({ text: err.response?.data?.message || 'Failed to add item.', type: 'error' });
    } finally {
      setBtnLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!reviewText.trim()) return;

    try {
      setReviewSubmitting(true);
      const res = await reviewService.addReview({
        productId: product.id,
        rating: reviewRating,
        reviewTitle: reviewTitle.trim(),
        reviewText: reviewText.trim()
      });

      if (res.data.success) {
        setReviewSuccess('Your review has been verified and posted.');
        setReviewTitle('');
        setReviewText('');
        await loadProduct();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="product-details-page animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/shop">Shop</Link> <span>/</span>
          <Link to={`/shop?category=${product.category_slug}`}>{product.category_name}</Link> <span>/</span>
          <span style={{ color: 'var(--color-black)', fontWeight: '700' }}>{product.name}</span>
        </div>

        {/* Main Product Section: Gallery + Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '3.5rem',
          alignItems: 'start',
          marginBottom: '4.5rem'
        }}>
          {/* LEFT: IMAGE GALLERY */}
          <div>
            {/* Primary Viewer */}
            <div style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              backgroundColor: '#EDE7DC',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--color-border)',
              marginBottom: '1rem'
            }}>
              <img
                src={selectedImage}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {product.discount_percent > 0 && (
                <span className="badge badge-burgundy" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  -{product.discount_percent}% OFF
                </span>
              )}

              {product.era && (
                <span className="badge badge-black" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  ERA {product.era}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image_url)}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      border: selectedImage === img.image_url ? '2px solid var(--color-burgundy)' : '1px solid var(--color-border)',
                      opacity: selectedImage === img.image_url ? 1 : 0.65,
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <img src={img.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO & VARIANT SELECTOR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '0.5rem'
              }}>
                {product.brand_logo && (
                  <img
                    src={product.brand_logo}
                    alt={product.brand_name}
                    style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '3px' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-burgundy)',
                  fontWeight: '800',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}>
                  {product.brand_name} • {product.category_name}
                </span>
              </div>

              <h1 className="font-display" style={{
                fontSize: '2.5rem',
                lineHeight: '1.1',
                color: 'var(--color-black)',
                marginBottom: '0.75rem'
              }}>
                {product.name}
              </h1>

              {/* Star Rating & Review count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating || 5) ? 'var(--color-gold)' : 'none'}
                      stroke="var(--color-gold)"
                    />
                  ))}
                </div>
                <span style={{ fontWeight: '700', fontSize: '0.88rem' }}>
                  {parseFloat(product.rating || 5.0).toFixed(1)}
                </span>
                <span style={{ color: 'var(--color-text-light)', fontSize: '0.82rem' }}>
                  • {product.reviews?.length || 0} Verified Collector Reviews
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              padding: '1rem 0',
              borderTop: '1px solid var(--color-border)',
              borderBottom: '1px solid var(--color-border)'
            }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: product.discount_percent > 0 ? 'var(--color-burgundy)' : 'var(--color-black)'
              }}>
                ₹{effectivePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {originalPrice && (
                <span style={{
                  fontSize: '1.15rem',
                  color: 'var(--color-text-light)',
                  textDecoration: 'line-through'
                }}>
                  ₹{originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
              {product.discount_percent > 0 && (
                <span style={{ fontSize: '0.82rem', color: 'var(--color-burgundy)', fontWeight: '700' }}>
                  Save ₹{(originalPrice - effectivePrice).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} today
                </span>
              )}
            </div>

            {/* Boot Surface Tag if Applicable */}
            {product.playing_surface && product.playing_surface !== 'N/A' && (
              <div style={{
                backgroundColor: 'var(--color-cream)',
                border: '1px solid var(--color-border)',
                padding: '0.75rem 1rem',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '0.85rem'
              }}>
                <Sparkles size={16} color="var(--color-gold)" />
                <span>
                  Playing Surface Engineering: <strong>{product.playing_surface}</strong> (Firm Natural Pitch Spec)
                </span>
              </div>
            )}

            {/* Size & Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    Select Size / Fit:
                  </label>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {selectedVariant?.stock_quantity > 0 ? (
                      <span style={{ color: '#166534', fontWeight: '700' }}>
                        ● {selectedVariant.stock_quantity} In Stock
                      </span>
                    ) : (
                      <span style={{ color: '#DC2626', fontWeight: '700' }}>
                        ● Out of Stock
                      </span>
                    )}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    const isOut = v.stock_quantity === 0;

                    return (
                      <button
                        key={v.id}
                        disabled={isOut}
                        onClick={() => setSelectedVariant(v)}
                        style={{
                          padding: '0.6rem 1rem',
                          border: isSelected ? '2px solid var(--color-burgundy)' : '1px solid var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-burgundy)' : (isOut ? '#F0EDE6' : 'var(--color-warm-white)'),
                          color: isSelected ? '#FFFFFF' : (isOut ? 'var(--color-text-light)' : 'var(--color-black)'),
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          borderRadius: '2px',
                          cursor: isOut ? 'not-allowed' : 'pointer',
                          textDecoration: isOut ? 'line-through' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector + Add to Cart CTAs */}
            <div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                {/* Quantity Buttons */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-warm-white)',
                  borderRadius: '2px'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0.75rem 0.9rem', color: 'var(--color-black)' }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span style={{
                    minWidth: '32px',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: '0.95rem'
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant?.stock_quantity || 10, quantity + 1))}
                    style={{ padding: '0.75rem 0.9rem', color: 'var(--color-black)' }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={() => handleAddToCart(false)}
                  disabled={btnLoading || !selectedVariant || selectedVariant.stock_quantity === 0}
                  className="btn btn-burgundy"
                  style={{ flex: 1, padding: '0.85rem' }}
                >
                  <ShoppingBag size={18} /> Add to Matchday Bag
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={async () => {
                    if (!isAuthenticated) navigate('/login');
                    else await toggleWishlist(product.id);
                  }}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '2px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: isSaved ? 'var(--color-burgundy)' : 'var(--color-warm-white)',
                    color: isSaved ? '#FFFFFF' : 'var(--color-black)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={20} fill={isSaved ? '#FFFFFF' : 'none'} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={() => handleAddToCart(true)}
                disabled={btnLoading || !selectedVariant || selectedVariant.stock_quantity === 0}
                className="btn btn-black"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Instant Checkout
              </button>

              {feedbackMsg.text && (
                <div style={{
                  marginTop: '0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: feedbackMsg.type === 'error' ? '#DC2626' : '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  {feedbackMsg.type === 'error' ? <AlertCircle size={15} /> : <Check size={15} />}
                  <span>{feedbackMsg.text}</span>
                </div>
              )}
            </div>

            {/* Delivery & Care Micro-Benefits */}
            <div style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Truck size={17} style={{ color: 'var(--color-burgundy)' }} />
                <span>Tracked Express Delivery across India. Free on orders over ₹1,999.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <RotateCcw size={17} style={{ color: 'var(--color-burgundy)' }} />
                <span>30-Day Hassle-Free Returns on unworn items.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <ShieldCheck size={17} style={{ color: 'var(--color-burgundy)' }} />
                <span>Authentic vintage reproduction with matchday grade materials.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Technical Specifications Tabs */}
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '2.5rem',
          marginBottom: '4rem'
        }}>
          <h3 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '1rem', borderBottom: '2px solid var(--color-black)', paddingBottom: '0.5rem' }}>
            HISTORIC SPECIFICATIONS & CURATOR NOTES
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                The Story & Design
              </h4>
              <p style={{ color: 'var(--color-text-main)', lineHeight: '1.8', fontSize: '0.92rem' }}>
                {product.description}
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Fabrication & Construction
              </h4>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                {product.details || 'Manufactured using heritage-correct fabrics, period-accurate badge embroideries, and durable reinforced stitching designed for pitch or streetwear wearability.'}
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--color-gold)' }}>
                SKU Reference: <strong>{selectedVariant?.sku || 'RETRO-ATELIER-01'}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '2.5rem',
          marginBottom: '4rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            borderBottom: '2px solid var(--color-black)',
            paddingBottom: '0.75rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.8rem', margin: 0 }}>
                VERIFIED COLLECTOR REVIEWS ({product.reviews?.length || 0})
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" stroke="none" />)}
              </div>
              <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{parseFloat(product.rating || 5.0).toFixed(1)} / 5.0</span>
            </div>
          </div>

          {/* Existing Reviews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{rev.reviewer_name}</span>
                      {rev.is_verified_buyer && (
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                      {new Date(rev.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < rev.rating ? 'var(--color-gold)' : 'none'} stroke="var(--color-gold)" />
                    ))}
                  </div>

                  {rev.review_title && (
                    <div style={{ fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.25rem', color: 'var(--color-black)' }}>
                      {rev.review_title}
                    </div>
                  )}

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                    "{rev.review_text}"
                  </p>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                No reviews yet for this piece. Be the first collector to review it below.
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div style={{
            backgroundColor: 'var(--color-cream)',
            padding: '1.75rem',
            borderRadius: '2px',
            border: '1px solid var(--color-border)'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Leave a Collector Review
            </h4>

            {reviewSuccess ? (
              <div style={{ color: '#166534', fontWeight: '700', fontSize: '0.9rem' }}>
                {reviewSuccess}
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">Your Rating (1 to 5 Stars):</label>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        style={{ color: 'var(--color-gold)', display: 'flex' }}
                      >
                        <Star size={22} fill={star <= reviewRating ? 'var(--color-gold)' : 'none'} stroke="var(--color-gold)" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="form-label">Review Title (Optional):</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Masterpiece craftsmanship, pristine fit"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Your Detailed Review:</label>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell other supporters about the fabric touch, fit, or pitch performance..."
                    required
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="btn btn-burgundy"
                  style={{ alignSelf: 'flex-start' }}
                >
                  {reviewSubmitting ? 'Posting...' : 'Submit Verified Review'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {product.related && product.related.length > 0 && (
          <div>
            <span className="editorial-tag">COMPLEMENTARY PIECES</span>
            <h3 className="font-display" style={{ fontSize: '2.2rem', marginTop: '0.35rem', marginBottom: '2rem' }}>
              YOU MAY ALSO ADMIRE
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}>
              {product.related.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
