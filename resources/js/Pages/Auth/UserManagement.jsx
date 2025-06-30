import React, { useState, useCallback, useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout';
export default function UserManagement({ users, filters }) {
    const { post, delete: inertiaDelete } = useForm();
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = useCallback((e) => {
        const value = e.target.value;
        setSearch(value);
        if (value === '') {
            Inertia.get('/users', {
                preserveState: true,
                preserveScroll: true,
                only: ['users']
            });
            return;
        }
        
        Inertia.get('/users', {
            search: value,
            preserveState: true,
            preserveScroll: true,
            only: ['users']
        });
    }, []);

    const handleDelete = useCallback((userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            inertiaDelete(`/users/${userId}`);
        }
    }, []);

    // Handle pagination
    const handlePagination = useCallback((direction) => {
        const currentPage = users.current_page;
        const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;

        if (direction === 'next' && users.next_page_url) {
            Inertia.get('/users', {
                page: nextPage,
                search: search,
                preserveState: true,
                preserveScroll: true,
                only: ['users']
            });
        } else if (direction === 'prev' && users.prev_page_url) {
            Inertia.get('/users', {
                page: nextPage,
                search: search,
                preserveState: true,
                preserveScroll: true,
                only: ['users']
            });
        }
    }, [users, search]);

    // Handle clear search
    const clearSearch = useCallback(() => {
        setSearch('');
        Inertia.get('/users', {
            search: '',
            page: 1,
            preserveState: true,
            preserveScroll: true,
            only: ['users']
        });
    }, []);

    return (
        <Layout>
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-4">
                                    <h1 className="text-2xl font-bold">Users</h1>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={handleSearch}
                                            placeholder="Search users..."
                                            className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {search && (
                                            <button
                                                onClick={clearSearch}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <Link href="/users/create" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Add New User
                                </Link>
                            </div>

                            {/* Users Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.data.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.profile?.company_name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.profile?.contact_name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link 
                                                        href={`/users/${user.id}/edit`} 
                                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
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

                            {/* Pagination */}
                            <div className="flex justify-between items-center mt-6">
                                <div className="text-sm text-gray-500">
                                    Showing {users.from} to {users.to} of {users.total} results
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => handlePagination('prev')}
                                        disabled={!users.prev_page_url}
                                        className={`px-4 py-2 border rounded-md ${users.prev_page_url ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => handlePagination('next')}
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
            </div>
        </Layout>
    );
}
