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
        rental_starts_date: formatInTimeZone(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd'),  // CORRECT
        rental_ends_date: formatInTimeZone(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd'),    // CORRECT
        rental_period: '',
        details: [],
        products: [],
        refundable_insurance: 0.0,
        isManualEntry: false
    });

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [lineItemError, setLineItemError] = useState('');

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
        
        // Client-side validation
        const validationErrors = {};

        // Validate main form fields
        if (!data.quotation_number?.trim()) validationErrors.quotation_number = 'Quotation number is required';
        if (!data.client_name?.trim()) validationErrors.client_name = 'Client name is required';
        if (!data.client_reference?.trim()) validationErrors.client_reference = 'Client reference is required';
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
                
                // Validate image
                if (!detail.image_url && !detail.local_image_file) {
                    validationErrors[`details[${index}].image`] = 'Product image is required';
                }
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

        // If validation passes, create form data
        const formData = new FormData();
    
        // Add all fields except details first
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'details' && value !== undefined) {
            formData.append(key, value);
          }
        });
    
        // Handle serialized details and files
        const detailsData = data.details.map((d, i) => {
          // Remove the file object from what gets serialized,
          // put file in FormData separately
          const { local_image_file, local_image_url, ...rest } = d;
          return rest;
        });
    
        formData.append('details', JSON.stringify(detailsData));
    
        // Add images for all products (manual and existing)
        data.details.forEach((detail, idx) => {
          if (detail.local_image_file) {
            formData.append(`images[${idx}]`, detail.local_image_file);
          }
        });
    
        // Use Inertia POST with FormData
        router.post('/quotations', formData, {
          forceFormData: true
        });
    };

    const handleBack = (e) => {
        e.preventDefault();
        router.visit('/quotations');
    };

    const handleProductSelect = (productId) => {
        setLineItemError(''); // Clear previous errors
        const selectedProduct = data.products.find(p => p.id === productId);
    
        if (selectedProduct) {
            // 🚨 Check for duplicate
            const exists = data.details.some(
                detail => detail.item_code?.toLowerCase() === selectedProduct.item_code.toLowerCase()
            );
            if (exists) {
                setLineItemError("This item already exists in the list. Please increase its quantity instead.");
                return;
            }
            // Your existing code to add the product
            const existingProduct = data.details.find(detail => detail.product_id === selectedProduct.id);
            if (existingProduct) {
                const newDetails = [...data.details];
                const index = newDetails.findIndex(detail => detail.product_id === selectedProduct.id);
                newDetails[index] = {
                    ...existingProduct,
                    qty_required: existingProduct.qty_required + 1,
                    product_price: selectedProduct.price || existingProduct.product_price,
                    image_url: selectedProduct.image_url || existingProduct.image_url
                };
                setData('details', newDetails);
            } else {
                const newDetail = {
                    product_id: selectedProduct.id,
                    product_name: selectedProduct.name,
                    item_code: selectedProduct.item_code,
                    image_url: selectedProduct.image_url || '',
                    product_price: selectedProduct.price || 0.0,
                    qty_required: 1,
                    original_price: selectedProduct.price || 0.0
                };
                setData('details', [...data.details, newDetail]);
            }
        }
    };

    const calculateRentalPeriod = () => {
        if (data.rental_starts_date && data.rental_ends_date) {
            const start = new Date(data.rental_starts_date);
            const end = new Date(data.rental_ends_date);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            
            if (days === 1) {
                setData('rental_period', '1 Day');
            } else if (days < 30) {
                setData('rental_period', `${days} Days`);
            } else if (days < 365) {
                const months = Math.floor(days / 30);
                const remainingDays = days % 30;
                
                if (remainingDays === 0) {
                    setData('rental_period', `${months} Months`);
                } else {
                    setData('rental_period', `${months} Months and ${remainingDays} Days`);
                }
            } else {
                const years = Math.floor(days / 365);
                const remainingDays = days % 365;
                
                if (remainingDays === 0) {
                    setData('rental_period', `${years} Years`);
                } else {
                    setData('rental_period', `${years} Years and ${remainingDays} Days`);
                }
            }
        }
    };

    useEffect(() => {
        calculateRentalPeriod();
    }, [data.rental_starts_date, data.rental_ends_date]);

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
                                                        readOnly
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="rental_starts_date" className="block text-sm font-medium text-gray-700">
                                                    Rental Starts
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="date"
                                                        name="rental_starts_date"
                                                        id="rental_starts_date"
                                                        value={data.rental_starts_date}
                                                        onChange={(e) => setData('rental_starts_date', e.target.value)}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="rental_ends_date" className="block text-sm font-medium text-gray-700">
                                                    Rental Ends
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="date"
                                                        name="rental_ends_date"
                                                        id="rental_ends_date"
                                                        value={data.rental_ends_date}
                                                        onChange={(e) => setData('rental_ends_date', e.target.value)}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="space-y-4">
                                        <div>
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

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-lg font-medium text-gray-900">Selected Products</span>
                                                <button
    type="button" // <-- add this line
    onClick={() => {
        const currentDetails = [...data.details];
        const newProduct = {
            product_id: null,
            product_name: '',
            item_code: '',
            image_url: '',
            product_price: 0.0,
            qty_required: 1,
            original_price: 0.0
        };
        const updatedDetails = [...currentDetails, newProduct];
        setData('details', updatedDetails);
    }}
    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
    Add Manual Product
