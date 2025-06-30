import React, { useState } from 'react';
import Layout from '@/layouts/layout';

export default function Create() {
    const [data, setData] = useState({
        name: '',
        description: '',
        daily_rate: '',
        weekly_rate: '',
        monthly_rate: '',
        category: '',
        image_url: '',
        is_available: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('daily_rate', data.daily_rate);
        formData.append('weekly_rate', data.weekly_rate);
        formData.append('monthly_rate', data.monthly_rate);
        formData.append('category', data.category);
        formData.append('image_url', data.image_url);
        formData.append('is_available', data.is_available);

        fetch('/products', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/products';
            } else {
                // Handle errors
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Product Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    ></textarea>
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Rates */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Daily Rate
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="daily_rate"
                                            value={data.daily_rate}
                                            onChange={(e) => setData('daily_rate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.daily_rate && (
                                            <p className="mt-1 text-sm text-red-600">{errors.daily_rate}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Weekly Rate
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="weekly_rate"
                                            value={data.weekly_rate}
                                            onChange={(e) => setData('weekly_rate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.weekly_rate && (
                                            <p className="mt-1 text-sm text-red-600">{errors.weekly_rate}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Monthly Rate
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="monthly_rate"
                                            value={data.monthly_rate}
                                            onChange={(e) => setData('monthly_rate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.monthly_rate && (
                                            <p className="mt-1 text-sm text-red-600">{errors.monthly_rate}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                    )}
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image_url"
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.image_url && (
                                        <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>
                                    )}
                                </div>

                                {/* Availability */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Available for Rent
                                    </label>
                                    <select
                                        name="is_available"
                                        value={data.is_available}
                                        onChange={(e) => setData('is_available', e.target.value === 'true')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3">
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
