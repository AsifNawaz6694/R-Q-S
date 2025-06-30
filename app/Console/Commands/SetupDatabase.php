<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SetupDatabase extends Command
{
    protected $signature = 'setup:database';
    protected $description = 'Setup database and create test user';

    public function handle()
    {
        try {
            $this->info('Running migrations...');
            \Artisan::call('migrate:fresh');

            $this->info('Creating test user...');
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now()
            ]);

            $this->info('Setup completed successfully!');
            $this->info('You can now login with:');
            $this->info('Email: admin@example.com');
            $this->info('Password: password123');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
