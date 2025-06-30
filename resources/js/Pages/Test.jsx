import React from 'react';

export default function Test() {
    console.log('Test component rendered');
    return (
        <div className="text-center py-8">
            <h1 className="text-2xl font-bold">Test Component</h1>
            <p className="mt-4">If you can see this, React and Inertia are working!</p>
        </div>
    );
}
