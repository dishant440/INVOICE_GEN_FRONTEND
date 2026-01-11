import DashboardLayout from "../layouts/DashboardLayout";

export default function Invoices() {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Invoices</h1>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium">
                    Create Invoice
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
                <p>No invoices found. Create your first invoice to get started.</p>
            </div>
        </DashboardLayout>
    );
}
