import React, { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Layout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data, setData, post } = useForm({});
    const auth = usePage().props.value.auth;

    const isAuthenticated = auth && auth.user && auth.user.id;
    const userName = isAuthenticated ? auth.user.name || 'User' : 'Login';
    const userEmail = isAuthenticated ? auth.user.email || '' : '';

    const isActive = (path) => {
        return window.location.pathname === path || (path === '/dashboard' && window.location.pathname === '/');
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
        if (!isAuthenticated) return;
        
        post(route('logout'), {
            preserveScroll: true,
            onSuccess: () => {
                setMenuOpen(false);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-gray-800">Rental System</Link>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link 
                                href="/dashboard" 
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ${isActive('/dashboard') ? 'border-indigo-500' : 'border-transparent text-gray-500'}`}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href="/users" 
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ${isActive('/users') ? 'border-indigo-500' : 'border-transparent text-gray-500'}`}
                            >
                                Users
                            </Link>
                            <Link 
                                href="/products" 
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ${isActive('/products') ? 'border-indigo-500' : 'border-transparent text-gray-500'}`}
                            >
                                Products
                            </Link>
                            <Link 
                                href="/clients" 
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ${isActive('/clients') ? 'border-indigo-500' : 'border-transparent text-gray-500'}`}
                            >
                                Clients
                            </Link>
                            <Link 
                                href="/quotations" 
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ${isActive('/quotations') ? 'border-indigo-500' : 'border-transparent text-gray-500'}`}
                            >
                                Quotations
                            </Link>
                            <Link 
                                href="/settings" 
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700 ${isActive('/settings') ? 'border-indigo-500' : 'border-transparent text-gray-500'}`}
                            >
                                Settings
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="ml-3 relative">
                                <div>
                                    <button 
                                        type="button" 
                                        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        id="user-menu"
                                        aria-expanded={menuOpen}
                                        aria-haspopup="true"
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={`https://ui-avatars.com/api/?name=${userName}`}
                                            alt="Profile"
                                        />
                                    </button>
                                </div>
                                {menuOpen && isAuthenticated && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu" tabIndex="-1">
                                        <div className="px-4 py-3">
                                            <p className="text-sm font-medium text-gray-900">{userName}</p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {userEmail}
                                            </p>
                                        </div>
                                        <div className="py-1">
                                            <Link 
                                                href="/profile" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="user-menu-item-0"
                                            >
                                                Profile
                                            </Link>
                                            <button 
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="user-menu-item-1"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                {children}
            </main>
        </div>
    );
}
