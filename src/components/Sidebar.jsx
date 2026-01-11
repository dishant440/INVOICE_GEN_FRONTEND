import { LayoutDashboard, FileText, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    // match exactly for dashboard or startsWith for others to catch sub-routes
    const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

    return `flex items-center gap-3 px-3 py-2 rounded transition-colors ${isActive ? "bg-slate-800" : "hover:bg-slate-800"
      }`;
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen fixed">
      <div className="p-6 text-xl font-bold">INVOICE</div>

      <nav className="px-4 space-y-2">
        <Link className={getLinkClass("/dashboard")} to="/dashboard">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link className={getLinkClass("/invoices")} to="/invoices">
          <FileText size={18} />
          Invoices
        </Link>

        <Link className={getLinkClass("/users")} to="/users">
          <Users size={18} />
          Users
        </Link>
      </nav>
    </aside>
  );
}
