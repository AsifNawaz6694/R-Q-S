import React, { useState, useEffect } from 'react';
import Layout from '@/Components/Layout';

export default function Profile({ user }) {
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        company_name: user.profile?.company_name || '',
        contact_name: user.profile?.contact_name || '',
        contact_number: user.profile?.contact_number || '',
        contact_email: user.profile?.contact_email || '',
        vat_number: user.profile?.vat_number || '',
        current_password: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});

    const handleCancel = () => {
        window.location.href = '/profile';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('current_password', data.current_password);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);
        formData.append('company_name', data.company_name);
        formData.append('contact_name', data.contact_name);
        formData.append('contact_number', data.contact_number);
        formData.append('contact_email', data.contact_email);
        formData.append('vat_number', data.vat_number);
        
        fetch('/profile/update', {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Refresh session
                window.location.href = '/profile';
            } else {
                // Handle errors
                console.error('Update failed:', data.errors);
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
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
                                
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">Company Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="company_name"
                                                value={data.company_name}
                                                onChange={(e) => setData({ ...data, company_name: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.company_name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.company_name}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                VAT Number
                                            </label>
                                            <input
                                                type="text"
                                                name="vat_number"
                                                value={data.vat_number}
                                                onChange={(e) => setData({ ...data, vat_number: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.vat_number && (
                                                <p className="mt-1 text-sm text-red-600">{errors.vat_number}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Contact Name
                                            </label>
                                            <input
                                                type="text"
                                                name="contact_name"
                                                value={data.contact_name}
                                                onChange={(e) => setData({ ...data, contact_name: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.contact_name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.contact_name}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Contact Email
                                            </label>
                                            <input
                                                type="email"
                                                name="contact_email"
                                                value={data.contact_email}
                                                onChange={(e) => setData({ ...data, contact_email: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.contact_email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.contact_email}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Contact Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="contact_number"
                                                value={data.contact_number}
                                                onChange={(e) => setData({ ...data, contact_number: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.contact_number && (
                                                <p className="mt-1 text-sm text-red-600">{errors.contact_number}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                name="current_password"
                                                value={data.current_password}
                                                onChange={(e) => setData({ ...data, current_password: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.current_password && (
                                                <p className="mt-1 text-sm text-red-600">{errors.current_password}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.password && (
                                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.password_confirmation && (
                                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update Profile
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
