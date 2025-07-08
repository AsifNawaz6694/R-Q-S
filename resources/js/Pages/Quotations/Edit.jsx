import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import Select from 'react-select';
import Layout from '@/Layouts/Layout';

export default function Edit({ quotation, products }) {
    // Defensive mapping for every field on initialization
    const { data, setData, processing } = useForm({
        quotation_number: quotation.quotation_number || '',
        client_name: quotation.client_name || '',
        client_reference: quotation.client_reference || '',
        quotation_date: quotation.quotation_date ? new Date(quotation.quotation_date).toISOString().split('T')[0] : '',
        rental_starts_date: quotation.rental_starts_date ? new Date(quotation.rental_starts_date).toISOString().split('T')[0] : '',
        rental_ends_date: quotation.rental_ends_date ? new Date(quotation.rental_ends_date).toISOString().split('T')[0] : '',
        rental_period: quotation.rental_period || '',
        details:
            (quotation.details || []).map((d) => ({
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
            })),
        products: products ?? [],
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
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'details' && value !== undefined) formData.append(key, value);
        });
        const detailsData = data.details.map((d) => {
            const { local_image_file, local_image_url, ...rest } = d;
            return rest;
        });
        formData.append('details', JSON.stringify(detailsData));
        data.details.forEach((detail, idx) => {
            if (!detail.product_id && detail.local_image_file) {
                formData.append(`images[${idx}]`, detail.local_image_file);
            }
        });
        router.post(`/quotations/${quotation.id}`, formData, {
            forceFormData: true,
            method: 'put'
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
                                            <input type="text" name="quotation_number" readOnly value={data.quotation_number} className="shadow-sm bg-gray-50 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>
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
                                            {/* You can use the same table code from Create.jsx, making sure every access is safe */}
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
                                                                {(detail.image_url || detail.product_image) && (
                                                                    <img src={detail.image_url || detail.product_image} alt={detail.product_name} className="w-12 h-12 object-contain" />
                                                                )}
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
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                        {processing ? 'Updating...' : 'Update Quotation'}
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