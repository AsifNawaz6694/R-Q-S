<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;
use Faker\Factory;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Delete all records first
        Profile::query()->delete();
        User::query()->delete();

        // Admin User
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now()
        ]);

        $admin->profile()->create([
            'company_name' => 'Admin Company',
            'contact_name' => 'John Admin',
            'contact_number' => '+1234567890',
            'contact_email' => 'contact@admincompany.com',
            'vat_number' => 'VAT123456789',
            'quotation_count' => 0
        ]);

        // Generate 50 random users
        $faker = Factory::create();

        for ($i = 1; $i <= 50; $i++) {
            $user = User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password' . $i),
                'email_verified_at' => now()
            ]);

            $user->profile()->create([
                'company_name' => $faker->company,
                'contact_name' => $faker->name,
                'contact_number' => $faker->phoneNumber,
                'contact_email' => $faker->companyEmail,
                'vat_number' => 'VAT' . $faker->unique()->numerify('#########'),
                'quotation_count' => $faker->numberBetween(0, 100)
            ]);
        }
    }
}
