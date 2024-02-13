<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status', ["Sale", "Rent"]);
            $table->decimal('price', 18, 2);
            $table->integer('rent_amount_per')->nullable();
            $table->decimal('area', 18, 2);
            $table->bigInteger('country');
            $table->bigInteger('state');
            $table->bigInteger('city')->nullable();
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('rooms')->nullable();
            $table->integer('garages')->nullable();
            $table->integer('units')->nullable();
            $table->integer('floor_number')->nullable();
            $table->integer('year_built')->nullable();
            $table->string('property_finalizing')->nullable();
            $table->string('phone')->nullable();
            $table->string('youtube_video')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
