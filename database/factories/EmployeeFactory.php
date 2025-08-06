<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Employee>
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departments = [
            'Human Resources',
            'Information Technology',
            'Finance',
            'Marketing',
            'Operations',
            'Sales',
            'Customer Service',
            'Quality Assurance',
            'Research & Development',
            'Administration'
        ];

        return [
            'employee_id' => 'EMP' . $this->faker->unique()->numberBetween(1000, 9999),
            'name' => $this->faker->name(),
            'department' => $this->faker->randomElement($departments),
            'monthly_quota' => 10,
            'current_quota' => random_int(0, 10),
            'quota_reset_date' => now()->startOfMonth(),
            'is_active' => $this->faker->boolean(90), // 90% chance of being active
        ];
    }

    /**
     * Indicate that the employee is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the employee has no quota remaining.
     */
    public function noQuota(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_quota' => 0,
        ]);
    }
}