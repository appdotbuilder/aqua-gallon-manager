<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\GallonDistribution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample employees
        $employees = Employee::factory(20)->create();

        // Create some distributions for random employees
        $employees->random(10)->each(function ($employee) {
            GallonDistribution::factory(random_int(1, 3))->create([
                'employee_id' => $employee->id,
            ]);
        });

        // Create a specific test employee for easy testing
        Employee::factory()->create([
            'employee_id' => 'TEST001',
            'name' => 'John Doe',
            'department' => 'Information Technology',
            'monthly_quota' => 10,
            'current_quota' => 8,
            'is_active' => true,
        ]);
    }
}