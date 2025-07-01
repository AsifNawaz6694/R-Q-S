<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Validation\Rule;

class ProductController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);
        $trashed = $request->input('trashed', '');
        $status = $request->input('status', '');
        
        $query = Product::when($trashed === 'only', function ($query) {
            return $query->onlyTrashed();
        });
        
        if (!empty($search)) {
            $searchPattern = '%' . strtolower($search) . '%';
            
            $query->where(function ($query) use ($searchPattern) {
                $query->whereRaw("LOWER(title) LIKE ?", [$searchPattern])
                    ->orWhereRaw("LOWER(item_code) LIKE ?", [$searchPattern])
                    ->orWhereRaw("LOWER(description_english) LIKE ?", [$searchPattern])
                    ->orWhereRaw("LOWER(main_category) LIKE ?", [$searchPattern])
                    ->orWhereRaw("LOWER(sub_category) LIKE ?", [$searchPattern])
                    ->orWhereRaw("CAST(daily_rate AS CHAR) LIKE ?", [$searchPattern]);
            });
        }

        if ($status) {
            $query->where('status', $status);
        }

        $maxPerPage = 100;
        $perPage = min($perPage, $maxPerPage);

        $products = $query->latest()
            ->paginate($perPage, ['*'], 'page', $page);

        // Update status for all products
        $products->each(function ($product) {
            if ($product->status === null) {
                $product->status = 'active';
                $product->save();
            }
        });

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'trashed' => $trashed,
                'status' => $status
            ]
        ])->with(['products'])->with(['filters']);
    }

    public function clearSearch()
    {
        return redirect()->route('products.index');
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            
            return redirect()->back()->with('success', 'Product moved to trash successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error moving product to trash: ' . $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $product = Product::withTrashed()->findOrFail($id);
            $product->restore();
            
            return redirect()->back()->with('success', 'Product restored successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error restoring product: ' . $e->getMessage());
        }
    }

    public function updateStatus(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        // Validate status
        $validated = $request->validate([
            'status' => ['required', 'in:active,inactive']
        ]);

        $product->status = $validated['status'];
        $product->save();

        return redirect()->back()->with('success', 'Product status updated successfully.');
    }

    public function create()
    {
        return Inertia::render('Products/CreatePage');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Products/EditPage', [
            'product' => $product
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'item_code' => ['required', 'string', 'unique:products'],
            'description' => ['required', 'string'],
            'main_category' => ['required', 'string'],
            'sub_category' => ['required', 'string'],
            'ekuep_selling_price' => ['required', 'numeric', 'min:0'],
            'fixed_assets_count' => ['required', 'integer', 'min:0'],
            'avg_rental_period' => ['nullable', 'numeric', 'min:0'],
            'avg_daily_rate' => ['nullable', 'numeric', 'min:0'],
            'daily_rate' => ['required', 'numeric', 'min:0'],
            'daily_cost' => ['nullable', 'numeric', 'min:0'],
            'item_cost' => ['nullable', 'numeric', 'min:0'],
            'phase' => ['nullable', 'string'],
            'voltage' => ['nullable', 'integer', 'min:0'],
            'amps' => ['nullable', 'integer', 'min:0'],
            'kw' => ['nullable', 'numeric', 'min:0'],
            'picture' => ['nullable', 'url'],
            'is_available' => ['boolean'],
            'status' => ['required', 'in:active,inactive']
        ], [
            'status.in' => 'The status must be either active or inactive.',
        ]);

        // If status is not provided, default to 'active'
        if (!isset($validated['status'])) {
            $validated['status'] = 'active';
        }

        Product::create($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'item_code' => ['required', 'string', Rule::unique('products')->ignore($id)],
            'description' => ['required', 'string'],
            'main_category' => ['required', 'string'],
            'sub_category' => ['required', 'string'],
            'ekuep_selling_price' => ['required', 'numeric', 'min:0'],
            'fixed_assets_count' => ['required', 'integer', 'min:0'],
            'avg_rental_period' => ['nullable', 'numeric', 'min:0'],
            'avg_daily_rate' => ['nullable', 'numeric', 'min:0'],
            'daily_rate' => ['required', 'numeric', 'min:0'],
            'daily_cost' => ['nullable', 'numeric', 'min:0'],
            'item_cost' => ['nullable', 'numeric', 'min:0'],
            'phase' => ['nullable', 'string'],
            'voltage' => ['nullable', 'integer', 'min:0'],
            'amps' => ['nullable', 'integer', 'min:0'],
            'kw' => ['nullable', 'numeric', 'min:0'],
            'picture' => ['nullable', 'url'],
            'is_available' => ['boolean'],
            'status' => ['required', 'in:active,inactive']
        ]);

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }
}
