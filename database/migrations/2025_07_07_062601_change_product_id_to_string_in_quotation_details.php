<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeProductIdToStringInQuotationDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Option 1: Try dropping by actual index name
    Schema::table('quotation_details', function (Blueprint $table) {
        $table->dropIndex('quotation_details_product_id_foreign');
    });

    Schema::table('quotation_details', function (Blueprint $table) {
        $table->string('product_id')->change();
    });
    }

    public function down()
    {
        // Down: revert column back to unsignedBigInteger and add FK again
        Schema::table('quotation_details', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id')->change();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }
}
