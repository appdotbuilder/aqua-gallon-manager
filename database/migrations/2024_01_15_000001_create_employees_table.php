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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique()->comment('Employee ID number');
            $table->string('name')->comment('Employee full name');
            $table->string('department')->comment('Employee department');
            $table->integer('monthly_quota')->default(10)->comment('Monthly gallon quota');
            $table->integer('current_quota')->default(10)->comment('Remaining gallon quota for current month');
            $table->date('quota_reset_date')->comment('Date when quota was last reset');
            $table->boolean('is_active')->default(true)->comment('Employee active status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('department');
            $table->index('is_active');
            $table->index(['is_active', 'department']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};