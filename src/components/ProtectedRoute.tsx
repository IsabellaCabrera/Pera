import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Loader } from "./Loader/Loader";

interface ProtectedRouteProps {
  requiredRole?: "seller" | "customer";
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <img className="w-48" src="/peraLogo.webp" alt="Pera Logo" />
          <Loader />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return user.role === "seller" ? (
      <Navigate to="/seller/analytics" replace />
    ) : (
      <Navigate to="/customer/home" replace />
    );
  }

  return <Outlet />;
};
