import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import Select from 'react-select';
import { formatInTimeZone } from 'date-fns-tz';

export default function Create({ auth, nextQuotationNumber }) {
    const { data, setData, post, processing } = useForm({
        quotation_number: nextQuotationNumber,
        client_name: '',
        client_reference: '',
        quotation_date: formatInTimeZone(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd'),
        rental_starts: formatInTimeZone(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd'),
        rental_ends: formatInTimeZone(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd'),
        details: [],
        products: []
    });

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch products once on mount
    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                setData('products', products);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/quotations');
    };

    const handleBack = () => {
        router.visit('/quotations');
    };

    const handleProductSelect = (productId) => {
        const selectedProduct = data.products.find(p => p.id === productId);
        console.log('Selected product:', selectedProduct);
    
        if (selectedProduct) {
            const existingProduct = data.details.find(detail => detail.product_id === selectedProduct.id);
            console.log('Existing product:', existingProduct);
    
            if (existingProduct) {
                const newDetails = data.details.map(detail =>
                    detail.product_id === selectedProduct.id
                        ? {
                            ...detail,
                            qty_required: detail.qty_required + 1,
                            product_price: selectedProduct.price || existingProduct.product_price || 0.0
                        }
                        : detail
                );
                setData('details', newDetails);
            } else {
                const newDetail = {
                    product_id: selectedProduct.id,
                    product_name: selectedProduct.name,
                    item_code: selectedProduct.item_code,
                    image_url: selectedProduct.image_url,
                    product_price: selectedProduct.price || 0.0,
                    qty_required: 1,
                    original_price: selectedProduct.price || 0.0
                };
                console.log('New detail:', newDetail);
                setData('details', [...data.details, newDetail]); // ✅ Only add once
            }
        }
    };

    const handleRemoveProduct = (index) => {
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
        setData('details', data.details.filter((_, i) => i !== index));
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center mb-8">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Create New Quotation</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href="/quotations"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>
                
                <div className="mt-8">
                    <form onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Left Column */}
                                    <div className="flex flex-col flex-1">
                                        <div className="flex flex-col gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Quotation Number
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="quotation_number"
                                                        id="quotation_number"
                                                        value={data.quotation_number}
                                                        readOnly
                                                        className="shadow-sm bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
                                                    Client Name
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="client_name"
                                                        id="client_name"
                                                        value={data.client_name}
                                                        onChange={(e) => setData('client_name', e.target.value)}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="quotation_date" className="block text-sm font-medium text-gray-700">
                                                    Quotation Date
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="date"
                                                        name="quotation_date"
                                                        id="quotation_date"
                                                        value={data.quotation_date}
                                                        onChange={(e) => setData('quotation_date', e.target.value)}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        {/* Raqtan Rental Address */}
                                        <div className="mt-4">
                                            <h2 className="text-2xl font-bold text-gray-900">Raqtan Rental</h2>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <p>P.O.Box 31952 Kobar</p>
                                                <p>Saudi Arabia</p>
                                                <p>VAT No. 3007748632003</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="flex flex-col flex-1">
                                        <div className="flex flex-col gap-6">
                                            <div>
                                                <label htmlFor="client_reference" className="block text-sm font-medium text-gray-700">
                                                    Client Reference
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="client_reference"
                                                        id="client_reference"
                                                        value={data.client_reference}
                                                        onChange={(e) => setData('client_reference', e.target.value)}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="rental_period" className="block text-sm font-medium text-gray-700">
                                                    Rental Period
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="rental_period"
                                                        id="rental_period"
                                                        value={data.rental_period}
                                                        onChange={(e) => setData('rental_period', e.target.value)}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="rental_starts" className="block text-sm font-medium text-gray-700">
                                                    Rental Starts
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="date"
                                                        name="rental_starts"
                                                        id="rental_starts"
                                                        value={data.rental_starts}
                                                        onChange={(e) => setData('rental_starts', e.target.value)}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="rental_ends" className="block text-sm font-medium text-gray-700">
                                                    Rental Ends
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="date"
                                                        name="rental_ends"
                                                        id="rental_ends"
                                                        value={data.rental_ends}
                                                        onChange={(e) => setData('rental_ends', e.target.value)}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Raqtan Rental Address */}
                                        <div className="mt-4">
                                            <h2 className="text-2xl font-bold text-gray-900">Raqtan Rental</h2>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <p>P.O.Box 31952 Kobar</p>
                                                <p>Saudi Arabia</p>
                                                <p>VAT No. 3007748632003</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Add Product
                                    </label>
                                    <div className="mt-1">
                                        <div className="relative">
                                            <Select
                                                id="product"
                                                name="product"
                                                value={selectedProductId}
                                                onChange={(option) => {
                                                    if (option) {
                                                        handleProductSelect(Number(option.value));
                                                        setSelectedProductId(null);
                                                    }
                                                }}
                                                options={data.products?.map(product => ({
                                                    value: product.id,
                                                    label: `${product.name} - SAR ${product.price ? Number(product.price).toFixed(2) : '0.00'}`,
                                                    disabled: data.details.some(detail => detail.product_id === product.id),
                                                    price: product.price || 0.0
                                                })) || []}
                                                isSearchable
                                                placeholder="Select a product..."
                                                noOptionsMessage={() => "No products found"}
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        borderColor: 'var(--gray-300)',
                                                        borderRadius: '0.5rem',
                                                        boxShadow: 'none',
                                                        '&:hover': {
                                                            borderColor: 'var(--indigo-500)'
                                                        }
                                                    }),
                                                    menu: (provided) => ({
                                                        ...provided,
                                                        borderRadius: '0.5rem',
                                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                                                    }),
                                                    option: (provided, state) => ({
                                                        ...provided,
                                                        backgroundColor: state.isSelected ? 'var(--indigo-500)' : 'transparent',
                                                        color: state.isSelected ? 'white' : 'var(--gray-900)',
                                                        '&:hover': {
                                                            backgroundColor: state.isSelected ? 'var(--indigo-600)' : 'var(--gray-100)'
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Selected Products
                                    </label>
                                    <div className="mt-2">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {data.details.map((detail, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {detail.item_code}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {detail.product_name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {detail.image_url && (
                                                                    <img 
                                                                        src={detail.image_url} 
                                                                        alt={detail.product_name}
                                                                        className="w-12 h-12 rounded object-cover"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <input
                                                                    type="number"
                                                                    value={detail.qty_required}
                                                                    onChange={(e) => {
                                                                        const newDetails = [...data.details];
                                                                        newDetails[index].qty_required = parseInt(e.target.value) || 1;
                                                                        setData('details', newDetails);
                                                                    }}
                                                                    min="1"
                                                                    className="w-20 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <span className="mr-2">SAR</span>
                                                                    <input
    type="number"
    step="0.01"
    min="0"
    value={detail.product_price}
    onChange={(e) => {
        const newDetails = [...data.details];
        newDetails[index].product_price = parseFloat(e.target.value) || 0;
        setData('details', newDetails);
    }}
    className="w-24 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
/>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <span className="mr-2">SAR</span>
                                                                    <span className="font-medium">
                                                                        SAR {Number(detail.product_price * detail.qty_required).toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <button
                                                                    onClick={() => handleRemoveProduct(index)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {processing ? 'Creating...' : 'Create Quotation'}
                                </button>
                                <button
                                    onClick={handleBack}
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
