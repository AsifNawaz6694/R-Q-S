<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quotation;
use App\Models\QuotationDetail;
use App\Models\Product;
use Carbon\Carbon;

class QuotationSeeder extends Seeder
{
    private function generateRandomRentalPeriod()
    {
        $periods = [
            '1 month',
            '1 month 5 days',
            '1 month 10 days',
            '2 months',
            '2 months 15 days',
            '3 months',
            '3 months 20 days',
            '4 months',
            '5 months',
            '6 months'
        ];
        return $periods[array_rand($periods)];
    }

    private function calculateRentalDays($period)
    {
        if (strpos($period, 'months') !== false) {
            $months = intval(strtok($period, ' '));
            return $months * 30;
        }
        
        if (strpos($period, 'month') !== false) {
            $days = (int)strtok($period, ' ');
            return 30 + $days;
        }
        
        return (int)strtok($period, ' ');
    }

    private function generateRandomClientName()
    {
        $companies = [
            'Tech Solutions', 'Media Pro', 'Digital Innovations', 'Creative Studios',
            'Data Systems', 'Cloud Services', 'Web Dynamics', 'Tech Dynamics',
            'Digital Media', 'Pro Solutions', 'Innovate Tech', 'Smart Systems',
            'Future Tech', 'NextGen Solutions', 'Pro Digital', 'Tech Pro',
            'Media Tech', 'Digital Pro', 'Tech Media', 'Pro Media'
        ];
        
        $suffixes = ['Ltd', 'Inc', 'LLC', 'Corp', 'Group', 'Company'];
        
        return $companies[array_rand($companies)] . ' ' . $suffixes[array_rand($suffixes)];
    }

    public function run()
    {
        // Create 50 random quotations
        for ($i = 1; $i <= 50; $i++) {
            $baseDate = Carbon::now()->subDays(rand(0, 30)); // Random date in last 30 days
            $rentalPeriod = $this->generateRandomRentalPeriod();
            
            $quotation = Quotation::create([
                'quotation_number' => 'QTN-' . date('Y') . '-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'quotation_date' => $baseDate->format('Y-m-d'),
                'client_reference' => 'CL-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'client_name' => $this->generateRandomClientName(),
                'rental_period' => $rentalPeriod,
                'rental_starts_date' => $baseDate->addDays(rand(1, 3))->format('Y-m-d'),
                'rental_ends_date' => $baseDate->addDays($this->calculateRentalDays($rentalPeriod))->format('Y-m-d')
            ]);

            // Add random products to this quotation
            $products = Product::inRandomOrder()->take(rand(2, 5))->get();

            foreach ($products as $product) {
                $qty = rand(1, 3);
                $unitPrice = $product->ekuep_selling_price ?? 100;
                $discount = rand(0, 20);

                $detail = [
                    'product_id' => $product->id,
                    'item_code' => $product->item_code,
                    'product_name' => $product->title,
                    'product_image' => $product->image_url ?? null,
                    'qty_required' => $qty,
                    'unit_price' => $unitPrice,
                    'total_price' => $unitPrice * $qty,
                    'total_net_price_amount' => ($unitPrice * $qty) - ($unitPrice * $qty * ($discount / 100)),
                    'total_discount_amount' => $unitPrice * $qty * ($discount / 100),
                    'vat_15_percent_amount' => ($unitPrice * $qty) * 0.15,
                    'total_with_vat_amount' => ($unitPrice * $qty) * 1.15,
                    'refundable_insurance_amount' => ($unitPrice * $qty) * 0.10,
                    'total_price_with_insurance_amount' => ($unitPrice * $qty) * 1.25
                ];

                $quotation->details()->create($detail);
            }
        }
    }
}
