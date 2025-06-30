import React from 'react';
import { Link, useForm } from '@inertiajs/react';

import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';

export default function UserManagementCreate() {
    const { data, setData, post, processing } = useForm({
        errors: {},
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_name: '',
        contact_name: '',
        contact_number: '',
        contact_email: '',
        vat_number: ''
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/users', {
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = '/users';
            },
            onError: (errors) => {
                console.error('Create failed:', errors);
            }
        });
    };

    return (
        <div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold">Create User</h1>
                                    <Link href="/users" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        Back to Users
                                    </Link>
                                </div>

                                {/* User Form */}
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
                                            required
                                        />
                                        {data.errors?.name && <p className="mt-1 text-sm text-red-600">{data.errors.name}</p>}
                                    </div>
                                    <div>
                                        <Label forInput="email" value="Email" />
                                        <Input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            handleChange={handleChange}
                                            required
                                        />
                                        {data.errors?.email && <p className="mt-1 text-sm text-red-600">{data.errors.email}</p>}
                                    </div>
                                    <div>
                                        <Label forInput="password" value="Password" />
                                        <Input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            handleChange={handleChange}
                                            required
                                        />
                                        {data.errors?.password && <p className="mt-1 text-sm text-red-600">{data.errors.password}</p>}
                                    </div>
                                    <div>
                                        <Label forInput="password_confirmation" value="Confirm Password" />
                                        <Input
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            handleChange={handleChange}
                                            required
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
                                        Create User
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
