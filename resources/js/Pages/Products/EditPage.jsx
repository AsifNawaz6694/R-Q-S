import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function EditPage({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        title: product.title,
        item_code: product.item_code,
        description: product.description,
        picture: product.picture,
        main_category: product.main_category,
        sub_category: product.sub_category,
        ekuep_selling_price: product.ekuep_selling_price,
        fixed_assets_count: product.fixed_assets_count,
        avg_rental_period: product.avg_rental_period,
        avg_daily_rate: product.avg_daily_rate,
        daily_rate: product.daily_rate,
        daily_cost: product.daily_cost,
        item_cost: product.item_cost,
        phase: product.phase,
        voltage: product.voltage,
        amps: product.amps,
        kw: product.kw,
        is_available: !!product.is_available, // Convert to boolean
        status: product.status
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/products/${product.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    title: '',
                    item_code: '',
                    description: '',
                    picture: '',
                    main_category: '',
                    sub_category: '',
                    ekuep_selling_price: '',
                    fixed_assets_count: 0,
                    avg_rental_period: '',
                    avg_daily_rate: '',
                    daily_rate: '',
                    daily_cost: '',
                    item_cost: '',
                    phase: '',
                    voltage: '',
                    amps: '',
                    kw: '',
                    is_available: "true",
                    status: 'active'
                });
            }
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Product Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                {/* Item Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Item Code
                                    </label>
                                    <input
                                        type="text"
                                        name="item_code"
                                        value={data.item_code}
                                        onChange={e => setData('item_code', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.item_code && (
                                        <p className="mt-1 text-sm text-red-600">{errors.item_code}</p>
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
                                        onChange={e => setData('description', e.target.value)}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    ></textarea>
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Categories */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Main Category
                                        </label>
                                        <input
                                            type="text"
                                            name="main_category"
                                            value={data.main_category}
                                            onChange={e => setData('main_category', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.main_category && (
                                            <p className="mt-1 text-sm text-red-600">{errors.main_category}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Sub Category
                                        </label>
                                        <input
                                            type="text"
                                            name="sub_category"
                                            value={data.sub_category}
                                            onChange={e => setData('sub_category', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.sub_category && (
                                            <p className="mt-1 text-sm text-red-600">{errors.sub_category}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Rates and Costs */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            EKUEP Selling Price
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="ekuep_selling_price"
                                            value={data.ekuep_selling_price}
                                            onChange={e => setData('ekuep_selling_price', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.ekuep_selling_price && (
                                            <p className="mt-1 text-sm text-red-600">{errors.ekuep_selling_price}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fixed Assets Count
                                        </label>
                                        <input
                                            type="number"
                                            name="fixed_assets_count"
                                            value={data.fixed_assets_count}
                                            onChange={e => setData('fixed_assets_count', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.fixed_assets_count && (
                                            <p className="mt-1 text-sm text-red-600">{errors.fixed_assets_count}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Average Rental Period (days)
                                        </label>
                                        <input
                                            type="number"
                                            name="avg_rental_period"
                                            value={data.avg_rental_period}
                                            onChange={e => setData('avg_rental_period', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.avg_rental_period && (
                                            <p className="mt-1 text-sm text-red-600">{errors.avg_rental_period}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Average Daily Rate
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="avg_daily_rate"
                                            value={data.avg_daily_rate}
                                            onChange={e => setData('avg_daily_rate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.avg_daily_rate && (
                                            <p className="mt-1 text-sm text-red-600">{errors.avg_daily_rate}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Daily Rate
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="daily_rate"
                                            value={data.daily_rate}
                                            onChange={e => setData('daily_rate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.daily_rate && (
                                            <p className="mt-1 text-sm text-red-600">{errors.daily_rate}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Daily Cost
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="daily_cost"
                                            value={data.daily_cost}
                                            onChange={e => setData('daily_cost', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.daily_cost && (
                                            <p className="mt-1 text-sm text-red-600">{errors.daily_cost}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Item Cost
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="item_cost"
                                            value={data.item_cost}
                                            onChange={e => setData('item_cost', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.item_cost && (
                                            <p className="mt-1 text-sm text-red-600">{errors.item_cost}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Electrical Specifications */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Phase
                                        </label>
                                        <input
                                            type="text"
                                            name="phase"
                                            value={data.phase}
                                            onChange={e => setData('phase', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.phase && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phase}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Voltage
                                        </label>
                                        <input
                                            type="number"
                                            name="voltage"
                                            value={data.voltage}
                                            onChange={e => setData('voltage', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.voltage && (
                                            <p className="mt-1 text-sm text-red-600">{errors.voltage}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Amps
                                        </label>
                                        <input
                                            type="number"
                                            name="amps"
                                            value={data.amps}
                                            onChange={e => setData('amps', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.amps && (
                                            <p className="mt-1 text-sm text-red-600">{errors.amps}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            KW
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="kw"
                                            value={data.kw}
                                            onChange={e => setData('kw', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.kw && (
                                            <p className="mt-1 text-sm text-red-600">{errors.kw}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Picture */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Picture URL
                                    </label>
                                    <input
                                        type="url"
                                        name="picture"
                                        value={data.picture}
                                        onChange={e => setData('picture', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.picture && (
                                        <p className="mt-1 text-sm text-red-600">{errors.picture}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">{errors.status}</p>
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
                                        onChange={e => setData('is_available', e.target.value === 'true')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                    {errors.is_available && (
                                        <p className="mt-1 text-sm text-red-600">{errors.is_available}</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3">
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Product'}
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