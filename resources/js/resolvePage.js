import React from 'react';
import Layout from '@/Layouts/Layout';

const pages = {
    // Login
    'Auth/Login': () => import('@/Pages/Auth/Login'),
    'login': () => import('@/Pages/Auth/Login'),
    
    // Dashboard
    'Auth/Dashboard': () => import('@/Pages/Auth/Dashboard'),
    'Dashboard': () => import('@/Pages/Auth/Dashboard'),
    'dashboard': () => import('@/Pages/Auth/Dashboard'),
    
    // Users Management
    'Auth/UserManagement': () => import('@/Pages/Auth/UserManagement'),
    'Auth/UserManagementCreate': () => import('@/Pages/Auth/UserManagementCreate'),
    'Auth/UserManagementEdit': () => import('@/Pages/Auth/UserManagementEdit'),
    'users': () => import('@/Pages/Auth/UserManagement'),
    'users/create': () => import('@/Pages/Auth/UserManagementCreate'),
    'users/edit': () => import('@/Pages/Auth/UserManagementEdit'),
    
    // Profile
    'profile': () => import('@/Pages/Profile/Index'),
    'Profile/Index': () => import('@/Pages/Profile/Index'),
    
    // Products
    'products': () => import('@/Pages/Products/Index'),
    'products/create': () => import('@/Pages/Products/CreatePage'),
    'Products/Index': () => import('@/Pages/Products/Index'),
    'Products/Create': () => import('@/Pages/Products/CreatePage'),
    
    // Quotations
    'quotations': () => import('@/Pages/Quotations/Index.jsx'),
    'quotations/index': () => import('@/Pages/Quotations/Index.jsx'),
    'quotations/create': () => import('@/Pages/Quotations/Create.jsx'),
    'quotations/show': () => import('@/Pages/Quotations/Show.jsx'),
    'quotations/edit': () => import('@/Pages/Quotations/Edit.jsx')
};

export function resolvePageComponent(name) {
    // Normalize the route name to lowercase
    const normalized = name.toLowerCase();
    const Page = pages[normalized] || pages[name];
    
    if (!Page) {
        console.error(`Page not found for route: ${name} (normalized: ${normalized})`);
        console.error('Available pages:', Object.keys(pages));
        return null;
    }
    
    return Page().then(module => {
        const Component = module.default || module;
        if (!Component) {
            console.error(`Component not found for page: ${name}`);
            console.error('Module:', module);
            return null;
        }

        // Only exclude login page from Layout wrapper
        if (name === 'Auth/Login' || name === 'login') {
            return Component;
        }

        // Wrap other pages with Layout
        const WrappedComponent = (props) => (
            <Layout 
                auth={props.auth} 
                url={props.url || window.location.pathname}
            >
                <Component {...props} auth={props.auth} />
            </Layout>
        );

        return WrappedComponent;
    }).catch(error => {
        console.error(`Error loading page ${name}:`, error);
        return null;
    });
}
