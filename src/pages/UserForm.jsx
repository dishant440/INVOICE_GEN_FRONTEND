import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function UserForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isAdmin: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEditing) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/v1/user/${id}`);
            const user = response.data;
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: "", // Don't populate password
                isAdmin: user.isAdmin || false,
            });
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch user details");
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isEditing) {
                await axios.put(`http://localhost:3000/api/v1/user/${id}`, formData);
            } else {
                await axios.post("http://localhost:3000/api/v1/user/register", formData);
            }
            navigate("/users");
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed");
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-6 ">
                <button
                    onClick={() => navigate("/users")}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Users
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? "Edit User" : "Create New User"}
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter name"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="Enter email"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {!isEditing && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                required={!isEditing}
                                placeholder="Enter password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="flex items-center">
                        <input
                            id="is-admin"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={formData.isAdmin}
                            onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                        />
                        <label htmlFor="is-admin" className="ml-2 block text-sm text-gray-900">
                            Is Admin
                        </label>
                    </div>

                    <div className="flex justify-end pt-4 col-span-full">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                            {loading ? "Saving..." : (isEditing ? "Save Changes" : "Create User")}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
