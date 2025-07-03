import { createInertiaApp } from '@inertiajs/react';

// Export the route helper function
export const route = (name, params = {}, query = {}) => {
    return createInertiaApp().resolveRoute(name, params, query);
};
