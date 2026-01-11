import { LayoutDashboard, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen fixed">
      <div className="p-6 text-xl font-bold">InvoiceGen</div>

      <nav className="px-4 space-y-2">
        <Link className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800" to="/dashboard">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800" to="/invoices">
          <FileText size={18} />
          Invoices
        </Link>

        <Link className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800" to="/users">
          <Users size={18} />
          Users
        </Link>
      </nav>
    </aside>
  );
}
