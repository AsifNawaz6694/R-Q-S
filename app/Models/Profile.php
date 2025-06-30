<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'contact_name',
        'contact_number',
        'contact_email',
        'vat_number',
        'quotation_count'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
