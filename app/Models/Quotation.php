<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quotation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'quotation_number',
        'quotation_date',
        'client_reference',
        'client_name',
        'rental_period',
        'rental_starts_date',
        'rental_ends_date'
    ];

    protected $dates = [
        'quotation_date',
        'rental_starts_date',
        'rental_ends_date',
        'deleted_at'
    ];

    public function details()
    {
        return $this->hasMany(QuotationDetail::class);
    }

    public function calculateTotalAmount()
    {
        return $this->details->sum('total_price_with_insurance_amount');
    }
}
