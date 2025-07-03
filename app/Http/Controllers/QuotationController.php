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
        return inertia('quotations/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'quotation_number' => 'required|unique:quotations',
            'quotation_date' => 'required|date',
            'client_name' => 'required',
            'rental_period' => 'required',
            'details' => 'required|array',
            'details.*.product_name' => 'required',
            'details.*.qty_required' => 'required|numeric|min:1',
        ]);

        $quotation = Quotation::create([
            'quotation_number' => $validated['quotation_number'],
            'quotation_date' => $validated['quotation_date'],
            'client_name' => $validated['client_name'],
            'rental_period' => $validated['rental_period'],
        ]);

        foreach ($validated['details'] as $detail) {
            $quotation->details()->create([
                'product_name' => $detail['product_name'],
                'qty_required' => $detail['qty_required'],
                'total_price_with_insurance_amount' => $detail['total_price_with_insurance_amount'] ?? 0,
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
