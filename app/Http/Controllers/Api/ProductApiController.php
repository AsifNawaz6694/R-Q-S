<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\Middleware\Authorize;

use Illuminate\Routing\Controller as BaseController;

class ProductApiController extends BaseController
{
    /**
     * Get all products for quotation creation
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Check specific product price in database
        $specificProduct = DB::table('products')
            ->select('ekuep_selling_price')
            ->where('id', 2)
            ->first();
        
        \Log::info('Specific product price check:', [
            'product_id' => 2,
            'raw_price' => $specificProduct->ekuep_selling_price,
            'type' => gettype($specificProduct->ekuep_selling_price)
        ]);

        // Get all products
        $products = DB::table('products')
            ->select(
                'id',
                'title as name',
                'item_code',
                'ekuep_selling_price',
                'picture as image_url'
            )
            ->whereNull('deleted_at')
            ->get();

        // Log all products data
        \Log::info('Raw products data:', [
            'products' => $products->toArray()
        ]);

        return $products->map(function ($product) {
            $price = $product->ekuep_selling_price;
            
            if (is_null($price) || $price === '') {
                $price = 0.0;
            }
        
            $price = floatval($price);
        
            return [
                'id' => $product->id,
                'name' => $product->name,
                'item_code' => $product->item_code,
                'price' => $price,
                'image_url' => $product->image_url
            ];
        });
    }
}
