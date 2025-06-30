import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { useConfirmationModal } from '../../../hooks/useConfirmationModal';
import ConfirmationModal from '../../../Components/ConfirmationModal';

export default function Index({ users, filters }) {
    const { isOpen, openModal, closeModal } = useConfirmationModal();
    const [selectedUser, setSelectedUser] = useState(null);

    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        Inertia.get('/users', {
            search: value,
            page: 1
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const deleteUser = (user) => {
        openModal({
            title: 'Delete User',
            message: (
                <div>
                    <p className="mb-2">Are you sure you want to delete {user.name}?</p>
                    <p className="text-sm text-gray-500">This action cannot be undone. All associated data will be permanently removed.</p>
                </div>
            ),
            type: 'error',
            confirmText: 'Delete User',
            confirmButtonClass: 'bg-red-600 hover:bg-red-700',
            cancelButtonClass: 'bg-gray-600 hover:bg-gray-700'
        });
        setSelectedUser(user);
    };

    const handleConfirmDelete = () => {
        closeModal();
        // Use Inertia's delete method
        window.Inertia.delete(`/users/${selectedUser.id}`, {
            onSuccess: () => {
                // Page will automatically reload after successful deletion
            },
            onError: (errors) => {
                console.error('Delete error:', errors);
            }
        });
    };

    const handleCancelDelete = () => {
        closeModal();
        setSelectedUser(null);
    };

    return (
        <div>
            <Head title="User Management" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-2xl font-bold">User Management</h2>
                                <Link 
                                    href="/users/create" 
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create User
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={handleSearch}
                                        placeholder="Search users..."
                                        className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Verified At</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation Count</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.email_verified_at ? user.email_verified_at : 'Not verified'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.profile?.company_name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.profile?.contact_name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.profile?.contact_number || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.profile?.contact_email || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.profile?.vat_number || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.profile?.quotation_count || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.created_at}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.updated_at}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={`/users/${user.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteUser(user)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => {
                                        if (users.prev_page_url) {
                                            Inertia.get(users.prev_page_url, {}, {
                                                preserveState: true,
                                                preserveScroll: true,
                                                replace: true
                                            });
                                        }
                                    }}
                                    disabled={!users.prev_page_url}
                                    className={`px-4 py-2 border rounded-md ${users.prev_page_url ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => {
                                        if (users.next_page_url) {
                                            Inertia.get(users.next_page_url, {}, {
                                                preserveState: true,
                                                preserveScroll: true,
                                                replace: true
                                            });
                                        }
                                    }}
                                    disabled={!users.next_page_url}
                                    className={`px-4 py-2 border rounded-md ${users.next_page_url ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title={config.title}
                message={config.message}
                confirmText={config.confirmText}
                cancelText={config.cancelText}
                type={config.type}
                confirmButtonClass={config.confirmButtonClass}
                cancelButtonClass={config.cancelButtonClass}
            />
        </div>
    );
}
