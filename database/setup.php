<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

require __DIR__ . '/../vendor/autoload.php';

// Create database if it doesn't exist
try {
    DB::statement('CREATE DATABASE IF NOT EXISTS rental_quotation_system');
    
    // Select the database
    DB::statement('USE rental_quotation_system');
    
    // Run migrations
    echo "Running migrations...\n";
    \Artisan::call('migrate:fresh');
    
    // Create test user
    echo "Creating test user...\n";
    DB::table('users')->insert([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => Hash::make('password123'),
        'email_verified_at' => now()
    ]);
    
    echo "Setup completed successfully!\n";
    echo "You can now login with:\n";
    echo "Email: admin@example.com\n";
    echo "Password: password123\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
