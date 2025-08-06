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
        Schema::create('gallon_distributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->integer('gallons_taken')->default(1);
            $table->text('notes')->nullable();
            $table->timestamp('distributed_at');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('distributed_at');
            $table->index(['employee_id', 'distributed_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallon_distributions');
    }
};