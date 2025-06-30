<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function show()
    {
        $profile = auth()->user()->profile;
        return view('profile.show', compact('profile'));
    }

    public function edit()
    {
        $profile = auth()->user()->profile;
        return view('profile.edit', compact('profile'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'nullable|string|max:255',
            'contact_name' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'vat_number' => 'nullable|string|max:50',
        ]);

        $profile = auth()->user()->profile;
        if (!$profile) {
            $profile = new Profile(['user_id' => auth()->id()]);
        }

        $profile->update($validated);

        return redirect()->route('profile.show')->with('success', 'Profile updated successfully');
    }
}
