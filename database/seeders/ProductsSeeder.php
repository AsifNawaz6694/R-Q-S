<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->delete();
        // Get store details IDs
        $storeDetails = DB::table('store_details')->pluck('id')->toArray();
        
        $categories = [
            'Electrical Equipment',
            'Lighting',
            'Generators',
            'Tools',
            'Safety Equipment',
            'Cables & Connectors'
        ];

        $subcategories = [
            'Circuit Breakers',
            'Lamps',
            'Diesel',
            'Power Tools',
            'PPE',
            'Extension Cables'
        ];

        $phases = ['Single', 'Three'];
        $voltage = [230, 400];
        $amps = range(10, 100);

        for ($i = 1; $i <= 100; $i++) {
            $mainCat = $categories[array_rand($categories)];
            $subCat = $subcategories[array_rand($subcategories)];
            
            switch($mainCat) {
                case 'Electrical Equipment':
                    $title = "Electrical Equipment $i";
                    break;
                case 'Lighting':
                    $title = "Lighting Equipment $i";
                    break;
                case 'Generators':
                    $title = "Generator $i";
                    break;
                case 'Tools':
                    $title = "Power Tool $i";
                    break;
                case 'Safety Equipment':
                    $title = "Safety Gear $i";
                    break;
                case 'Cables & Connectors':
                    $title = "Electrical Cable $i";
                    break;
                default:
                    $title = "Product $i";
            };

            // Add some variety to the titles
            if (rand(1, 5) === 1) {
                $title .= " - Premium";
            } elseif (rand(1, 5) === 2) {
                $title .= " - Professional";
            } elseif (rand(1, 5) === 3) {
                $title .= " - Heavy Duty";
            } elseif (rand(1, 5) === 4) {
                $title .= " - Industrial";
            }

            // Get a random warehouse from store_id 1
            $warehouse = DB::table('store_details')
                ->where('store_id', 1)
                ->inRandomOrder()
                ->first();
            
            $storeId = 1;
            $warehouseId = $warehouse->warehouse_id;

            DB::table('products')->insert([
                'title' => $title,
                'item_code' => 'PRD' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'description' => "Product $i - $mainCat $subCat",
                'main_category' => $mainCat,
                'sub_category' => $subCat,
                'fixed_assets_count' => rand(1, 10),
                'ekuep_selling_price' => rand(1000, 10000),
                'item_cost' => rand(500, 8000),
                'daily_cost' => rand(10, 100),
                'daily_rate' => rand(20, 200),
                'phase' => $phases[array_rand($phases)],
                'voltage' => $voltage[array_rand($voltage)],
                'amps' => $amps[array_rand($amps)],
                'kw' => rand(1, 10),
                'times_quoted' => rand(0, 50),
                'avg_rental_period' => rand(1, 30),
                'avg_daily_rate' => rand(15, 180),
                'store_id' => $storeId,
                'warehouse_id' => $warehouseId,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
