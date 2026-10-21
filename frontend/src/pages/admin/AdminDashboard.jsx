// frontend/src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  Package, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar,
  Layers,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { adminService } from '../../services/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--color-text-muted)' }}>
        Aggregating sales analytics from MySQL relational database...
      </div>
    );
  }

  const { metrics, salesChartData, topSellingProducts, recentOrders, lowStockVariants } = data;

  return (
    <div className="admin-dashboard animate-fade-in" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Admin Navigation Sub-Bar */}
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
            <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>ADMIN PANEL</span>
            <span className="font-display" style={{ fontSize: '1.4rem', color: '#FFFFFF', letterSpacing: '0.04em' }}>
              RETRO STORE OPERATIONS SUITE
            </span>
          </div>

          <nav style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>
            <Link to="/admin" style={{ color: 'var(--color-gold-light)', borderBottom: '2px solid var(--color-gold-light)', paddingBottom: '2px' }}>
              Dashboard
            </Link>
            <Link to="/admin/products" style={{ color: 'var(--color-cream)' }}>
              Products & Stock
            </Link>
            <Link to="/admin/orders" style={{ color: 'var(--color-cream)' }}>
              Orders
            </Link>
            <Link to="/admin/categories" style={{ color: 'var(--color-cream)' }}>
              Categories
            </Link>
            <Link to="/admin/coupons" style={{ color: 'var(--color-cream)' }}>
              Coupons
            </Link>
            <Link to="/admin/users" style={{ color: 'var(--color-cream)' }}>
              Customers
            </Link>
          </nav>
        </div>

        {/* 1. KPI Cards Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Total Revenue */}
          <div className="card-surface" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                Total Revenue
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(22, 101, 52, 0.1)', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-black)' }}>
              ₹{metrics.totalSales.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '600', marginTop: '0.25rem' }}>
              Live SQL JOIN & SUM Aggregation
            </div>
          </div>

          {/* Total Orders */}
          <div className="card-surface" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                Total Orders
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(114, 28, 50, 0.1)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-black)' }}>
              {metrics.totalOrders}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              Avg Order Value: <strong>₹{metrics.averageOrderValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
          </div>

          {/* Active Catalogue Products */}
          <div className="card-surface" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                Active Products
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(183, 154, 99, 0.15)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-black)' }}>
              {metrics.totalProducts}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              Across 8 football departments
            </div>
          </div>

          {/* Registered Customers */}
          <div className="card-surface" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                Registered Customers
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(23, 23, 23, 0.08)', color: 'var(--color-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-black)' }}>
              {metrics.totalCustomers}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              Bcrypt hashed security
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="card-surface" style={{ padding: '1.5rem', borderLeft: '4px solid #DC2626' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#DC2626' }}>
                Low-Stock Alerts
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#DC2626' }}>
              {metrics.lowStockCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: '600', marginTop: '0.25rem' }}>
              Variants with ≤ 5 units in stock
            </div>
          </div>
        </div>

        {/* 2. Charts Row: Revenue Trend & Top Sellers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Revenue Chart */}
          <div className="card-surface" style={{ padding: '1.75rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="var(--color-burgundy)" /> REVENUE TRAJECTORY (RECHARTS)
            </h3>
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#721C32" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#721C32" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2DBD0" />
                  <XAxis dataKey="date_label" stroke="#666055" fontSize={12} />
                  <YAxis stroke="#666055" fontSize={12} tickFormatter={(val) => `₹${Number(val).toLocaleString('en-IN')}`} />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#721C32" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="card-surface" style={{ padding: '1.75rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={18} color="var(--color-gold)" /> BEST-SELLING PRODUCTS (UNITS SOLD)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {topSellingProducts.map((p, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '0.75rem',
                  borderBottom: idx !== topSellingProducts.length - 1 ? '1px solid var(--color-border)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-cream)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '800'
                    }}>
                      {idx + 1}
                    </span>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{p.product_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {p.total_sold} units dispatched
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-black)' }}>
                    ₹{parseFloat(p.total_revenue).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Operational Sections: Low Stock Table & Recent Orders */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '2rem'
        }}>
          {/* Low Stock Alerts */}
          <div className="card-surface" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="font-display" style={{ fontSize: '1.4rem', margin: 0, color: '#DC2626', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} /> INVENTORY RE-ORDER REQUIRED
              </h3>
              <Link to="/admin/products" style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-burgundy)', textTransform: 'uppercase' }}>
                Manage All →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {lowStockVariants.slice(0, 5).map((v) => (
                <div key={v.variant_id} style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-cream)',
                  borderRadius: '2px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.85rem'
                }}>
                  <div>
                    <div style={{ fontWeight: '700' }}>{v.product_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      SKU: {v.sku} • Size: {v.size} ({v.color})
                    </div>
                  </div>
                  <span className="badge badge-burgundy" style={{ fontSize: '0.75rem' }}>
                    {v.stock_quantity} left
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card-surface" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="font-display" style={{ fontSize: '1.4rem', margin: 0 }}>
                RECENT ORDERS
              </h3>
              <Link to="/admin/orders" style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-burgundy)', textTransform: 'uppercase' }}>
                View All Orders →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentOrders.map((o) => (
                <div key={o.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  fontSize: '0.85rem'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--color-burgundy)' }}>{o.order_number}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {o.recipient_name} • {new Date(o.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '800' }}>₹{parseFloat(o.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <span className="badge-status status-confirmed" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                      {o.order_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
