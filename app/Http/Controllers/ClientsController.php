<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientsController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function index()
    {
        return Inertia::render('Clients/Index', [
            'clients' => Client::query()
                ->when(request('search'), function ($query) {
                    $query->where(function ($query) {
                        $query->where('name', 'like', '%' . request('search') . '%')
                            ->orWhere('contact_person', 'like', '%' . request('search') . '%')
                            ->orWhere('email', 'like', '%' . request('search') . '%')
                            ->orWhere('phone', 'like', '%' . request('search') . '%')
                            ->orWhere('company_name', 'like', '%' . request('search') . '%')
                            ->orWhere('vat_number', 'like', '%' . request('search') . '%');
                    });
                })
                ->paginate(15)
                ->withQueryString()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'vat_number' => 'nullable|string|max:20'
        ]);

        Client::create($validated);

        return redirect()->back()->with('success', 'Client created successfully');
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'vat_number' => 'nullable|string|max:20'
        ]);

        $client->update($validated);

        return redirect()->back()->with('success', 'Client updated successfully');
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return redirect()->back()->with('success', 'Client deleted successfully');
    }
}
