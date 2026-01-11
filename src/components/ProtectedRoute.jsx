import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { token, loading } = useAuth();

    // While checking token, we can show a loader or nothing
    if (loading) return <div>Loading...</div>;

    return token ? <Outlet /> : <Navigate to="/login" replace />;
}
