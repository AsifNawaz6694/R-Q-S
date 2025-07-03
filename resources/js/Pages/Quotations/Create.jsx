import React, { useState } from 'react';
import Layout from '@layouts/layout';
import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing } = useForm({
        client_name: '',
        quotation_date: new Date().toISOString().split('T')[0],
        rental_period: '',
        details: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('quotations.store'));
    };

    return (
        <Layout>
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Create New Quotation</h1>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <Link
                                href={route('quotations.index')}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Back to List
                            </Link>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
                                            Client Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="client_name"
                                                id="client_name"
                                                value={data.client_name}
                                                onChange={(e) => setData('client_name', e.target.value)}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="quotation_date" className="block text-sm font-medium text-gray-700">
                                            Quotation Date
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="date"
                                                name="quotation_date"
                                                id="quotation_date"
                                                value={data.quotation_date}
                                                onChange={(e) => setData('quotation_date', e.target.value)}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="rental_period" className="block text-sm font-medium text-gray-700">
                                            Rental Period
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="rental_period"
                                                id="rental_period"
                                                value={data.rental_period}
                                                onChange={(e) => setData('rental_period', e.target.value)}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {processing ? 'Creating...' : 'Create Quotation'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Create.layout = Layout;
