<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ShareAuthData
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): mixed
    {
        // Share auth data with Inertia
        Inertia::share('authUser', function () {
            return Auth::user();
        });

        return $next($request);
    }
}
