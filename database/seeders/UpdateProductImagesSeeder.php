<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class UpdateProductImagesSeeder extends Seeder
{
    public function run()
    {
        $imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDq8eQS57RIfRYtv4wmLsGs2mHBeUWhQdPA&s';
        
        Product::query()
            ->whereNull('picture')
            ->update(['picture' => $imageUrl]);
        
        $this->command->info('Product images updated successfully!');
    }
}
