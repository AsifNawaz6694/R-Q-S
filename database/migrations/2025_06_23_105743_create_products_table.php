<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('item_code')->unique();
            $table->text('description');
            $table->string('picture')->nullable();
            $table->string('main_category');
            $table->string('sub_category')->nullable();
            $table->integer('fixed_assets_count')->default(0);
            $table->decimal('ekuep_selling_price', 10, 2)->nullable();
            $table->decimal('item_cost', 10, 2)->nullable();
            $table->decimal('daily_cost', 10, 2)->nullable();
            $table->decimal('daily_rate', 10, 2)->nullable();
            $table->string('phase')->nullable();
            $table->integer('voltage')->nullable();
            $table->integer('amps')->nullable();
            $table->decimal('kw', 10, 2)->nullable();
            $table->integer('times_quoted')->default(0);
            $table->decimal('avg_rental_period', 10, 2)->nullable();
            $table->decimal('avg_daily_rate', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
