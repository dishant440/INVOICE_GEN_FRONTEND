import DashboardLayout from "../layouts/DashboardLayout";

export default function CreateInvoice() {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-gray-500">Invoice creation form will go here.</p>
            </div>
        </DashboardLayout>
    );
}
