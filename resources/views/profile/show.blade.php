@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold mb-6">Company Profile</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h2 class="text-xl font-semibold mb-4">Company Information</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Company Name</label>
                        <p class="mt-1 text-gray-900">{{ $profile?->company_name ?? 'Not set' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">VAT Number</label>
                        <p class="mt-1 text-gray-900">{{ $profile?->vat_number ?? 'Not set' }}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-4">Contact Information</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Contact Name</label>
                        <p class="mt-1 text-gray-900">{{ $profile?->contact_name ?? 'Not set' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Contact Number</label>
                        <p class="mt-1 text-gray-900">{{ $profile?->contact_number ?? 'Not set' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Contact Email</label>
                        <p class="mt-1 text-gray-900">{{ $profile?->contact_email ?? 'Not set' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4">Statistics</h2>
            <div class="bg-gray-50 p-4 rounded">
                <div class="text-3xl font-bold text-indigo-600">
                    {{ $profile?->quotation_count ?? 0 }}
                </div>
                <p class="text-gray-600">Total Quotations Generated</p>
            </div>
        </div>

        <div class="mt-8">
            <a href="{{ route('profile.edit') }}" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit Profile
            </a>
        </div>
    </div>
</div>
@endsection
