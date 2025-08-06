<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_authenticated_user_can_view_employees_index(): void
    {
        $user = User::factory()->create();
        Employee::factory()->count(10)->create();

        $response = $this->actingAs($user)->get('/employees');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('employees/index')
            ->has('employees.data', 10)
        );
    }

    public function test_authenticated_user_can_create_employee(): void
    {
        $user = User::factory()->create();

        $employeeData = [
            'employee_id' => 'TEST123',
            'name' => 'John Doe',
            'department' => 'Information Technology',
            'monthly_quota' => 15,
            'is_active' => true,
        ];

        $response = $this->actingAs($user)->post('/employees', $employeeData);

        $response->assertRedirect();
        $this->assertDatabaseHas('employees', [
            'employee_id' => 'TEST123',
            'name' => 'John Doe',
            'department' => 'Information Technology',
            'monthly_quota' => 15,
            'current_quota' => 15,
            'is_active' => true,
        ]);
    }

    public function test_authenticated_user_can_view_employee(): void
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create();

        $response = $this->actingAs($user)->get("/employees/{$employee->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('employees/show')
            ->has('employee')
        );
    }

    public function test_authenticated_user_can_update_employee(): void
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create();

        $updatedData = [
            'employee_id' => $employee->employee_id,
            'name' => 'Updated Name',
            'department' => 'Updated Department',
            'monthly_quota' => 20,
            'is_active' => true,
        ];

        $response = $this->actingAs($user)->put("/employees/{$employee->id}", $updatedData);

        $response->assertRedirect();
        $this->assertDatabaseHas('employees', [
            'id' => $employee->id,
            'name' => 'Updated Name',
            'department' => 'Updated Department',
            'monthly_quota' => 20,
        ]);
    }

    public function test_authenticated_user_can_delete_employee(): void
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create();

        $response = $this->actingAs($user)->delete("/employees/{$employee->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('employees', [
            'id' => $employee->id,
        ]);
    }

    public function test_guest_cannot_access_employee_management(): void
    {
        $response = $this->get('/employees');
        $response->assertRedirect('/login');
    }
}