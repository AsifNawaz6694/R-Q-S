import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function Layout({ children, title = 'Rental Quotation System' }) {
    return (
        <>
            <Head title={title} />

            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-gray-800">
                                    Rental Quotation System
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link 
                                    href="/dashboard" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
                                >
                                    Dashboard
                                </Link>
                                <Link 
                                    href="/users" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    User Management
                                </Link>
                                <Link 
                                    href="/products" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Products
                                </Link>
                                <Link 
                                    href="/quotes" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Quotations
                                </Link>
                                <Link 
                                    href="/clients" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Clients
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img className="h-8 w-8 rounded-full" src="https://ui-avatars.com/api/?name={auth.user.name}" alt="User avatar" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-700">
                                        {auth.user.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {auth.user.profile?.company_name || 'No company'}
                                    </div>
                                </div>
                            </div>
                            <Link 
                                href="/logout" 
                                method="post" 
                                as="button" 
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </>
    )
}