</button>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {data.details.length} items
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                    {lineItemError && (
                                        <div className="mb-4 text-red-600 font-semibold">
                                            {lineItemError}
                                        </div>
                                    )}
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                                                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line Total</th>
                                                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {data.details.map((detail, index) => (
                                                        <tr key={index}>
                                                            <td className="px-2 py-2 whitespace-nowrap">
                                                                <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                                                            </td>
                                                            <td className="px-2 py-2 whitespace-nowrap">
                                                                {detail.product_id ? (
                                                                    <span className="text-sm font-medium text-gray-900">{detail.product_name}</span>
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        value={detail.product_name}
                                                                        onChange={(e) => {
                                                                            const newDetails = [...data.details];
                                                                            newDetails[index] = {
                                                                                ...detail,
                                                                                product_name: e.target.value
                                                                            };
                                                                            setData('details', newDetails);
                                                                        }}
                                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-2 py-2 whitespace-nowrap">
    {detail.product_id ? (
        <span className="text-sm font-medium text-gray-900">{detail.item_code}</span>
    ) : (
        <input
    type="text"
    value={detail.item_code}
    onChange={(e) => {
        setLineItemError(''); // Clear error on every change
        const inputItemCode = e.target.value.trim();
        const newDetails = [...data.details];

        // 🚨 Check if item code already exists elsewhere in the table
        if (
            inputItemCode &&
            data.details.some(
                (detailItem, i) => i !== index &&
                    detailItem.item_code?.toLowerCase() === inputItemCode.toLowerCase()
            )
        ) {
            setLineItemError("This item already exists in the list. Please increase its quantity instead.");
            return;
        }

        // Only for manual products (no product_id)
        if (!detail.product_id && inputItemCode) {
            // Find if item code matches a product in DB
            const found = data.products?.find(
                prod => prod.item_code?.toLowerCase() === inputItemCode.toLowerCase()
            );
            if (found) {
                // Replace manual with DB row
                newDetails[index] = {
                    product_id: found.id,
                    product_name: found.name,
                    item_code: found.item_code,
                    image_url: found.image_url,
                    product_price: found.price || 0.0,
                    qty_required: 1,  // or carry over previous quantity if you want
                    original_price: found.price || 0.0
                };
                setData('details', newDetails);
                return;
            }
        }
        // Otherwise, update as manual
        newDetails[index] = {
            ...detail,
            item_code: inputItemCode
        };
        setData('details', newDetails);
    }}
    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
/>
    )}
</td>
<td className="px-2 py-2 whitespace-nowrap">
  {/* For manual products (where product_id is null), allow user to upload image */}
  {!detail.product_id ? (
    <>
      {!detail.local_image_url ? (
        <>
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            onClick={() => document.getElementById(`file-upload-${index}`).click()}
          >
            Upload Image
          </button>
          <input
            id={`file-upload-${index}`}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const newDetails = [...data.details];
                  newDetails[index].local_image_file = file;
                  newDetails[index].local_image_url = reader.result;
                  setData('details', newDetails);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </>
      ) : (
        <div className="relative display-inline w-16 h-16">
          <img
            src={detail.local_image_url}
            alt={detail.product_name}
            className="w-12 h-12 object-contain border rounded"
          />
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-800"
            onClick={() => {
              const newDetails = [...data.details];
              newDetails[index].local_image_file = null;
              newDetails[index].local_image_url = '';
              setData('details', newDetails);
            }}
            title="Remove image"
          >
            ×
          </button>
        </div>
      )}
    </>
  ) : (
    // For products from DB, just display existing image (already in detail.image_url)
    detail.image_url && (
      <img
        src={detail.image_url}
        alt={detail.product_name}
        className="w-12 h-12 object-contain"
      />
    )
  )}
</td>
                                                            <td className="px-2 py-2 whitespace-nowrap">
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    value={detail.qty_required}
                                                                    onChange={(e) => {
                                                                        const newDetails = [...data.details];
                                                                        newDetails[index] = {
                                                                            ...detail,
                                                                            qty_required: parseInt(e.target.value) || 1
                                                                        };
                                                                        setData('details', newDetails);
                                                                    }}
                                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-16 sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </td>
                                                            <td className="px-2 py-2 whitespace-nowrap">
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    value={detail.product_price}
                                                                    onChange={(e) => {
                                                                        const newDetails = [...data.details];
                                                                        newDetails[index] = {
                                                                            ...detail,
                                                                            product_price: parseFloat(e.target.value) || 0.0,
                                                                            original_price: parseFloat(e.target.value) || 0.0
                                                                        };
                                                                        setData('details', newDetails);
                                                                    }}
                                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </td>
                                                            <td className="px-2 py-2 whitespace-nowrap">
                                                                <span className="text-sm font-medium text-gray-900">
                                                                    SAR {(detail.product_price * detail.qty_required).toFixed(2)}
                                                                </span>
                                                            </td>
                                                            <td className="px-2 py-2 whitespace-nowrap">
                                                            <button
    type="button"       // <-- ADD THIS LINE!
    onClick={() => handleRemoveProduct(index)}
    className="text-red-600 hover:text-red-900 text-sm"
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

                                    {data.details.length > 0 && (
                                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Calculations</h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Total Net Price</span>
                                                    <span className="font-medium text-indigo-600">
                                                        SAR {data.details.reduce((sum, detail) => sum + (detail.product_price * detail.qty_required), 0).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">VAT (15%)</span>
                                                    <span className="font-medium text-indigo-600">
                                                        SAR {(data.details.reduce((sum, detail) => sum + (detail.product_price * detail.qty_required), 0) * 0.15).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center border-t pt-4">
                                                    <span className="text-gray-600 font-semibold">Total with VAT</span>
                                                    <span className="font-bold text-indigo-600">
                                                        SAR {(data.details.reduce((sum, detail) => sum + (detail.product_price * detail.qty_required), 0) * 1.15).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Refundable Insurance</span>
                                                    <input
    type="number"
    step="0.01"
    min="0"
    value={data.refundable_insurance}
    onChange={(e) => {
        const value = e.target.value;
        setData('refundable_insurance', value === '' ? '' : Number(value));
    }}
    className="w-24 shadow-sm focus:ring-indigo-500 ..."
/>
                                                </div>
                                                <div className="flex justify-between items-center border-t pt-4">
                                                    <span className="text-gray-600 font-semibold">Total Price with Insurance</span>
                                                    <span className="font-bold text-indigo-600">
                                                    SAR {(
    (data.details?.reduce((sum, detail) => sum + ((parseFloat(detail.product_price) || 0) * (parseFloat(detail.qty_required) || 0)), 0) * 1.15)
    + (parseFloat(data.refundable_insurance) || 0)
).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleSubmit(e);
                                        }}
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {processing ? 'Creating...' : 'Create Quotation'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleBack(e);
                                        }}
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
