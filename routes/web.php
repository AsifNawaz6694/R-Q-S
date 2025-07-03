<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\ProductImportController;
use App\Http\Controllers\QuotationController;
use Illuminate\Support\Facades\URL;

// Redirect root path to login
Route::get('/', function () {
    return redirect()->to('/login');
});



// Public routes
Route::get('/test', function () {
    return Inertia::render('Test');
});

// Authentication routes
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Password reset routes
Route::get('/password/reset', [LoginController::class, 'showResetForm'])->name('password.request');
Route::post('/password/email', [LoginController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/password/reset/{token}', [LoginController::class, 'showResetForm'])->name('password.reset');
Route::post('/password/reset', [LoginController::class, 'reset'])->name('password.update');

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware(['verified'])
        ->name('dashboard');

    // Products Routes
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::put('/products/{product}/restore', [ProductController::class, 'restore'])->name('products.restore');
    Route::put('/products/{product}/toggle-status', [ProductController::class, 'toggleStatus'])->name('products.toggle-status');

    // Product Import Routes
    Route::get('/products/import', [ProductImportController::class, 'importForm'])->name('products.import.form');
    Route::post('/products/import', [ProductImportController::class, 'import'])->name('products.import');
    Route::get('/products/template', [ProductImportController::class, 'downloadTemplate'])->name('products.downloadTemplate');
    

    
    // User Management
    Route::resource('users', UserManagementController::class)
        ->names([
            'index' => 'users.index',
            'create' => 'users.create',
            'store' => 'users.store',
            'show' => 'users.show',
            'edit' => 'users.edit',
            'update' => 'users.update',
            'destroy' => 'users.destroy'
        ]);
    
    // Add the view route with a different name to avoid conflicts
    Route::get('/users/{user}', [UserManagementController::class, 'show'])
        ->name('users.view');
    
    // Profile
    Route::get('/profile', [DashboardController::class, 'showProfile'])
        ->name('profile');
    Route::put('/profile', [DashboardController::class, 'updateProfile'])
        ->name('profile.update');

    // Products
    Route::resource('products', ProductController::class);
    Route::get('/products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{id}/status', [ProductController::class, 'updateStatus'])->name('products.updateStatus');

    // Clients
    Route::resource('clients', ClientsController::class);

    // Quotations
    Route::resource('quotations', QuotationController::class);
    Route::get('/quotations/{id}', [QuotationController::class, 'show'])->name('quotations.show');

});// Close the auth middleware group

// Catch-all route for 404 errors
Route::fallback(function () {
    return abort(404);
});

require __DIR__.'/auth.php';
