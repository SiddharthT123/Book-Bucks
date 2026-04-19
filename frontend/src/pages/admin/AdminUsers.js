import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/AdminUsers.css';
import adminService from '../../services/adminService';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    is_staff: false,
    is_verified: false,
  });
  const [createLoading, setCreateLoading] = useState(false);
  const pageSize = 20;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminService.listUsers(currentPage, pageSize);
      setUsers(data.results || []);
      setTotalPages(Math.ceil(data.total / pageSize));
      setError('');
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUserChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      await adminService.createUser(createFormData);
      setSuccessMessage('User created successfully');
      setCreateFormData({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        is_staff: false,
        is_verified: false,
      });
      setShowCreateForm(false);
      setTimeout(() => {
        setSuccessMessage('');
        setCurrentPage(1);
        fetchUsers();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create user');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleVerifyUser = async (userId) => {
    try {
      await adminService.verifyUser(userId);
      setSuccessMessage('User verified successfully');
      setTimeout(() => {
        setSuccessMessage('');
        fetchUsers();
      }, 1500);
    } catch (err) {
      setError('Failed to verify user');
    }
  };

  const handleDeactivateUser = async (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        await adminService.deactivateUser(userId);
        setSuccessMessage('User deactivated');
        setTimeout(() => {
          setSuccessMessage('');
          fetchUsers();
        }, 1500);
      } catch (err) {
        setError('Failed to deactivate user');
      }
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      await adminService.activateUser(userId);
      setSuccessMessage('User activated');
      setTimeout(() => {
        setSuccessMessage('');
        fetchUsers();
      }, 1500);
    } catch (err) {
      setError('Failed to activate user');
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="header-section">
        <h1>Manage Users</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn btn-primary"
        >
          {showCreateForm ? '✕ Cancel' : '+ Create User'}
        </button>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {showCreateForm && (
        <div className="create-user-form">
          <h2>Create New User</h2>
          <form onSubmit={handleCreateUser}>
            <div className="form-row">
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={createFormData.username}
                  onChange={handleCreateUserChange}
                  required
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={createFormData.email}
                  onChange={handleCreateUserChange}
                  required
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={createFormData.password}
                  onChange={handleCreateUserChange}
                  required
                  placeholder="Enter password"
                  minLength="6"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={createFormData.first_name}
                  onChange={handleCreateUserChange}
                  placeholder="Enter first name"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={createFormData.last_name}
                  onChange={handleCreateUserChange}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  name="is_staff"
                  checked={createFormData.is_staff}
                  onChange={handleCreateUserChange}
                  id="is_staff"
                />
                <label htmlFor="is_staff">Staff Member (Admin access)</label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  name="is_verified"
                  checked={createFormData.is_verified}
                  onChange={handleCreateUserChange}
                  id="is_verified"
                />
                <label htmlFor="is_verified">Verified</label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-success"
                disabled={createLoading}
              >
                {createLoading ? 'Creating...' : 'Create User'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Name</th>
              <th>Status</th>
              <th>Verified</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.username}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>
                    <span className={`badge badge-${user.is_active ? 'success' : 'danger'}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${user.is_verified ? 'success' : 'warning'}`}>
                      {user.is_verified ? 'Verified' : 'Not Verified'}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      {!user.is_verified && (
                        <button
                          onClick={() => handleVerifyUser(user.id)}
                          className="btn btn-sm btn-success"
                          title="Verify user"
                        >
                          ✓ Verify
                        </button>
                      )}
                      {user.is_active ? (
                        <button
                          onClick={() => handleDeactivateUser(user.id)}
                          className="btn btn-sm btn-danger"
                          title="Deactivate user"
                        >
                          ✗ Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivateUser(user.id)}
                          className="btn btn-sm btn-success"
                          title="Activate user"
                        >
                          ✓ Activate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default AdminUsers;
