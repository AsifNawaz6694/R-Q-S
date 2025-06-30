import React from 'react';
import ReactDOM from 'react-dom';
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
        const root = document.createElement('div');
        el.appendChild(root);
        
        ReactDOM.render(
            <React.StrictMode>
                <App
                    {...props}
                    resolveComponent={resolvePageComponent}
                />
            </React.StrictMode>,
            root
        );
    },
    version: () => '1.0.0',
    progress: {
        color: '#4B5563',
        showSpinner: true
    },
    onError(error) {
        console.error(error);
    }
});
