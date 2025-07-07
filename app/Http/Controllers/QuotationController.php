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
            $query->select('id', 'quotation_id', 'product_name', 'qty_required', 'total_price_with_insurance_amount');
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

    // 2. Validate all incoming fields (using migration field names)
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
    ]);

    // 3. Create the main quotation record
    $quotation = \App\Models\Quotation::create([
        'quotation_number' => $validated['quotation_number'],
        'quotation_date' => $validated['quotation_date'],
        'client_name' => $validated['client_name'],
        'client_reference' => $validated['client_reference'],
        'rental_period' => $validated['rental_period'],
        'rental_starts_date' => $validated['rental_starts_date'],
        'rental_ends_date' => $validated['rental_ends_date'],
    ]);

    // 4. Store details rows, both manual and normal product lines (handle images for manual)
    foreach ($validated['details'] as $i => $detail) {
        $product_id = $detail['product_id'] ?? null;
        $product_name = $detail['product_name'] ?? null;
        $item_code = $detail['item_code'] ?? null;
        $qty = $detail['qty_required'];
        $unit_price = $detail['product_price'] ?? 0;
    
        // --- fix: fill in missing name/item_code if product_id is set
        if ($product_id && (empty($product_name) || empty($item_code))) {
            $product = \App\Models\Product::find($product_id);
            if ($product) {
                $product_name = $product->name; // always use DB value if missing
                $item_code = $product->item_code;
                $unit_price = $unit_price ?: $product->price;
            }
        }
    
        $total_price = $unit_price * $qty;
        $vat_amount = $total_price * 0.15;
        $refundable_insurance = $detail['refundable_insurance'] ?? 0;
        $total_with_vat = $total_price + $vat_amount;
        $total_with_insurance = $total_with_vat + $refundable_insurance;
    
        $product_image = null;
        if ($product_id === null && $request->hasFile("images.$i")) {
            $imgFile = $request->file("images.$i");
            $imgName = 'quotation_img_'.uniqid().'.'.$imgFile->getClientOriginalExtension();
            $imgFile->move(public_path('images/quotation_images'), $imgName);
            $product_image = 'images/quotation_images/' . $imgName;
        } elseif (isset($detail['image_url']) && $detail['image_url']) {
            $product_image = $detail['image_url'];
        }
    
        $quotation->details()->create([
            'product_id' => $product_id,
            'item_code' => $item_code,
            'product_name' => $product_name,
            'product_image' => $product_image,
            'qty_required' => $qty,
            'unit_price' => $unit_price,
            'total_price' => $total_price,
            'total_net_price_amount' => $total_price,
            'total_discount_amount' => 0,
            'vat_15_percent_amount' => $vat_amount,
            'total_with_vat_amount' => $total_with_vat,
            'refundable_insurance_amount' => $refundable_insurance,
            'total_price_with_insurance_amount' => $total_with_insurance,
        ]);
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
