import React from 'react';
import Layout from '@layouts/layout';
import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

export default function Show({ quotation }) {
    const calculateTotal = () => {
        return quotation.details.reduce((sum, detail) => sum + detail.total_price_with_insurance_amount, 0).toFixed(2);
    };

    return (
        <Layout>
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center mb-6">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Quotation Details</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                Quotation Number: {quotation.quotation_number}
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <Link
                                href={usePage().props.routes.quotations.index}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Back to List
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Client Information</h3>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Client Name</label>
                                            <p className="mt-1 text-gray-900">{quotation.client_name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Client Reference</label>
                                            <p className="mt-1 text-gray-900">{quotation.client_reference}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Rental Information</h3>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rental Period</label>
                                            <p className="mt-1 text-gray-900">{quotation.rental_period}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rental Starts</label>
                                            <p className="mt-1 text-gray-900">{format(new Date(quotation.rental_starts_date), 'd MMMM yyyy', { locale: enGB })}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rental Ends</label>
                                            <p className="mt-1 text-gray-900">{format(new Date(quotation.rental_ends_date), 'd MMMM yyyy', { locale: enGB })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900">Products</h3>
                                <div className="mt-4">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {quotation.details.map((detail) => (
                                                <tr key={detail.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{detail.product_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{detail.qty_required}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{detail.unit_price.toFixed(2)} TL</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{detail.total_price_with_insurance_amount.toFixed(2)} TL</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900">Summary</h3>
                                <div className="mt-4">
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium">{calculateTotal()} TL</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-gray-600">VAT (15%)</span>
                                            <span className="font-medium">
                                                {quotation.details.reduce((sum, detail) => sum + detail.vat_15_percent_amount, 0).toFixed(2)} TL
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-gray-600">Insurance</span>
                                            <span className="font-medium">
                                                {quotation.details.reduce((sum, detail) => sum + detail.refundable_insurance_amount, 0).toFixed(2)} TL
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-4 border-t pt-4">
                                            <span className="text-gray-900 font-medium">Total Amount</span>
                                            <span className="text-gray-900 font-bold">{calculateTotal()} TL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Show.layout = Layout;
