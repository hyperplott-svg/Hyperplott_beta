import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/Dashboard';
import CreateDesign from './pages/CreateDesign';
import DesignViewer from './pages/DesignViewer';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/layout/MainLayout';
import DOEToolPage from './pages/DOEToolPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Simple redirection logic for root and catch-all
const RootRedirect = () => {
  const { user, loading } = useAuth();
  // Show landing page while loading to avoid blank screen
  if (loading) return <LandingPage />;
  return user ? <Navigate to="/dashboard" replace /> : <LandingPage />;
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute>} />
            <Route path="/workspace" element={<ProtectedRoute><MainLayout noPadding><DOEToolPage /></MainLayout></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><MainLayout><CreateDesign /></MainLayout></ProtectedRoute>} />
            <Route path="/designs" element={<ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute>} />
            <Route path="/design/:id" element={<ProtectedRoute><MainLayout><DesignViewer /></MainLayout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
