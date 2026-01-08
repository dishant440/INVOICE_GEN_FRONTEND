import {
  FileText,
  IndianRupee,
  CheckCircle,
  Clock,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Invoices */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Invoices</p>
            <FileText className="text-gray-400" size={20} />
          </div>
          <p className="text-2xl font-bold mt-4">128</p>
        </div>

        {/* Total Amount */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Amount</p>
            <IndianRupee className="text-gray-400" size={20} />
          </div>
          <p className="text-2xl font-bold mt-4">₹4,52,000</p>
        </div>

        {/* Paid */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Paid</p>
            <CheckCircle className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold mt-4 text-green-600">
            ₹3,80,000
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending</p>
            <Clock className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold mt-4 text-orange-600">
            ₹72,000
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
