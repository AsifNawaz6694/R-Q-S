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
        'rental_ends_date',
        'total_net_price_amount',
        'total_discount_amount',
        'vat_15_percent_amount',
        'total_with_vat_amount',
        'refundable_insurance_amount',
        'total_price_with_insurance_amount'
    ];

    protected $dates = [
        'quotation_date',
        'rental_starts_date',
        'rental_ends_date',
        'deleted_at'
    ];

    protected $casts = [
        'total_net_price_amount' => 'decimal:2',
        'total_discount_amount' => 'decimal:2',
        'vat_15_percent_amount' => 'decimal:2',
        'total_with_vat_amount' => 'decimal:2',
        'refundable_insurance_amount' => 'decimal:2',
        'total_price_with_insurance_amount' => 'decimal:2'
    ];

    public function details()
    {
        return $this->hasMany(QuotationDetail::class);
    }

    public function calculateTotalAmount()
    {
        return $this->total_price_with_insurance_amount;
    }

    public function calculateTotalWithVat()
    {
        return $this->total_with_vat_amount;
    }

    public function calculateTotalNetPrice()
    {
        return $this->total_net_price_amount;
    }
}
