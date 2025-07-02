<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Quotation;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class DashboardController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        // Get statistics
        $stats = [
            'total_users' => User::count(),
            'total_products' => Product::count(),
            'total_quotations' => 0 // Quotations table not created yet
        ];

        // Get recent activity from database
        $recentActivity = collect([]);
        
        // Add user registrations
        $recentActivity = $recentActivity->merge(
            User::select('id', 'name', 'created_at')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function($user) {
                    return [
                        'type' => 'user_registration',
                        'description' => $user->name,
                        'time' => $user->created_at,
                        'color' => 'bg-blue-500'
                    ];
                })
        );

        // Add product activities
        $recentActivity = $recentActivity->merge(
            Product::select('id', 'title', 'created_at', 'updated_at', 'deleted_at')
                ->withTrashed()
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get()
                ->map(function($product) {
                    $description = $product->title ?? 'Product #' . $product->id;
                    
                    // Determine activity type based on product status
                    $type = 'product_added';
                    $time = $product->created_at;
                    $color = 'bg-green-500';

                    // Check if product was updated
                    if ($product->created_at->lt($product->updated_at)) {
                        $type = 'product_updated';
                        $time = $product->updated_at;
                        $color = 'bg-yellow-500';
                    }

                    // Check if product was deleted
                    if ($product->trashed()) {
                        $type = 'product_deleted';
                        $time = $product->deleted_at;
                        $color = 'bg-red-500';
                    }
                    
                    return [
                        'type' => $type,
                        'description' => $description,
                        'time' => $time,
                        'color' => $color
                    ];
                })
        );

        // Sort activities by time (most recent first)
        $recentActivity = $recentActivity
        ->filter(fn ($activity) => $activity['time']) // removes null timestamps
        ->sortByDesc('time')
        ->take(10)
        ->values()
        ->toArray();
        $user = auth()->user();
        
        return Inertia::render('Auth/Dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'authUser' => $user
        ]);
    }

    public function showProfile()
    {
        $user = auth()->user();
        return Inertia::render('Profile/Index', [
            'authUser' => $user
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . auth()->id(),
            'company_name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'contact_email' => 'required|string|email|max:255',
            'vat_number' => 'required|string|max:20',
        ]);

        DB::transaction(function () use ($validated) {
            // Update user
            auth()->user()->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);

            // Update profile
            auth()->user()->profile()->update([
                'company_name' => $validated['company_name'],
                'contact_name' => $validated['contact_name'],
                'contact_number' => $validated['contact_number'],
                'contact_email' => $validated['contact_email'],
                'vat_number' => $validated['vat_number'],
            ]);

            // Refresh session with fresh user data
            $user = auth()->user()->fresh();
            auth()->login($user);
        });

        return Redirect::route('users.index')->with('success', 'Profile updated successfully.');
    }
}
