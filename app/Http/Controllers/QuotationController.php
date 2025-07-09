<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\QuotationDetail;
use App\Models\Product;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class QuotationController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index(Request $request)
    {
        $search = $request->query('search');
        
        $query = Quotation::with(['details' => function($query) {
            $query->select('id', 'quotation_id', 'product_name', 'qty_required', 'total_price');
        }]);

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('quotation_number', 'like', '%' . $search . '%')
                    ->orWhere('client_name', 'like', '%' . $search . '%')
                    ->orWhere('quotation_date', 'like', '%' . $search . '%')
                    ->orWhere('rental_period', 'like', '%' . $search . '%')
                    ->orWhereHas('details', function($q) use ($search) {
                        $q->where('product_name', 'like', '%' . $search . '%');
                    });
            });
        }

        $quotations = $query->orderBy('quotation_date', 'desc')->paginate(20);

        return inertia('quotations/Index', [
            'quotations' => $quotations,
            'search' => $search,
            'routes' => [
                'quotations' => [
                    'index' => route('quotations.index'),
                ],
            ],
            'create' => route('quotations.create'),
        ], [
            'preserveState' => true,
            'preserveScroll' => true,
        ]);
    }

    public function create()
    {
        $lastQuotation = Quotation::latest('id')->first();
        $nextNumber = $lastQuotation ? (int)substr($lastQuotation->quotation_number, 2) + 1 : 00000;
        $nextQuotationNumber = 'Q-' . str_pad($nextNumber, 5, '0', STR_PAD_LEFT);

        return inertia('quotations/Create', ['nextQuotationNumber' => $nextQuotationNumber]);
    }

    public function store(Request $request)
    {
        // 1. Decode details if FormData sends JSON string
        $detailsRaw = $request->input('details');
        if (is_string($detailsRaw)) {
            $detailsDecoded = json_decode($detailsRaw, true);
            $request->request->set('details', $detailsDecoded);
        }

        // 2. Validate incoming fields
        $validated = $request->validate([
            'quotation_number' => 'required|string',
            'client_name' => 'required|string',
            'client_reference' => 'nullable|string',
            'quotation_date' => 'required|date',
            'rental_starts_date' => 'required|date',
            'rental_ends_date' => 'required|date|after:rental_starts_date',
            'rental_period' => 'required|string',
            'details' => 'required|array|min:1',
            'details.*.product_name' => 'required|string',
            'details.*.item_code' => 'required|string',
            'details.*.qty_required' => 'required|numeric|min:1',
            'details.*.product_price' => 'required|numeric|min:0',
            'refundable_insurance' => 'nullable|numeric|min:0',
        ]);

        $manual_counter = 1;
        $total_net_price_amount = 0;
        $total_discount_amount = 0; // (set as needed)
        $vat_15_percent_amount = 0;
        $total_with_vat_amount = 0;
        $refundable_insurance_amount = $validated['refundable_insurance'] ?? 0;

        $detailsForInsert = [];
        foreach ($validated['details'] as $i => $detail) {
            $isManual = empty($detail['product_id']) || !is_numeric($detail['product_id']);
            $product_id = $detail['product_id'];
            if ($isManual) {
                $product_id = 'Manual-' . $manual_counter;
                $manual_counter++;
            }
            $product_name = $detail['product_name'] ?? null;
            $item_code = $detail['item_code'] ?? null;
            $qty = $detail['qty_required'];
            $unit_price = $detail['product_price'] ?? 0;

            // Fill from DB if missing (for existing products)
            if ($product_id && is_numeric($product_id) && (empty($product_name) || empty($item_code))) {
                $product = \App\Models\Product::find($product_id);
                if ($product) {
                    $product_name = $product->name;
                    $item_code = $product->item_code;
                    $unit_price = $unit_price ?: $product->price;
                }
            }

            $total_price = $unit_price * $qty;
            $net = $total_price;
            $vat = $net * 0.15;
            $with_vat = $net + $vat;

            $product_image = null;
            if ($isManual && $request->hasFile("images.$i")) {
                $imgFile = $request->file("images.$i");
                // --- S3 Storage into RQS/Quotation_Images ---
                $imgName = 'quotation_img_' . uniqid() . '.' . $imgFile->getClientOriginalExtension();
                $s3path = $imgFile->storeAs('RQS/Quotation_Images', $imgName, 's3');
                Storage::disk('s3')->setVisibility($s3path, 'public');
                $product_image = Storage::disk('s3')->url($s3path);
            } elseif (isset($detail['image_url']) && $detail['image_url']) {
                $product_image = $detail['image_url'];
            }

            $total_net_price_amount += $net;
            $vat_15_percent_amount += $vat;
            $total_with_vat_amount += $with_vat;

            // Prepare detail for database (no summary fields now)
            $detailsForInsert[] = [
                'product_id' => $product_id,
                'item_code' => $item_code,
                'product_name' => $product_name,
                'product_image' => $product_image,
                'qty_required' => $qty,
                'unit_price' => $unit_price,
                'total_price' => $total_price
            ];
        }

        $total_price_with_insurance_amount = $total_with_vat_amount + $refundable_insurance_amount;

        $quotation = \App\Models\Quotation::create([
            'quotation_number' => $validated['quotation_number'],
            'quotation_date' => $validated['quotation_date'],
            'client_name' => $validated['client_name'],
            'client_reference' => $validated['client_reference'],
            'rental_period' => $validated['rental_period'],
            'rental_starts_date' => $validated['rental_starts_date'],
            'rental_ends_date' => $validated['rental_ends_date'],
            'total_net_price_amount' => $total_net_price_amount,
            'total_with_vat_amount' => $total_with_vat_amount,
            'total_discount_amount' => $total_discount_amount,
            'vat_15_percent_amount' => $vat_15_percent_amount,
            'refundable_insurance_amount' => $refundable_insurance_amount,
            'total_price_with_insurance_amount' => $total_price_with_insurance_amount,
        ]);

        // Insert all details
        foreach ($detailsForInsert as $detail) {
            $quotation->details()->create($detail);
        }

        return redirect()->route('quotations.index')->with('success', 'Quotation created successfully');
    }

    public function show($id)
    {
        $quotation = Quotation::with('details')->findOrFail($id);
        return inertia('quotations/Show', [
            'quotation' => $quotation,
            'routes' => [
                'quotations' => [
                    'index' => route('quotations.index'),
                ],
            ],
        ]);
    }

    public function edit($id)
    {
        $quotation = Quotation::with('details')->findOrFail($id);
        $products = \App\Models\Product::all();

        // Format all date fields
        $quotation->quotation_date = $quotation->quotation_date ? date('Y-m-d', strtotime($quotation->quotation_date)) : '';
        $quotation->rental_starts_date = $quotation->rental_starts_date ? date('Y-m-d', strtotime($quotation->rental_starts_date)) : '';
        $quotation->rental_ends_date = $quotation->rental_ends_date ? date('Y-m-d', strtotime($quotation->rental_ends_date)) : '';
        return Inertia::render('Quotations/Edit', [
            'quotation' => $quotation,
            'products' => $products,
            'routes' => [
                'quotations' => [
                    'index' => route('quotations.index'),
                ],
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        // Get all fields directly from request
        $data = [
            'quotation_number' => $request->input('quotation_number', ''),
            'client_name' => $request->input('client_name', ''),
            'client_reference' => $request->input('client_reference', ''),
            'quotation_date' => $request->input('quotation_date', ''),
            'rental_starts_date' => $request->input('rental_starts_date', ''),
            'rental_ends_date' => $request->input('rental_ends_date', ''),
            'rental_period' => $request->input('rental_period', ''),
            'refundable_insurance' => $request->input('refundable_insurance', 0),
            // details is already an array from Inertia
            'details' => $request->input('details', []),
        ];

    // Now validate using Laravel's Validator
    $validator = Validator::make($data, [
        'quotation_number' => 'required|string',
        'client_name' => 'required|string',
        'client_reference' => 'nullable|string',
        'quotation_date' => 'required|date',
        'rental_starts_date' => 'required|date',
        'rental_ends_date' => 'required|date|after:rental_starts_date',
        'rental_period' => 'required|string',
        'details' => 'required|array|min:1',
        'details.*.product_name' => 'required|string',
        'details.*.item_code' => 'required|string',
        'details.*.qty_required' => 'required|numeric|min:1',
        'details.*.product_price' => 'required|numeric|min:0',
        'refundable_insurance' => 'nullable|numeric|min:0',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    $validated = $validator->validated();

    // --- your existing logic begins here ---
    $quotation = \App\Models\Quotation::findOrFail($id);

    $manual_counter = 1;
    $total_net_price_amount = 0;
    $total_discount_amount = 0;
    $vat_15_percent_amount = 0;
    $total_with_vat_amount = 0;
    $refundable_insurance_amount = $validated['refundable_insurance'] ?? 0;

    $detailIDsFromRequest = [];

    foreach ($validated['details'] as $i => $detail) {
        $isManual = empty($detail['product_id']) || !is_numeric($detail['product_id']);
        $product_id = $detail['product_id'] ?? null;
        if ($isManual) {
            $product_id = 'Manual-' . $manual_counter;
            $manual_counter++;
        }
        $product_name = $detail['product_name'] ?? null;
        $item_code = $detail['item_code'] ?? null;
        $qty = $detail['qty_required'];
        $unit_price = $detail['product_price'] ?? 0;

        // If an existing Product, fill missing fields
        if ($product_id && is_numeric($product_id) && (empty($product_name) || empty($item_code))) {
            $product = \App\Models\Product::find($product_id);
            if ($product) {
                $product_name = $product->name;
                $item_code = $product->item_code;
                $unit_price = $unit_price ?: $product->price;
            }
        }

        $total_price = $unit_price * $qty;
        $net = $total_price;
        $vat = $net * 0.15;
        $with_vat = $net + $vat;

        // Handle image logic (upload to S3 if new image; preserve old if not)
        $product_image = $detail['image_url'] ?? null;

        if ($isManual && $request->hasFile("images.$i")) {
            $imgFile = $request->file("images.$i");
            $imgName = 'quotation_img_' . uniqid() . '.' . $imgFile->getClientOriginalExtension();
            $s3path = $imgFile->storeAs('RQS/Quotation_Images', $imgName, 's3');
            Storage::disk('s3')->setVisibility($s3path, 'public');
            $product_image = Storage::disk('s3')->url($s3path);
        }

        $total_net_price_amount += $net;
        $vat_15_percent_amount += $vat;
        $total_with_vat_amount += $with_vat;

        if (!empty($detail['id'])) {
            // Update existing detail
            $quotationDetail = \App\Models\QuotationDetail::find($detail['id']);
            if ($quotationDetail) {
                $quotationDetail->update([
                    'product_id' => $product_id,
                    'item_code' => $item_code,
                    'product_name' => $product_name,
                    'product_image' => $product_image,
                    'qty_required' => $qty,
                    'unit_price' => $unit_price,
                    'total_price' => $total_price
                ]);
                $detailIDsFromRequest[] = $quotationDetail->id;
                continue;
            }
        }

        // Create new detail if not found
        $newDetail = $quotation->details()->create([
            'product_id' => $product_id,
            'item_code' => $item_code,
            'product_name' => $product_name,
            'product_image' => $product_image,
            'qty_required' => $qty,
            'unit_price' => $unit_price,
            'total_price' => $total_price
        ]);
        $detailIDsFromRequest[] = $newDetail->id;
    }

    $total_price_with_insurance_amount = $total_with_vat_amount + $refundable_insurance_amount;

    $quotation->update([
        'quotation_number' => $validated['quotation_number'],
        'quotation_date' => $validated['quotation_date'],
        'client_name' => $validated['client_name'],
        'client_reference' => $validated['client_reference'],
        'rental_period' => $validated['rental_period'],
        'rental_starts_date' => $validated['rental_starts_date'],
        'rental_ends_date' => $validated['rental_ends_date'],
        'total_net_price_amount' => $total_net_price_amount,
        'total_with_vat_amount' => $total_with_vat_amount,
        'total_discount_amount' => $total_discount_amount,
        'vat_15_percent_amount' => $vat_15_percent_amount,
        'refundable_insurance_amount' => $refundable_insurance_amount,
        'total_price_with_insurance_amount' => $total_price_with_insurance_amount
    ]);

    // Remove deleted details
    $quotation->details()->whereNotIn('id', $detailIDsFromRequest)->delete();

    return redirect()->route('quotations.index')->with('success', 'Quotation updated successfully');
}

    public function destroy($id)
    {
        $quotation = Quotation::findOrFail($id);
        $quotation->details()->delete();
        $quotation->delete();

        return redirect()->route('quotations.index')->with('success', 'Quotation has been deleted successfully.');
    }
}