<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StoreDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Collection;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class ProductImportController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function importForm()
    {
        return view('products.import');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls|max:2048'
        ]);

        // Delete existing products
        Product::truncate();

        $file = $request->file('file');
        $data = \Excel::toArray([], $file);

        // Skip header row (first row)
        foreach (array_slice($data[0], 1) as $row) {
            $item_code = $row['1'];
            
            // Skip if item code is empty or already exists
            if (empty($item_code) || Product::where('item_code', $item_code)->exists()) {
                continue;
            }

            $product = new Product();
            // Map fields using column names from Excel
            $product->ekuep_product_id = $row['0'];
            $product->item_code = $item_code;
            $product->title = $row['2'] ?? 'Not Available';
            $product->description_english = $row['3'] ?? 'Not Available';
            $product->description_arabic = $row['4'] ?? 'Not Available';
            $product->main_category = $row['5'] ?? 'Not Available';
            $product->sub_category = $row['6'] ?? 'Not Available';
            $product->ekuep_selling_price = $row['7'] ?? 0;
            $product->item_cost = 0;
            $product->is_available = 1;
            $product->daily_cost = 0;
            $product->daily_rate = 0;
            $product->phase = 'Not Available';
            $product->voltage = 0;
            $product->amps = 0;
            $product->kw = 0;
            $product->warehouse_id = 'WHSE1';
            $product->store_id = 1;
            
            // Save product first
            $product->save();
            
            // Update store and warehouse IDs
            $product->update([
                'warehouse_id' => $row['warehouse_id'] ?? 'WHSE1',
                'store_id' => 1
            ]);
        }

        return redirect()->back()->with('flash.success', 'Products imported successfully!');
    }

    public function downloadTemplate()
    {
        $headers = [
            'ekuep_product_id', 'item_code', 'title', 'description', 'description_arabic', 'description_english',
            'picture', 'main_category', 'sub_category', 'fixed_assets_count', 'ekuep_selling_price',
            'item_cost', 'daily_cost', 'daily_rate', 'phase', 'voltage', 'amps', 'kw', 'times_quoted',
            'avg_rental_period', 'avg_daily_rate', 'warehouse_id'
        ];

        $export = new class($headers) implements FromCollection {
            private $headers;
            
            public function __construct($headers)
            {
                $this->headers = $headers;
            }
            
            public function collection(): Collection
            {
                return new Collection([$this->headers]);
            }
        };

        return Excel::download($export, 'products_template.xlsx');
    }
}
