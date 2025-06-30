<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class UserManagementController extends BaseController
{


    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);
        
        $query = User::query()->with('profile');
        
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhereHas('profile', function ($query) use ($search) {
                        $query->where('company_name', 'like', '%' . $search . '%')
                            ->orWhere('contact_name', 'like', '%' . $search . '%')
                            ->orWhere('contact_number', 'like', '%' . $search . '%')
                            ->orWhere('contact_email', 'like', '%' . $search . '%')
                            ->orWhere('vat_number', 'like', '%' . $search . '%');
                    });
            });
        }

        $users = $query->latest()
            ->paginate(10, ['*'], 'page', $page);

        return Inertia::render('Auth/UserManagement', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'page' => $page
            ],

        ]);
    }

    public function create()
    {
        return Inertia::render('Auth/UserManagementCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'company_name' => 'nullable|string|max:255',
            'contact_name' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'vat_number' => 'nullable|string|max:50',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        if ($validated['company_name'] || $validated['contact_name'] || 
            $validated['contact_number'] || $validated['contact_email'] || 
            $validated['vat_number']) {
            $user->profile()->create([
                'company_name' => $validated['company_name'],
                'contact_name' => $validated['contact_name'],
                'contact_number' => $validated['contact_number'],
                'contact_email' => $validated['contact_email'],
                'vat_number' => $validated['vat_number'],
            ]);
        }

        return Redirect::route('users.index')->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        return Inertia::render('Auth/UserManagementEdit', [
            'user' => $user->load('profile')
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'company_name' => 'nullable|string|max:255',
            'contact_name' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'vat_number' => 'nullable|string|max:50',

        ]);

        DB::transaction(function () use ($user, $validated) {
            // Update user
            $user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
            ]);

            // Update profile if it exists
            if ($user->profile) {
                $user->profile->update([
                    'company_name' => $validated['company_name'] ?? null,
                    'contact_name' => $validated['contact_name'] ?? null,
                    'contact_number' => $validated['contact_number'] ?? null,
                    'contact_email' => $validated['contact_email'] ?? null,
                    'vat_number' => $validated['vat_number'] ?? null,
                ]);
            } else {
                // Create profile if it doesn't exist
                if ($validated['company_name'] || $validated['contact_name'] || 
                    $validated['contact_number'] || $validated['contact_email'] || 
                    $validated['vat_number']) {
                    $user->profile()->create([
                        'company_name' => $validated['company_name'],
                        'contact_name' => $validated['contact_name'],
                        'contact_number' => $validated['contact_number'],
                        'contact_email' => $validated['contact_email'],
                        'vat_number' => $validated['vat_number'],
                    ]);
                }
            }



            // Refresh session if updating current user
            if (Auth::id() === $user->id) {
                Auth::user()->forceFill([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                ])->save();
            }
        });

        return Redirect::route('users.index')->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        // Delete the user's profile first if it exists
        if ($user->profile) {
            $user->profile->delete();
        }
        
        $user->delete();
        return Redirect::route('users.index')->with('success', 'User and associated profile deleted successfully');
    }
}
