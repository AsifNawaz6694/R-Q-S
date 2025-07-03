import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function Index({ quotations }) {
    const { props } = usePage();
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleSearch = (value) => {
            setIsLoading(true);
            router.get('/quotations', {
                search: value,
                preserveScroll: true
            }, {
                preserveState: true,
                only: ['quotations'],
                onFinish: () => setIsLoading(false)
            });
        };

        const debouncedSearch = setTimeout(() => {
            if (search) {
                handleSearch(search);
            }
        }, 500);

        return () => clearTimeout(debouncedSearch);
    }, [search]);

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search quotations..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                {isLoading && (
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={props.routes.quotations.index}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Clear
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link
                        href={props.routes.quotations.create}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Quotation
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental Period</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {quotations.data.map((quotation) => (
                                <tr key={quotation.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{quotation.quotation_number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{format(new Date(quotation.quotation_date), 'dd MMM yyyy', { locale: tr })}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quotation.client_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quotation.rental_period}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {(quotation.details && Array.isArray(quotation.details)
                                            ? quotation.details.reduce((sum, detail) => {
                                                const price = parseFloat(detail.total_price_with_insurance_amount) || 0;
                                                return sum + price;
                                            }, 0)
                                            : 0
                                        ).toFixed(2)} TL
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/quotations/${quotation.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {quotations.total > 0 && (
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing {quotations.from} to {quotations.to} of {quotations.total} quotations
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-4">
                                    <Link
                                        href={`/quotations?page=${quotations.current_page - 1}`}
                                        className={`px-4 py-2 rounded-md ${
                                            quotations.current_page > 1 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                        disabled={quotations.current_page <= 1}
                                    >
                                        Previous
                                    </Link>
                                    <Link
                                        href={`/quotations?page=${quotations.current_page + 1}`}
                                        className={`px-4 py-2 rounded-md ${
                                            quotations.current_page < quotations.last_page ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                        disabled={quotations.current_page >= quotations.last_page}
                                    >
                                        Next
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = Layout;
