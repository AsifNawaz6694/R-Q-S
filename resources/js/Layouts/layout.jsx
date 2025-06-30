import React, { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Layout({ children, auth, url = window.location.pathname }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data, setData, post } = useForm({});

    const isAuthenticated = auth && auth.user && auth.user.id;
    const userName = isAuthenticated ? auth.user.name || 'User' : 'Login';
    const userEmail = isAuthenticated ? auth.user.email || '' : '';

    const isActive = (path) => {
        const currentPath = url;
        return currentPath === path || (path === '/dashboard' && currentPath === '/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest('#user-menu')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [menuOpen]);

    const handleLogout = () => {
        post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-gray-800">
                                    Rental System
                                </Link>
                            </div>

                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link href="/dashboard" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                    isActive('/dashboard') ? 'border-b-2 border-indigo-500 text-gray-900' : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}>Dashboard</Link>
                                <Link href="/users" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                    isActive('/users') ? 'border-b-2 border-indigo-500 text-gray-900' : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}>Users</Link>
                                <Link href="/products" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                    isActive('/products') ? 'border-b-2 border-indigo-500 text-gray-900' : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}>Products</Link>
                                <Link href="/quotations" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                    isActive('/quotations') ? 'border-b-2 border-indigo-500 text-gray-900' : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}>Quotations</Link>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        onClick={() => setMenuOpen(!menuOpen)}
                                        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        id="user-menu"
                                        aria-haspopup="true"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`}
                                            alt="Profile"
                                        />
                                    </button>
                                </div>

                                {menuOpen && isAuthenticated && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu"
                                    >
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            Your Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
