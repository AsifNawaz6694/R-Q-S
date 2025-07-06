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
        $validated = $request->validate([
            'client_name' => 'required|string',
            'client_reference' => 'nullable|string',
            'quotation_date' => 'required|date',
            'rental_starts' => 'required|date',
            'rental_ends' => 'required|date|after:rental_starts',
            'quotation_number' => 'required|string',
            'details' => 'required|array|min:1',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.qty_required' => 'required|numeric|min:1',
        ]);

        // Generate unique quotation number
        $lastQuotation = Quotation::latest('id')->first();
        $nextNumber = $lastQuotation ? (int)substr($lastQuotation->quotation_number, 2) + 1 : 00000;
        $quotationNumber = 'Q-' . str_pad($nextNumber, 5, '0', STR_PAD_LEFT) ;

        $quotation = Quotation::create([
            'quotation_number' => $quotationNumber,
            'quotation_date' => $validated['quotation_date'],
            'client_name' => $validated['client_name'],
            'client_reference' => $validated['client_reference'],
            'rental_starts' => $validated['rental_starts'],
            'rental_ends' => $validated['rental_ends'],
        ]);

        foreach ($validated['details'] as $detail) {
            $product = \App\Models\Product::findOrFail($detail['product_id']);
            
            // Calculate prices
            $unitPrice = $product->price;
            $totalPrice = $unitPrice * $detail['qty_required'];
            $vatAmount = $totalPrice * 0.15;
            $insuranceAmount = $totalPrice * 0.02; // 2% insurance
            $totalWithInsurance = $totalPrice + $insuranceAmount;

            $quotation->details()->create([
                'product_id' => $detail['product_id'],
                'product_name' => $product->name,
                'qty_required' => $detail['qty_required'],
                'unit_price' => $unitPrice,
                'total_price' => $totalPrice,
                'vat_15_percent_amount' => $vatAmount,
                'refundable_insurance_amount' => $insuranceAmount,
                'total_price_with_insurance_amount' => $totalWithInsurance,
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
