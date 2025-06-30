import React, { useState, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';

import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';

export default function UserManagementEdit({ user }) {
    const [errorMessages, setErrorMessages] = React.useState({});
    const { data, setData, put, reset, errors, processing } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        company_name: user.profile?.company_name || '',
        contact_name: user.profile?.contact_name || '',
        contact_number: user.profile?.contact_number || '',
        contact_email: user.profile?.contact_email || '',
        vat_number: user.profile?.vat_number || '',
    });

    useEffect(() => {
        return () => {
            // Reset password fields when component unmounts
            setData('password', '');
            setData('password_confirmation', '');
        };
    }, []);

    const handleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                // Reset form data after successful update
                reset();
                // Navigate back to users list
                window.location.href = '/users';
            },
            onError: () => {
                // Handle validation errors
                console.error('Update failed:', errors);
                // Show error messages
                // Error messages are automatically handled by Inertia's errors state
            }
        });
    };

    return (
        <div>
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Edit User</h1>
                                <div className="flex space-x-4">
                                    <Link 
                                        href="/users" 
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Back to Users
                                    </Link>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* User Information */}
                                    <div>
                                        <Label forInput="name" value="Name" />
                                        <Input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            handleChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label forInput="email" value="Email" />
                                        <Input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            handleChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label forInput="password" value="Password" />
                                        <Input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            handleChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label forInput="password_confirmation" value="Confirm Password" />
                                        <Input
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            handleChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label forInput="company_name" value="Company Name" />
                                            <Input
                                                type="text"
                                                name="company_name"
                                                value={data.company_name}
                                                className="mt-1 block w-full"
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Label forInput="vat_number" value="VAT Number" />
                                            <Input
                                                type="text"
                                                name="vat_number"
                                                value={data.vat_number}
                                                className="mt-1 block w-full"
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Label forInput="contact_name" value="Contact Name" />
                                            <Input
                                                type="text"
                                                name="contact_name"
                                                value={data.contact_name}
                                                className="mt-1 block w-full"
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Label forInput="contact_number" value="Contact Number" />
                                            <Input
                                                type="text"
                                                name="contact_number"
                                                value={data.contact_number}
                                                className="mt-1 block w-full"
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Label forInput="contact_email" value="Contact Email" />
                                            <Input
                                                type="email"
                                                name="contact_email"
                                                value={data.contact_email}
                                                className="mt-1 block w-full"
                                                handleChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <Button processing={processing}>
                                        {processing ? 'Updating...' : 'Update User'}
                                    </Button>
                                </div>

                                {/* Error messages */}
                                {errors && Object.keys(errors).length > 0 && (
                                    <div className="mt-4">
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                            <ul>
                                                {Object.entries(errorMessages).map(([field, message]) => (
                                                    <li key={field} className="text-sm">
                                                        {message}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
