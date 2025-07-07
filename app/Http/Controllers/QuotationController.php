<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\QuotationDetail;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

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

    // Prepare to calculate the totals for the master quotation
    $manual_counter = 1;
    $total_net_price_amount = 0;
    $total_discount_amount = 0; // (set as needed)
    $vat_15_percent_amount = 0;
    $total_with_vat_amount = 0;
    $refundable_insurance_amount = $validated['refundable_insurance'] ?? 0;

    // We'll need to build these inside the details loop now!
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
            $imgName = 'quotation_img_' . uniqid() . '.' . $imgFile->getClientOriginalExtension();
            $imgFile->move(public_path('images/quotation_images'), $imgName);
            $product_image = 'images/quotation_images/' . $imgName;
        } elseif (isset($detail['image_url']) && $detail['image_url']) {
            $product_image = $detail['image_url'];
        }

        // Collect for overall totals
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
    // --- End loop: we now have totals and per-line items

    // Calculate grand total including insurance
    $total_price_with_insurance_amount = $total_with_vat_amount + $refundable_insurance_amount;

    // 3. Create the master quotation record with correct totals
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

    // 4. Insert all details
    foreach ($detailsForInsert as $detail) {
        $quotation->details()->create($detail);
    }

    return redirect()->route('quotations.index')->with('success', 'Quotation created successfully');
}

    public function show($id)
    {
        $quotation = Quotation::with('details.product')->findOrFail($id);
        
        return inertia('quotations/Show', [
            'quotation' => $quotation
        ]);
    }
}
