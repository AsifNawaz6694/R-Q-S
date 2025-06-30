<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\StoreDetail;

class StoreDetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('store_details')->delete();
        $storeDetails = [
            [
                'store_id' => 1,
                'store_name' => 'RENTAL',
                'warehouse_name' => 'Jeddah',
                'warehouse_id' => 'WHSE10',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'store_id' => 1,
                'store_name' => 'RENTAL',
                'warehouse_name' => 'Riyadh',
                'warehouse_id' => 'WHSE6',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'store_id' => 1,
                'store_name' => 'RENTAL',
                'warehouse_name' => 'Dammam',
                'warehouse_id' => 'WHSE1',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        DB::table('store_details')->insert($storeDetails);
    }
}
