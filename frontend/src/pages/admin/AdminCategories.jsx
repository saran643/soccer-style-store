// frontend/src/pages/admin/AdminCategories.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Plus, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { productService, adminService } from '../../services/api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await productService.getCategories();
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      setMsg({ text: '', type: '' });
      await adminService.createCategory({
        name: name.trim(),
        description: description.trim(),
        image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80'
      });
      setMsg({ text: 'Category created successfully.', type: 'success' });
      setName('');
      setDescription('');
      setImageUrl('');
      setShowAddForm(false);
      await loadCategories();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to create category.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-categories animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
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
              DEPARTMENT & CATEGORY MANAGEMENT
            </span>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-burgundy btn-sm"
          >
            <Plus size={16} /> {showAddForm ? 'Cancel' : 'Add Category'}
          </button>
        </div>

        {msg.text && (
          <div style={{
            backgroundColor: msg.type === 'error' ? '#FEE2E2' : '#DCFCE7',
            color: msg.type === 'error' ? '#991B1B' : '#166534',
            padding: '0.75rem 1rem',
            borderRadius: '2px',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}>
            {msg.text}
          </div>
        )}

        {showAddForm && (
          <form onSubmit={handleCreate} style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '1.75rem',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', textTransform: 'uppercase' }}>
              Create New Department
            </h4>
            <div>
              <label className="form-label">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Training Jerseys & Track Jackets"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Archival summary..."
                className="form-textarea"
              />
            </div>
            <div>
              <label className="form-label">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="form-input"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn btn-burgundy btn-sm" style={{ alignSelf: 'flex-start' }}>
              {submitting ? 'Creating...' : 'Save Category'}
            </button>
          </form>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {categories.map((c) => (
            <div key={c.id} className="card-surface" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img
                  src={c.image_url}
                  alt={c.name}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '2px', marginBottom: '1rem' }}
                />
                <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{c.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                  {c.description}
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>
                  {c.product_count} Products Listed
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                  Slug: {c.slug}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
