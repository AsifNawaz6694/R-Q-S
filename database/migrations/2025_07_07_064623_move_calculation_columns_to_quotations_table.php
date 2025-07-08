<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // First, add the columns to quotations table after rental_ends_date
        Schema::table('quotations', function (Blueprint $table) {
            $table->decimal('total_net_price_amount', 10, 2)->after('rental_ends_date')->nullable();
            $table->decimal('total_with_vat_amount', 10, 2)->after('total_net_price_amount')->nullable();
            $table->decimal('total_discount_amount', 10, 2)->after('total_with_vat_amount')->nullable();
            $table->decimal('vat_15_percent_amount', 10, 2)->after('total_discount_amount')->nullable();
            $table->decimal('refundable_insurance_amount', 10, 2)->after('vat_15_percent_amount')->nullable();
            $table->decimal('total_price_with_insurance_amount', 10, 2)->after('refundable_insurance_amount')->nullable();
        });

        // Then, remove the columns from quotation_details table
        Schema::table('quotation_details', function (Blueprint $table) {
            $table->dropColumn([
                'total_net_price_amount',
                'total_discount_amount',
                'total_with_vat_amount',
                'vat_15_percent_amount',
                'refundable_insurance_amount',
                'total_price_with_insurance_amount'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // First, add the columns back to quotation_details table
        Schema::table('quotation_details', function (Blueprint $table) {
            $table->decimal('total_net_price_amount', 10, 2)->after('product_image')->nullable();
            $table->decimal('total_with_vat_amount', 10, 2)->after('total_net_price_amount')->nullable();
            $table->decimal('total_discount_amount', 10, 2)->after('total_net_price_amount')->nullable();
            $table->decimal('vat_15_percent_amount', 10, 2)->after('total_discount_amount')->nullable();
            $table->decimal('refundable_insurance_amount', 10, 2)->after('vat_15_percent_amount')->nullable();
            $table->decimal('total_price_with_insurance_amount', 10, 2)->after('refundable_insurance_amount')->nullable();
        });

        // Then, remove the columns from quotations table
        Schema::table('quotations', function (Blueprint $table) {
            $table->dropColumn([
                'total_net_price_amount',
                'total_with_vat_amount',
                'total_discount_amount',
                'vat_15_percent_amount',
                'refundable_insurance_amount',
                'total_price_with_insurance_amount'
            ]);
        });
    }
};
