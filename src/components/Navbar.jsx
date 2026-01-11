import { User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <User size={18} className="text-gray-500" />
          <span>{user?.name || "User"}</span>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
