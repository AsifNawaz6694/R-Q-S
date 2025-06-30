import React, { useState, useEffect } from 'react';
import Layout from '@/layouts/layout';

function debounce(fn, ms) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), ms);
    };
}

export default function Products({ products, filters }) {
    const [showTrashed, setShowTrashed] = useState(filters.trashed === 'only');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [search, setSearch] = useState(filters.search || '');

    // Clear search handler
    const clearSearch = () => {
        if (search !== '') {
            window.location.href = '/products';
            setSearch('');
        }
    };

    // Handle search input change
    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearch(value);
        window.location.href = `/products?search=${value}`;
    };

    const handleStatusChange = (status) => {
        setStatusFilter(status);
        window.location.href = `/products?status=${status}`;
    };

    const deleteProduct = async (id) => {
        if (confirm('Are you sure you want to move this product to trash?')) {
            try {
                // Send delete request to server
                Inertia.delete(`/products/${id}`, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        // Success message will be handled by the controller
                    },
                    onError: (errors) => {
                        console.error('Error moving product to trash:', errors);
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.error('Error during trash operation:', error);
                window.location.reload();
            }
        }
    };

    const restoreProduct = async (id) => {
        if (confirm('Are you sure you want to restore this product?')) {
            try {
                // Send restore request to server
                Inertia.get(`/products/${id}/restore`, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        // Success message will be handled by the controller
                    },
                    onError: (errors) => {
                        console.error('Error restoring product:', errors);
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.error('Error during restore operation:', error);
                window.location.reload();
            }
        }
    };

    const updateStatus = (id, status) => {
        // First update the UI immediately
        const productIndex = products.data.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            const updatedProducts = [...products.data];
            updatedProducts[productIndex].status = status;
            products.data = updatedProducts;
        }
        
        // Send update to server
        Inertia.put(`/products/${id}/status`, { status }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Success message will be handled by the controller
            },
            onError: (errors) => {
                console.error('Error updating status:', errors);
            }
        });
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-4">
                                    <h1 className="text-2xl font-bold">Products</h1>
                                    <div className="relative">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Search products..."
                                                value={search}
                                                onChange={handleSearchInput}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                            <div className="flex items-center space-x-2">
                                                {search && (
                                                    <button
                                                        type="button"
                                                        onClick={clearSearch}
                                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        Clear
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <select
                                                    value={statusFilter}
                                                    onChange={(e) => {
                                                        setStatusFilter(e.target.value);
                                                        Inertia.get('/products', {
                                                            status: e.target.value,
                                                            preserveScroll: true,
                                                            preserveState: true,
                                                        });
                                                    }}
                                                    className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">All Status</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowTrashed(!showTrashed);
                                                        Inertia.get('/products', {
                                                            trashed: !showTrashed ? 'only' : '',
                                                            preserveScroll: true,
                                                            preserveState: true,
                                                            only: ['products']
                                                        });
                                                    }}
                                                    className={`inline-flex items-center w-48 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                                        showTrashed ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {showTrashed ? 'Show Active' : 'Show Trashed'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/products/create"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add Product
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {[
                                                'Item Code', 'Title', 'Sub Category', 'Status',
                                                'Fixed Assets Count', 'EKUEP Selling Price', 'Times Quoted', 'Actions'
                                            ].map((heading, idx) => (
                                                <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.data.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.item_code}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.sub_category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            product.status === 'active' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                                        </span>
                                                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                            <input type="checkbox"
                                                                checked={product.status === 'active'}
                                                                onChange={(e) => updateStatus(product.id, e.target.checked ? 'active' : 'inactive')}
                                                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer right-4 checked:right-0 focus:outline-none"
                                                            />
                                                            <label className="toggle-label block w-10 h-6 bg-gray-300 rounded-full cursor-pointer"></label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.fixed_assets_count}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.ekuep_selling_price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.times_quoted}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => editProduct(product)}
                                                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                        >
                                                            Edit
                                                        </button>
                                                        {product.deleted_at ? (
                                                            <button
                                                                onClick={() => restoreProduct(product.id)}
                                                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                            >
                                                                Restore
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => deleteProduct(product.id)}
                                                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                            >
                                                                Move to Trash
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {products.total > 0 && (
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing {products.from} to {products.to} of {products.total} products
                                                </p>
                                            </div>
                                            {/* <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        Inertia.visit('/products', {
                                                            method: 'get',
                                                            data: {
                                                                page: 1,
                                                                per_page: 100,
                                                                search: search
                                                            },
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                            only: ['products'],
                                                            onBefore: () => false
                                                        });
                                                    }}
                                                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Show All
                                                </button>
                                            </div> */}
                                        </div>
                                        <div className="flex justify-center space-x-4">
                                            <Link
                                                href={`/products?page=${products.current_page - 1}&search=${search}`}
                                                method="get"
                                                preserveState
                                                preserveScroll
                                                only={['products']}
                                                className={`px-4 py-2 border rounded-md ${products.prev_page_url ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
                                                disabled={!products.prev_page_url}
                                            >
                                                Previous
                                            </Link>
                                            <Link
                                                href={`/products?page=${products.current_page + 1}&search=${search}`}
                                                method="get"
                                                preserveState
                                                preserveScroll
                                                only={['products']}
                                                className={`px-4 py-2 border rounded-md ${products.next_page_url ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
                                                disabled={!products.next_page_url}
                                            >
                                                Next
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
