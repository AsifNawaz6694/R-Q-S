<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuotationDetail extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'quotation_id',
        'product_id',
        'item_code',
        'product_name',
        'product_image',
        'qty_required',
        'unit_price',
        'total_price',
        'total_net_price_amount',
        'total_discount_amount',
        'vat_15_percent_amount',
        'total_with_vat_amount',
        'refundable_insurance_amount',
        'total_price_with_insurance_amount'
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'total_net_price_amount' => 'decimal:2',
        'total_discount_amount' => 'decimal:2',
        'vat_15_percent_amount' => 'decimal:2',
        'total_with_vat_amount' => 'decimal:2',
        'refundable_insurance_amount' => 'decimal:2',
        'total_price_with_insurance_amount' => 'decimal:2'
    ];

    public function quotation()
    {
        return $this->belongsTo(Quotation::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function calculateVat()
    {
        return $this->total_price * 0.15;
    }

    public function calculateInsurance()
    {
        return $this->total_with_vat_amount * 0.10; // 10% insurance
    }
}
