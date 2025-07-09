import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import Select from 'react-select';
import Layout from '@/Layouts/Layout';

export default function Edit({ quotation, products }) {
    // Validate and initialize form data
    if (!quotation || !quotation.id) {
        throw new Error('Invalid quotation data');
    }

    // Defensive initialization with fallbacks
    const { data, setData, processing } = useForm({
        quotation_number: quotation.quotation_number || '',
        client_name: quotation.client_name || '',
        client_reference: quotation.client_reference || '',
        quotation_date: quotation.quotation_date ? new Date(quotation.quotation_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        rental_starts_date: quotation.rental_starts_date ? new Date(quotation.rental_starts_date).toISOString().split('T')[0] : '',
        rental_ends_date: quotation.rental_ends_date ? new Date(quotation.rental_ends_date).toISOString().split('T')[0] : '',
        rental_period: quotation.rental_period || '',
        details: Array.isArray(quotation.details) ? quotation.details.map((d) => ({
            id: d.id || null,
            product_id: d.product_id ?? null,
            product_name: d.product_name ?? '',
            item_code: d.item_code ?? '',
            product_price: Number(d.product_price ?? d.unit_price ?? d.original_price ?? 0),
            qty_required: Number(d.qty_required ?? 1),
            original_price: Number(d.original_price ?? d.product_price ?? d.unit_price ?? 0),
            image_url: d.image_url ?? '',
            product_image: d.product_image ?? '',
            local_image_url: d.product_image ?? d.image_url ?? '',
            local_image_file: null,
        })) : [],
        products: Array.isArray(products) ? products : [],
        refundable_insurance: Number(quotation.refundable_insurance_amount ?? 0),
        isManualEntry: false,
    });

    const [selectedProductId, setSelectedProductId] = useState(null);
    const [lineItemError, setLineItemError] = useState('');

    // Recalculate rental period when dates change
    useEffect(() => {
        if (data.rental_starts_date && data.rental_ends_date) {
            const start = new Date(data.rental_starts_date);
            const end = new Date(data.rental_ends_date);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            if (days === 1) setData('rental_period', '1 Day');
            else if (days < 30) setData('rental_period', `${days} Days`);
            else if (days < 365) {
                const months = Math.floor(days / 30);
                const remainingDays = days % 30;
                if (remainingDays === 0) setData('rental_period', `${months} Months`);
                else setData('rental_period', `${months} Months and ${remainingDays} Days`);
            } else {
                const years = Math.floor(days / 365);
                const remainingDays = days % 365;
                if (remainingDays === 0) setData('rental_period', `${years} Years`);
                else setData('rental_period', `${years} Years and ${remainingDays} Days`);
            }
        }
    }, [data.rental_starts_date, data.rental_ends_date]);

    // Product selection handler
    const handleProductSelect = (productId) => {
        setLineItemError('');
        const selectedProduct = (data.products || []).find(p => p.id === productId);
        if (!selectedProduct) return;

        const exists = data.details.some(
            detail => (detail.item_code ?? '').toLowerCase() === (selectedProduct.item_code ?? '').toLowerCase()
        );
        if (exists) {
            setLineItemError('This item already exists in the list. Please increase its quantity instead.');
            return;
        }

        let newDetails;
        const existingProduct = data.details.find(detail => detail.product_id === selectedProduct.id);
        if (existingProduct) {
            newDetails = [...data.details];
            const index = newDetails.findIndex(detail => detail.product_id === selectedProduct.id);
            newDetails[index] = {
                ...existingProduct,
                qty_required: Number(existingProduct.qty_required) + 1,
                product_price: Number(selectedProduct.price) || Number(existingProduct.product_price),
            };
        } else {
            const newDetail = {
                product_id: selectedProduct.id,
                product_name: selectedProduct.title ?? '',
                item_code: selectedProduct.item_code ?? '',
                image_url: selectedProduct.picture ?? '',
                product_price: Number(selectedProduct.daily_rate) || 0.0,
                qty_required: 1,
                original_price: Number(selectedProduct.daily_rate) || 0.0,
                local_image_url: selectedProduct.picture ?? '',
                local_image_file: null,
            };
            newDetails = [...data.details, newDetail];
        }
        setData('details', newDetails);
    };

    const handleRemoveProduct = (index) => {
        setData('details', data.details.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Client-side validation
        const validationErrors = {};

        // Validate main form fields
        if (!data.quotation_number?.trim()) validationErrors.quotation_number = 'Quotation number is required';
        if (!data.client_name?.trim()) validationErrors.client_name = 'Client name is required';
        if (!data.quotation_date) validationErrors.quotation_date = 'Quotation date is required';
        if (!data.rental_starts_date) validationErrors.rental_starts_date = 'Rental starts date is required';
        if (!data.rental_ends_date) validationErrors.rental_ends_date = 'Rental ends date is required';
        if (!data.rental_period) validationErrors.rental_period = 'Rental period is required';

        // Validate details
        if (!Array.isArray(data.details) || data.details.length === 0) {
            validationErrors.details = 'Please add at least one product';
        } else {
            data.details.forEach((detail, index) => {
                if (!detail.product_name?.trim()) validationErrors[`details[${index}].product_name`] = 'Product name is required';
                if (!detail.item_code?.trim()) validationErrors[`details[${index}].item_code`] = 'Item code is required';
                if (!detail.qty_required || detail.qty_required < 1) validationErrors[`details[${index}].qty_required`] = 'Quantity must be at least 1';
                if (detail.product_price === undefined || detail.product_price === null || isNaN(detail.product_price) || Number(detail.product_price) < 0) 
                    validationErrors[`details[${index}].product_price`] = 'Price must be at least 0';
            });
        }

        // If there are validation errors, show them and return
        if (Object.keys(validationErrors).length > 0) {
            const errorMessages = Object.entries(validationErrors)
                .map(([field, message]) => `${field}: ${message}`)
                .join('\n');
            alert(`Please fix the following errors:\n\n${errorMessages}`);
            return;
        }

        // Prepare form data object
        const formObject = {
            quotation_number: data.quotation_number?.trim(),
            client_name: data.client_name?.trim(),
            client_reference: data.client_reference?.trim() || '',
            quotation_date: data.quotation_date,
            rental_starts_date: data.rental_starts_date,
            rental_ends_date: data.rental_ends_date,
            rental_period: data.rental_period,
            refundable_insurance: Number(data.refundable_insurance) || 0,
            details: data.details.map(detail => ({
                product_name: detail.product_name?.trim() || '',
                item_code: detail.item_code?.trim() || '',
                qty_required: Number(detail.qty_required) || 1,
                product_price: Number(detail.product_price) || 0,
                id: detail.id || null,
                image_url: detail.image_url || detail.product_image || '',
                product_id: detail.product_id || null,
                original_price: Number(detail.original_price) || 0,
            })),
        };

        // Debug: Log what's being sent
        console.log('Submitting form data:', formObject);

        // Submit using Inertia's router
        router.put(`/quotations/${quotation.id}`, formObject, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                router.visit('/quotations', {
                    preserveScroll: true,
                    preserveState: true,
                    only: ['flash'],
                });
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
                const errorMessages = Object.entries(errors)
                    .map(([field, message]) => `${field}: ${message}`)
                    .join('\n');
                alert(`Form submission failed:\n\n${errorMessages}`);
            }
        });
    };

    // Dropdown options fallback
    const selectOptions = (data.products || []).map(product => ({
        value: product.id,
        label: `${product.title ?? '(No name)'} - SAR ${Number(product.daily_rate ?? 0).toFixed(2)}`,
        disabled: data.details.some(detail => detail.product_id === product.id)
    }));

    // Defensive render on all fields
    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center mb-8">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Edit Quotation</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link href="/quotations" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Back to List
                        </Link>
                    </div>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex flex-col flex-1 gap-6">
                                        {/* Left column */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Quotation Number</label>
                                            <input
  type="text"
  name="quotation_number"
  readOnly
  value={data.quotation_number}
  className="shadow-sm bg-gray-50 block w-full sm:text-sm border-gray-300 rounded-md"
/>                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Client Name</label>
                                            <input type="text" name="client_name" value={data.client_name} onChange={e => setData('client_name', e.target.value)} className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Quotation Date</label>
                                            <input type="date" name="quotation_date" value={data.quotation_date} onChange={e => setData('quotation_date', e.target.value)} className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 gap-6">
                                        {/* Right column */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Client Reference</label>
                                            <input type="text" name="client_reference" value={data.client_reference} onChange={e => setData('client_reference', e.target.value)} className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rental Period</label>
                                            <input type="text" name="rental_period" value={data.rental_period} readOnly className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rental Starts</label>
                                            <input type="date" name="rental_starts_date" value={data.rental_starts_date} onChange={e => setData('rental_starts_date', e.target.value)} className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rental Ends</label>
                                            <input type="date" name="rental_ends_date" value={data.rental_ends_date} onChange={e => setData('rental_ends_date', e.target.value)} className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                    </div>
                                </div>
                                {/* Products Section */}
                                <div className="mt-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Add Product</label>
                                            <Select
                                                id="product"
                                                name="product"
                                                value={selectedProductId}
                                                onChange={option => {
                                                    if (option) {
                                                        handleProductSelect(Number(option.value));
                                                        setSelectedProductId(null);
                                                    }
                                                }}
                                                options={selectOptions}
                                                isSearchable
                                                placeholder="Select a product..."
                                                noOptionsMessage={() => "No products found"}
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-lg font-medium text-gray-900">Selected Products</span>
                                                <button type="button" onClick={() => {
                                                    setData('details', [...data.details, {
                                                        product_id: null,
                                                        product_name: '',
                                                        item_code: '',
                                                        image_url: '',
                                                        product_price: 0.0,
                                                        qty_required: 1,
                                                        original_price: 0.0
                                                    }]);
                                                }} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Manual Product</button>
                                            </div>
                                            <span className="text-sm text-gray-600">{data.details.length} items</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        {lineItemError && <div className="mb-4 text-red-600 font-semibold">{lineItemError}</div>}
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-2 py-3">#</th>
                                                        <th className="px-2 py-3">Product Name</th>
                                                        <th className="px-2 py-3">Item Code</th>
                                                        <th className="px-2 py-3">Image</th>
                                                        <th className="px-2 py-3">Quantity</th>
                                                        <th className="px-2 py-3">Unit Price</th>
                                                        <th className="px-2 py-3">Line Total</th>
                                                        <th className="px-2 py-3">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {data.details.map((detail, index) => (
                                                        <tr key={index}>
                                                            <td className="px-2 py-2">{index + 1}</td>
                                                            <td className="px-2 py-2">
                                                                <input
                                                                    type="text"
                                                                    value={detail.product_name}
                                                                    onChange={e => {
                                                                        const newDetails = [...data.details];
                                                                        newDetails[index].product_name = e.target.value;
                                                                        setData('details', newDetails);
                                                                    }}
                                                                    className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <input
                                                                    type="text"
                                                                    value={detail.item_code}
                                                                    onChange={e => {
                                                                        const newDetails = [...data.details];
                                                                        newDetails[index].item_code = e.target.value;
                                                                        setData('details', newDetails);
                                                                    }}
                                                                    className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <div className="flex flex-col items-center space-y-2">
                                                                    {/* Preview existing or new image */}
                                                                    {detail.local_image_file ? (
                                                                        <img 
                                                                            src={URL.createObjectURL(detail.local_image_file)} 
                                                                            alt={detail.product_name} 
                                                                            className="w-12 h-12 object-contain"
                                                                            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                                                        />
                                                                    ) : (
                                                                        <img 
                                                                            src={detail.image_url || detail.product_image || ''} 
                                                                            alt={detail.product_name} 
                                                                            className="w-12 h-12 object-contain"
                                                                        />
                                                                    )}
                                                                    
                                                                    {/* Image upload for manual products */}
                                                                    {detail.product_id === null && (
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(e) => {
                                                                                const newDetails = [...data.details];
                                                                                const file = e.target.files[0];
                                                                                if (file) {
                                                                                    newDetails[index] = {
                                                                                        ...newDetails[index],
                                                                                        local_image_file: file,
                                                                                        image_url: '', // Clear existing URL if new file is selected
                                                                                        product_image: ''
                                                                                    };
                                                                                    setData('details', newDetails);
                                                                                }
                                                                            }}
                                                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <input
                                                                    type="number" min="1"
                                                                    value={detail.qty_required}
                                                                    onChange={e => {
                                                                        const newDetails = [...data.details];
                                                                        newDetails[index].qty_required = parseInt(e.target.value) || 1;
                                                                        setData('details', newDetails);
                                                                    }}
                                                                    className="shadow-sm block w-16 sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <input
                                                                    type="number" step="0.01" min="0"
                                                                    value={detail.product_price}
                                                                    onChange={e => {
                                                                        const newDetails = [...data.details];
                                                                        newDetails[index].product_price = parseFloat(e.target.value) || 0.0;
                                                                        setData('details', newDetails);
                                                                    }}
                                                                    className="shadow-sm block w-24 sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <span className="text-sm font-medium text-gray-900">
                                                                    SAR {(Number(detail.product_price ?? 0) * Number(detail.qty_required ?? 0)).toFixed(2)}
                                                                </span>
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <button type="button" onClick={() => handleRemoveProduct(index)} className="text-red-600 hover:text-red-900 text-sm">Remove</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {data.details.length > 0 && (
                                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Calculations</h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Total Net Price</span>
                                                    <span className="font-medium text-indigo-600">
                                                        SAR {data.details.reduce(
                                                            (sum, detail) => sum + (Number(detail.product_price ?? 0) * Number(detail.qty_required ?? 0)), 0
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">VAT (15%)</span>
                                                    <span className="font-medium text-indigo-600">
                                                        SAR {(data.details.reduce(
                                                            (sum, detail) => sum + (Number(detail.product_price ?? 0) * Number(detail.qty_required ?? 0)), 0
                                                        ) * 0.15).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center border-t pt-4">
                                                    <span className="text-gray-600 font-semibold">Total with VAT</span>
                                                    <span className="font-bold text-indigo-600">
                                                        SAR {(data.details.reduce(
                                                            (sum, detail) => sum + (Number(detail.product_price ?? 0) * Number(detail.qty_required ?? 0)), 0
                                                        ) * 1.15).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Refundable Insurance</span>
                                                    <input
                                                        type="number" step="0.01" min="0"
                                                        value={data.refundable_insurance ?? 0}
                                                        onChange={e => setData('refundable_insurance', parseFloat(e.target.value) || 0)}
                                                        className="w-24 shadow-sm block sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div className="flex justify-between items-center border-t pt-4">
                                                    <span className="text-gray-600 font-semibold">Total Price with Insurance</span>
                                                    <span className="font-bold text-indigo-600">
                                                        SAR {(
                                                            data.details.reduce(
                                                                (sum, detail) =>
                                                                    sum +
                                                                    (Number(detail.product_price ?? 0) * Number(detail.qty_required ?? 0)),
                                                                0
                                                            ) * 1.15 +
                                                            Number(data.refundable_insurance ?? 0)
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit" disabled={processing}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={e => {
                                            e.preventDefault();
                                            router.visit('/quotations');
                                        }}
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
Edit.layout = function ({ children }) {
    return <Layout title="Edit Quotation">{children}</Layout>;
};