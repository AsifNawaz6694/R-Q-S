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
                        'time' => $user->created_at->diffForHumans(),
                        'color' => 'bg-blue-500'
                    ];
                })
        );

        // Add product activities
        $recentActivity = $recentActivity->merge(
            Product::orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function($product) {
                    // Use the product's ID if name column doesn't exist
                    $description = property_exists($product, 'name') ? $product->name : 'Product #' . $product->id;
                    
                    // Check if product was updated recently
                    $type = $product->created_at->diffInMinutes($product->updated_at) > 5 ? 'product_updated' : 'product_added';
                    
                    return [
                        'type' => $type,
                        'description' => $description,
                        'time' => $product->created_at->diffForHumans(),
                        'color' => $type === 'product_updated' ? 'bg-yellow-500' : 'bg-green-500'
                    ];
                })
        );

        // Sort activities by time
        $recentActivity = $recentActivity->sortByDesc('time')->toArray();

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
