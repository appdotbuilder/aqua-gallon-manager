<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\GallonDistribution;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GallonDistribution>
 */
class GallonDistributionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\GallonDistribution>
     */
    protected $model = GallonDistribution::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'gallons_taken' => random_int(1, 2),
            'notes' => $this->faker->optional()->sentence(),
            'distributed_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ];
    }
}