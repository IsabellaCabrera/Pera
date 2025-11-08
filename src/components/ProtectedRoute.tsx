import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface ProtectedRouteProps {
  requiredRole?: "seller" | "customer";
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return user.role === "seller" ? (
      <Navigate to="/seller/home" replace />
    ) : (
      <Navigate to="/customer/home" replace />
    );
  }

  return <Outlet />;
};
