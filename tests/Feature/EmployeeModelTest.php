<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\GallonDistribution;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_employee_quota_resets_when_month_changes(): void
    {
        $employee = Employee::factory()->create([
            'monthly_quota' => 10,
            'current_quota' => 5,
            'quota_reset_date' => now()->subMonth(),
        ]);

        $employee->checkAndResetQuota();

        $this->assertEquals(10, $employee->current_quota);
        $this->assertEquals(now()->startOfMonth()->format('Y-m-d'), $employee->quota_reset_date->format('Y-m-d'));
    }

    public function test_employee_quota_does_not_reset_in_same_month(): void
    {
        $employee = Employee::factory()->create([
            'monthly_quota' => 10,
            'current_quota' => 5,
            'quota_reset_date' => now()->startOfMonth(),
        ]);

        $employee->checkAndResetQuota();

        $this->assertEquals(5, $employee->current_quota);
    }

    public function test_active_employee_with_quota_can_take_gallon(): void
    {
        $employee = Employee::factory()->create([
            'current_quota' => 5,
            'is_active' => true,
            'quota_reset_date' => now()->startOfMonth(),
        ]);

        $this->assertTrue($employee->canTakeGallon());
    }

    public function test_inactive_employee_cannot_take_gallon(): void
    {
        $employee = Employee::factory()->create([
            'current_quota' => 5,
            'is_active' => false,
        ]);

        $this->assertFalse($employee->canTakeGallon());
    }

    public function test_employee_without_quota_cannot_take_gallon(): void
    {
        $employee = Employee::factory()->create([
            'current_quota' => 0,
            'is_active' => true,
            'quota_reset_date' => now()->startOfMonth(),
        ]);

        $this->assertFalse($employee->canTakeGallon());
    }

    public function test_distribute_gallon_reduces_quota_and_creates_record(): void
    {
        $employee = Employee::factory()->create([
            'current_quota' => 5,
            'is_active' => true,
            'quota_reset_date' => now()->startOfMonth(),
        ]);

        $success = $employee->distributeGallon(2, 'Test distribution');

        $this->assertTrue($success);
        $this->assertEquals(3, $employee->current_quota);
        
        $this->assertDatabaseHas('gallon_distributions', [
            'employee_id' => $employee->id,
            'gallons_taken' => 2,
            'notes' => 'Test distribution',
        ]);
    }

    public function test_cannot_distribute_more_gallons_than_quota(): void
    {
        $employee = Employee::factory()->create([
            'current_quota' => 1,
            'is_active' => true,
            'quota_reset_date' => now()->startOfMonth(),
        ]);

        $success = $employee->distributeGallon(2);

        $this->assertFalse($success);
        $this->assertEquals(1, $employee->current_quota);
        
        $this->assertDatabaseMissing('gallon_distributions', [
            'employee_id' => $employee->id,
        ]);
    }

    public function test_employee_has_distributions_relationship(): void
    {
        $employee = Employee::factory()->create();
        $distribution = GallonDistribution::factory()->create([
            'employee_id' => $employee->id,
        ]);

        $this->assertTrue($employee->distributions->contains($distribution));
    }

    public function test_active_scope_returns_only_active_employees(): void
    {
        Employee::factory()->create(['is_active' => true]);
        Employee::factory()->create(['is_active' => false]);
        Employee::factory()->create(['is_active' => true]);

        $activeEmployees = Employee::active()->get();

        $this->assertCount(2, $activeEmployees);
        $this->assertTrue($activeEmployees->every(fn($emp) => $emp->is_active));
    }
}