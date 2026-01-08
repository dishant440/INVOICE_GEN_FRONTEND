import { LayoutDashboard, FileText } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen fixed">
      <div className="p-6 text-xl font-bold">InvoiceGen</div>

      <nav className="px-4 space-y-2">
        <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800" href="/">
          <LayoutDashboard size={18} />
          Dashboard
        </a>

        <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800" href="/invoices">
          <FileText size={18} />
          Invoices
        </a>
      </nav>
    </aside>
  );
}
