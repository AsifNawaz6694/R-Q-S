import React from 'react';
import { Head } from '@inertiajs/react';
import { ArrowTrendingUpIcon, UserGroupIcon, TagIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const StatsCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {value}
                    </p>
                </div>
            </div>
            {change && (
                <div className={`flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <ArrowTrendingUpIcon className="w-5 h-5" />
                    <span className="ml-1 text-sm font-medium">
                        {Math.abs(change)}%
                    </span>
                </div>
            )}
        </div>
    </div>
);

export default function Dashboard({ stats = {}, recentActivity = [] }) {
    return (
        <>
            <Head title="Dashboard" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatsCard
                            title="Total Users"
                            value={stats.total_users}
                            icon={<UserGroupIcon className="w-6 h-6" />}
                            color="bg-blue-500"
                            change={25}
                        />
                        <StatsCard
                            title="Total Products"
                            value={stats.total_products}
                            icon={<TagIcon className="w-6 h-6" />}
                            color="bg-green-500"
                            change={15}
                        />
                        <StatsCard
                            title="Total Quotations"
                            value={stats.total_quotations}
                            icon={<DocumentTextIcon className="w-6 h-6" />}
                            color="bg-yellow-500"
                            change={5}
                        />
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Array.isArray(recentActivity) && recentActivity.length > 0 ? (
                                            recentActivity.map((activity, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className={`w-3 h-3 rounded-full ${activity?.color || 'bg-gray-500'} mr-3`} />
                                                            <span className="text-sm font-medium">
                                                                {activity?.type === 'user_registration' && 'User Registered'}
                                                                {activity?.type === 'user_deleted' && 'User Deleted'}
                                                                {activity?.type === 'product_added' && 'Product Added'}
                                                                {activity?.type === 'product_updated' && 'Product Updated'}
                                                                {activity?.type === 'product_deleted' && 'Product Deleted'}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-500">
                                                            {activity?.time ? new Date(activity.time).toLocaleString() : 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            activity?.type.includes('deleted') ? 'bg-red-100 text-red-800' :
                                                            activity?.type.includes('updated') ? 'bg-yellow-100 text-yellow-800' :
                                                            activity?.type.includes('added') ? 'bg-green-100 text-green-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {activity?.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="text-sm text-gray-500">No recent activity</div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
