<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScannerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_authenticated_user_can_access_scanner(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/scanner');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('scanner')
            ->has('recentDistributions')
        );
    }

    public function test_can_scan_valid_employee_and_distribute_gallon(): void
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create([
            'employee_id' => 'SCANNER001',
            'current_quota' => 5,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->post('/scanner', [
            'employee_id' => 'SCANNER001',
            'gallons' => 2,
        ]);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('scanner')
            ->has('success')
            ->has('employee')
        );

        // Check that quota was reduced
        $employee->refresh();
        $this->assertEquals(3, $employee->current_quota);

        // Check that distribution record was created
        $this->assertDatabaseHas('gallon_distributions', [
            'employee_id' => $employee->id,
            'gallons_taken' => 2,
        ]);
    }

    public function test_cannot_scan_nonexistent_employee(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/scanner', [
            'employee_id' => 'NONEXISTENT',
            'gallons' => 1,
        ]);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('scanner')
            ->has('error')
        );
    }

    public function test_cannot_distribute_to_inactive_employee(): void
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create([
            'employee_id' => 'TEST002',
            'is_active' => false,
        ]);

        $response = $this->actingAs($user)->post('/scanner', [
            'employee_id' => 'TEST002',
            'gallons' => 1,
        ]);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('scanner')
            ->has('error')
        );
    }

    public function test_cannot_exceed_employee_quota(): void
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create([
            'employee_id' => 'TEST003',
            'current_quota' => 1,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->post('/scanner', [
            'employee_id' => 'TEST003',
            'gallons' => 2,
        ]);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('scanner')
            ->has('error')
        );

        // Quota should not have changed
        $employee->refresh();
        $this->assertEquals(1, $employee->current_quota);
    }

    public function test_guest_cannot_access_scanner(): void
    {
        $response = $this->get('/scanner');
        $response->assertRedirect('/login');
    }
}