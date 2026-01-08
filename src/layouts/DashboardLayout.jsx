import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex-1 bg-slate-50 ml-64">
        <Navbar />
        <main className="p-6 w-full">{children}</main>
      </div>
    </div>
  );
}

