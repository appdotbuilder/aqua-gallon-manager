<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Employee
 *
 * @property int $id
 * @property string $employee_id
 * @property string $name
 * @property string $department
 * @property int $monthly_quota
 * @property int $current_quota
 * @property \Illuminate\Support\Carbon $quota_reset_date
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GallonDistribution> $distributions
 * @property-read int|null $distributions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee query()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCurrentQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereMonthlyQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereQuotaResetDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee active()
 * @method static \Database\Factories\EmployeeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'name',
        'department',
        'monthly_quota',
        'current_quota',
        'quota_reset_date',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quota_reset_date' => 'date',
        'is_active' => 'boolean',
        'monthly_quota' => 'integer',
        'current_quota' => 'integer',
    ];

    /**
     * Get the distributions for the employee.
     */
    public function distributions(): HasMany
    {
        return $this->hasMany(GallonDistribution::class);
    }

    /**
     * Scope a query to only include active employees.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Check if employee's quota needs to be reset for the current month.
     */
    public function checkAndResetQuota(): void
    {
        $currentMonth = now()->format('Y-m');
        $resetMonth = $this->quota_reset_date->format('Y-m');

        if ($currentMonth !== $resetMonth) {
            $this->update([
                'current_quota' => $this->monthly_quota,
                'quota_reset_date' => now()->startOfMonth(),
            ]);
        }
    }

    /**
     * Check if employee can take gallons.
     */
    public function canTakeGallon(): bool
    {
        $this->checkAndResetQuota();
        return $this->current_quota > 0 && $this->is_active;
    }

    /**
     * Distribute gallon to employee.
     */
    public function distributeGallon(int $gallons = 1, string $notes = null): bool
    {
        if (!$this->canTakeGallon() || $this->current_quota < $gallons) {
            return false;
        }

        $this->decrement('current_quota', $gallons);
        
        $this->distributions()->create([
            'gallons_taken' => $gallons,
            'notes' => $notes,
            'distributed_at' => now(),
        ]);

        return true;
    }
}