<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('quotation_number');
            $table->date('quotation_date');
            $table->string('client_reference');
            $table->string('client_name');
            $table->string('rental_period'); // Store as string (e.g., "5Days", "1month 10Days")
            $table->date('rental_starts_date');
            $table->date('rental_ends_date');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quotations');
    }
};
