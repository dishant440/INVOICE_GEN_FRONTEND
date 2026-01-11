import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit2, Trash2, UserPlus, Shield, ShieldAlert } from "lucide-react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/all-user");
            // The API returns { count: N, users: [...] }
            setUsers(response.data.users || []);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch users");
            setLoading(false);
            console.error(err);
        }
    };

    const handleCreate = () => {
        navigate("/users/create");
    };

    const handleEdit = (user) => {
        navigate(`/users/edit/${user._id}`);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        try {
            await axios.delete(`http://localhost:3000/api/v1/user/${userToDelete._id}`);
            setUsers(users.filter(u => u._id !== userToDelete._id));
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        } catch (err) {
            alert("Failed to delete user: " + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;
    if (error) return <DashboardLayout><div className="text-red-500">{error}</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">User Management</h1>
                <button
                    onClick={handleCreate}
                    className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium flex items-center gap-2"
                >
                    <UserPlus size={16} />
                    Add User
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isAdmin ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {user.isAdmin ? <Shield size={12} /> : null}
                                        {user.isAdmin ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteClick(user)} className="text-red-600 hover:text-red-900">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <ShieldAlert size={24} />
                            <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete user <strong>{userToDelete?.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );
}
