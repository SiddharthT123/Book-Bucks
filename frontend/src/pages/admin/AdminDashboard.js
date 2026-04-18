import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AdminDashboard.css';
import adminService from '../../services/adminService';
import bookService from '../../services/bookService';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, inventoryData, pendingData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getInventorySummary(),
        bookService.getPendingBooks().catch(() => []),
      ]);
      setStats(statsData);
      setInventory(inventoryData);
      const pending = Array.isArray(pendingData) ? pendingData : (pendingData.results || []);
      setPendingCount(pending.length);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users">👥</div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-number">{stats.total_users}</p>
              <small>{stats.verified_users} verified</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon books">📚</div>
            <div className="stat-content">
              <h3>Total Books</h3>
              <p className="stat-number">{stats.total_books}</p>
              <small>{stats.available_books} available</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon inventory">📦</div>
            <div className="stat-content">
              <h3>Categories</h3>
              <p className="stat-number">{stats.total_categories}</p>
              <small>Book categories</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon price">💰</div>
            <div className="stat-content">
              <h3>Total Inventory Value</h3>
              <p className="stat-number">${inventory?.total_value || 0}</p>
              <small>Avg: ${inventory?.average_book_price || 0}</small>
            </div>
          </div>

          <div className="stat-card" style={{ borderLeft: pendingCount > 0 ? '4px solid #f59e0b' : undefined }}>
            <div className="stat-icon" style={{ fontSize: '2rem' }}>⏳</div>
            <div className="stat-content">
              <h3>Pending Approvals</h3>
              <p className="stat-number" style={{ color: pendingCount > 0 ? '#d97706' : undefined }}>
                {pendingCount}
              </p>
              <small>
                {pendingCount > 0
                  ? <Link to="/admin/approvals" style={{ color: '#d97706', fontWeight: 600 }}>Review now →</Link>
                  : 'All up to date'}
              </small>
            </div>
          </div>
        </div>
      )}

      <div className="admin-grid">
        <QuickLink to="/admin/users" title="Manage Users" icon="👥" />
        <QuickLink to="/admin/books" title="Manage Books" icon="📚" />
        <QuickLink to="/admin/approvals" title="Approve Books" icon="⏳" badge={pendingCount} />
        <QuickLink to="/admin/categories" title="Manage Categories" icon="🏷️" />
        <QuickLink to="http://localhost:8000/admin/" title="Django Admin" icon="⚙️" external />
      </div>
    </div>
  );
}

function QuickLink({ to, title, icon, badge, external }) {
  const inner = (
    <>
      {badge > 0 && (
        <span style={{
          position: 'absolute', top: 10, right: 12,
          background: '#f59e0b', color: '#fff',
          borderRadius: '50%', width: 22, height: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 700,
        }}>
          {badge}
        </span>
      )}
      <div className="quick-link-icon">{icon}</div>
      <h3>{title}</h3>
      <p>Manage →</p>
    </>
  );

  if (external) {
    return (
      <a href={to} className="quick-link-card" style={{ position: 'relative' }} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link to={to} className="quick-link-card" style={{ position: 'relative' }}>
      {inner}
    </Link>
  );
}

export default AdminDashboard;
