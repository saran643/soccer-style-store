// frontend/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        Verifying administrator credentials...
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login?redirect=/admin" replace />;
  }

  return children;
};

export default AdminRoute;
