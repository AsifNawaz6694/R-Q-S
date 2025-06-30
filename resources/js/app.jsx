import React from 'react';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import './bootstrap';
import { resolvePageComponent } from './resolvePage';

createInertiaApp({
    resolve: async (name) => {
        const Component = await resolvePageComponent(name);
        if (!Component) {
            throw new Error(`Component not found for route: ${name}`);
        }
        return Component;
    },
    setup({ el, App, props }) {
        // Initialize the app with standard Inertia configuration
        return createInertiaApp({
            el,
            App,
            props,
            resolve: resolvePageComponent,
            setup: ({ el, App, props }) => {
                const root = ReactDOM.createRoot(el);
                root.render(
                    <React.StrictMode>
                        <App
                            initialPage={props}
                            resolveComponent={resolvePageComponent}
                        />
                    </React.StrictMode>
                );
            }
        });
    },
    version: () => '1.0.0',
    progress: {
        color: '#4B5563',
        showSpinner: true,
    },
    onError: (error) => {
        console.error(error);
    }
});
