import React from 'react';

const pages = {
    'Auth/Login': () => import('@/Pages/Auth/Login'),
    'login': () => import('@/Pages/Auth/Login'),
    'Auth/Dashboard': () => import('@/Pages/Auth/Dashboard'),
    'Dashboard': () => import('@/Pages/Auth/Dashboard'),
    'dashboard': () => import('@/Pages/Auth/Dashboard'),
    'users': () => import('@/Pages/Auth/UserManagement'),
    'users/create': () => import('@/Pages/Auth/UserManagementCreate'),
    'users/edit': () => import('@/Pages/Auth/UserManagementEdit'),
    'profile': () => import('@/Pages/Profile/Index'),
    'products': () => import('@/Pages/Products/Index'),
    'products/create': () => import('@/Pages/Products/Create')
};

export function resolvePageComponent(name) {
    const Page = pages[name];
    if (!Page) {
        console.error(`Page not found for route: ${name}`);
        return null;
    }
    
    return Page().then(module => {
        const Component = module.default || module;
        if (!Component) {
            console.error(`Component not found for page: ${name}`);
            console.error('Module:', module);
            return null;
        }
        return Component;
    }).catch(error => {
        console.error(`Error loading page ${name}:`, error);
        return null;
    });
}
