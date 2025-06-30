import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Clients({ clients }) {
    const [search, setSearch] = useState('');

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900">Clients</h2>
                            <Link
                                href={route('clients.create')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add Client
                            </Link>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search clients..."
                                    className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {clients.data.map((client) => (
                                            <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{client.contact_person || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{client.email || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{client.phone || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{client.company_name || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{client.vat_number || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <Link
                                                            href={route('clients.edit', client.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            href={route('clients.destroy', client.id)}
                                                            method="delete"
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Delete"
                                                            confirm="Are you sure you want to delete this client?"
                                                            confirmText="Delete"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-700 mr-2">Showing</span>
                                    <span className="font-medium text-gray-900">{clients.data.length}</span>
                                    <span className="text-sm text-gray-700">of</span>
                                    <span className="font-medium text-gray-900">{clients.total}</span>
                                    <span className="text-sm text-gray-700">results</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => Inertia.get('/clients', { page: clients.prev_page }, { preserveState: true })}
                                        disabled={!clients.prev_page}
                                        className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${!clients.prev_page ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => Inertia.get('/clients', { page: clients.next_page }, { preserveState: true })}
                                        disabled={!clients.next_page}
                                        className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${!clients.next_page ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
