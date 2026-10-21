// frontend/src/pages/admin/AdminProducts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle, 
  ArrowLeft,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { adminService, productService } from '../../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category_id: 1,
    brand_id: 1,
    price: '',
    original_price: '',
    discount_percent: 0,
    playing_surface: 'N/A',
    era: 'Classic',
    description: '',
    details: '',
    image_url: '',
    is_featured: false,
    is_bestseller: false,
    is_new_arrival: true
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState({ text: '', type: '' });

  const loadData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, brandRes] = await Promise.all([
        adminService.getProducts({ search, category: categoryFilter }),
        productService.getCategories(),
        productService.getBrands()
      ]);

      if (prodRes.data.success) setProducts(prodRes.data.products);
      if (catRes.data.success) setCategories(catRes.data.data);
      if (brandRes.data.success) setBrands(brandRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category_id: categories[0]?.id || 1,
      brand_id: brands[0]?.id || 1,
      price: '',
      original_price: '',
      discount_percent: 0,
      playing_surface: 'N/A',
      era: 'Classic',
      description: '',
      details: '',
      image_url: '',
      is_featured: false,
      is_bestseller: false,
      is_new_arrival: true
    });
    setFormMsg({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category_id: p.category_id,
      brand_id: p.brand_id,
      price: p.price,
      original_price: p.original_price || '',
      discount_percent: p.discount_percent || 0,
      playing_surface: p.playing_surface || 'N/A',
      era: p.era || 'Classic',
      description: p.description || '',
      details: p.details || '',
      image_url: p.primary_image || '',
      is_featured: !!p.is_featured,
      is_bestseller: !!p.is_bestseller,
      is_new_arrival: !!p.is_new_arrival,
      status: p.status
    });
    setFormMsg({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      setFormMsg({ text: '', type: '' });

      if (editingProduct) {
        await adminService.updateProduct(editingProduct.id, formData);
        setFormMsg({ text: 'Product updated successfully.', type: 'success' });
      } else {
        await adminService.createProduct(formData);
        setFormMsg({ text: 'Product created with default variants.', type: 'success' });
      }

      await loadData();
      setTimeout(() => setIsModalOpen(false), 900);
    } catch (err) {
      setFormMsg({ text: err.response?.data?.message || 'Failed to save product.', type: 'error' });
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete or archive "${name}"?`)) return;
    try {
      const res = await adminService.deleteProduct(id);
      alert(res.data.message);
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product.');
    }
  };

  return (
    <div className="admin-products animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Navigation bar */}
        <div style={{
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-cream)',
          padding: '1rem 1.5rem',
          borderRadius: '2px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link to="/admin" style={{ color: 'var(--color-cream)', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display" style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>
              PRODUCT & INVENTORY CATALOGUE
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={openCreateModal} className="btn btn-burgundy btn-sm">
              <Plus size={16} /> Add New Kit / Product
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1 1 300px' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by product or brand name..."
              className="form-input"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            />
            <button type="submit" className="btn btn-black btn-sm">
              <Search size={15} />
            </button>
          </form>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-select"
            style={{ width: '220px', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        <div style={{
          backgroundColor: 'var(--color-warm-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-cream)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Piece</th>
                <th style={{ padding: '0.85rem 1rem' }}>Department</th>
                <th style={{ padding: '0.85rem 1rem' }}>Brand</th>
                <th style={{ padding: '0.85rem 1rem' }}>Price</th>
                <th style={{ padding: '0.85rem 1rem' }}>Total Stock</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Loading database records...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center' }}>
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={p.primary_image}
                        alt=""
                        style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '2px', backgroundColor: 'var(--color-cream)' }}
                      />
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--color-black)' }}>{p.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                          ERA {p.era} {p.playing_surface !== 'N/A' && `• ${p.playing_surface}`}
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-main)' }}>
                      {p.category_name}
                    </td>

                    <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>
                      {p.brand_name}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ fontWeight: '800' }}>₹{parseFloat(p.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      {p.discount_percent > 0 && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-burgundy)', marginLeft: '0.35rem' }}>
                          (-{p.discount_percent}%)
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        fontWeight: '700',
                        color: p.total_stock <= 5 ? '#DC2626' : 'var(--color-black)'
                      }}>
                        {p.total_stock} units
                      </span>
                      {p.total_stock <= 5 && (
                        <span style={{ fontSize: '0.7rem', color: '#DC2626', marginLeft: '0.35rem' }}>(Low)</span>
                      )}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${p.status === 'active' ? 'badge-gold' : 'badge-outline'}`} style={{ fontSize: '0.68rem' }}>
                        {p.status}
                      </span>
                    </td>

                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => openEditModal(p)}
                          style={{ color: 'var(--color-black)', padding: '0.25rem' }}
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          style={{ color: '#DC2626', padding: '0.25rem' }}
                          title="Delete or Archive Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal: Add / Edit Product */}
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: 'var(--color-warm-white)',
              borderRadius: '4px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-black)', paddingBottom: '0.5rem' }}>
                <h3 className="font-display" style={{ fontSize: '1.6rem', margin: 0 }}>
                  {editingProduct ? 'EDIT ARCHIVE PIECE' : 'ADD NEW CATALOGUE ITEM'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {formMsg.text && (
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: formMsg.type === 'error' ? '#FEE2E2' : '#DCFCE7',
                  color: formMsg.type === 'error' ? '#991B1B' : '#166534',
                  fontSize: '0.85rem',
                  marginBottom: '1rem'
                }}>
                  {formMsg.text}
                </div>
              )}

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Department / Category *</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value, 10) })}
                      className="form-select"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Brand Maker *</label>
                    <select
                      value={formData.brand_id}
                      onChange={(e) => setFormData({ ...formData, brand_id: parseInt(e.target.value, 10) })}
                      className="form-select"
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Price (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Original Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.original_price}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Discount %</label>
                    <input
                      type="number"
                      value={formData.discount_percent}
                      onChange={(e) => setFormData({ ...formData, discount_percent: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Surface (Boots)</label>
                    <select
                      value={formData.playing_surface}
                      onChange={(e) => setFormData({ ...formData, playing_surface: e.target.value })}
                      className="form-select"
                    >
                      <option value="N/A">N/A (Clothing / Equipment)</option>
                      <option value="FG">Firm Ground (FG)</option>
                      <option value="AG">Artificial Ground (AG)</option>
                      <option value="SG">Soft Ground (SG)</option>
                      <option value="TF">Turf (TF)</option>
                      <option value="IC">Indoor Court (IC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Era / Year</label>
                    <input
                      type="text"
                      value={formData.era}
                      onChange={(e) => setFormData({ ...formData, era: e.target.value })}
                      placeholder="e.g. 1998, 1990, Classic"
                      className="form-input"
                    />
                  </div>
                </div>

                {!editingProduct && (
                  <div>
                    <label className="form-label">Primary Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="form-input"
                    />
                  </div>
                )}

                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                {/* Flags Checkboxes */}
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    <span>Featured on Home</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_bestseller}
                      onChange={(e) => setFormData({ ...formData, is_bestseller: e.target.checked })}
                    />
                    <span>Bestseller Badge</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_new_arrival}
                      onChange={(e) => setFormData({ ...formData, is_new_arrival: e.target.checked })}
                    />
                    <span>New Arrival</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" disabled={formSubmitting} className="btn btn-burgundy">
                    {formSubmitting ? 'Saving...' : 'Save Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
