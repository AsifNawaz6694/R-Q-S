<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'item_code',
        'description_english',
        'description_arabic',
        'picture',
        'main_category',
        'sub_category',
        'fixed_assets_count',
        'ekuep_selling_price',
        'item_cost',
        'daily_cost',
        'daily_rate',
        'phase',
        'voltage',
        'amps',
        'kw',
        'is_available',
        'warehouse_id',
        'store_id'
    ];
}
