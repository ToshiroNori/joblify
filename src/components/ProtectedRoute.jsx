// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthGuard } from "@/hooks/authGuard"; // or use a Redux selector

const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const { isAuthenticated, loading } = useAuthGuard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Modern Spinner */}
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-lg font-semibold text-gray-600">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
