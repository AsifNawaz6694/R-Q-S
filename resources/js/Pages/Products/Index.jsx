import React, { useRef, useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ProductsLayout from '@/layouts/products-layout';

    const Products = ({ products, filters }) => {
        const searchInputRef = useRef(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showTrashed, setShowTrashed] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const isUnmountedRef = useRef(false);

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };
    const debounce = (func, delay = 500) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };
    const debouncedSearch = useRef(
        debounce((value) => {
            const params = {
                search: value || undefined,
                status: statusFilter || undefined,
                trashed: showTrashed ? 'only' : undefined,
            };
    
            router.get('/products', {
                search: value || undefined,
                status: statusFilter || undefined,
                trashed: showTrashed ? 'only' : undefined,
              }, {
                preserveScroll: true,
                preserveState: true,
                only: ['products', 'filters'],
                replace: true,
                onFinish: () => {
                  if (searchInputRef.current) {
                    searchInputRef.current.focus();
                  }
                },
              });
        }, 500)
    ).current;
    const deleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${productId}`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    window.alert('Product deleted successfully');
                },
            });
        }
    };

    const restoreProduct = (productId) => {
        if (window.confirm('Are you sure you want to restore this product?')) {
            router.put(`/products/${productId}/restore`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    window.alert('Product restored successfully');
                },
            });
        }
    };

    // Function to toggle between trashed and untrashed states
    const toggleTrashedState = () => {
        if (isToggling) return;
        setIsToggling(true);
    
        const newState = !showTrashed;
        setShowTrashed(newState);
    
        // Prepare query params
        const params = {
            preserveScroll: true,
            preserveState: true,
        };
    
        // Conditionally add the `trashed` param
        if (newState) {
            params.trashed = 'only';
        }
    
        // Preserve current filters
        if (search) {
            params.search = search;
        }
        if (statusFilter) {
            params.status = statusFilter;
        }
    
        // Update the URL and reload
        router.get('/products', params, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                if (!isUnmountedRef.current) {
                    setIsToggling(false);
                }
            },
        });
    };

    // Track component mount state
    // useEffect(() => {
    //     return () => {
    //         isUnmountedRef.current = true;
    //     };
    // }, []);

    useEffect(() => {
        setShowTrashed(filters.trashed === 'only');
        setStatusFilter(filters.status || '');
        setSearch(filters.search || '');
      }, []); // Run only once on mount
    return (
        <ProductsLayout>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="flex items-center gap-2">
                        <input
                        ref={searchInputRef}
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
                                        onClick={() => {
                                            setSearch('');
                                            router.get('/products', {
                                                search: '',
                                                preserveScroll: true,
                                                preserveState: true,
                                            });
                                        }}
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
                                        const selectedStatus = e.target.value;
                                        setStatusFilter(selectedStatus);
                                    
                                        const params = {
                                            preserveScroll: true,
                                            preserveState: true,
                                        };
                                    
                                        // Only include status if it's not empty
                                        if (selectedStatus) {
                                            params.status = selectedStatus;
                                        }
                                    
                                        // Preserve current filters
                                        if (search) {
                                            params.search = search;
                                        }
                                        if (showTrashed) {
                                            params.trashed = 'only';
                                        }
                                    
                                        router.get('/products', params);
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
                                onClick={toggleTrashedState}
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fixed Assets Count</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EKUEP Selling Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Times Quoted</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.data.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.item_code}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.sub_category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.fixed_assets_count}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.ekuep_selling_price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.times_quoted}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <Link href={`/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                            Edit
                                        </Link>
                                        {!showTrashed && (
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Trash
                                            </button>
                                        )}
                                        {showTrashed && (
                                            <button
                                                onClick={() => restoreProduct(product.id)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                Restore
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
        </ProductsLayout>
    );
};

export default Products;
