<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('quotation_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quotation_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('item_code');
            $table->string('product_name');
            $table->string('product_image')->nullable();
            $table->integer('qty_required');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->decimal('total_net_price_amount', 10, 2);
            $table->decimal('total_discount_amount', 10, 2);
            $table->decimal('vat_15_percent_amount', 10, 2);
            $table->decimal('total_with_vat_amount', 10, 2);
            $table->decimal('refundable_insurance_amount', 10, 2);
            $table->decimal('total_price_with_insurance_amount', 10, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quotation_details');
    }
};
