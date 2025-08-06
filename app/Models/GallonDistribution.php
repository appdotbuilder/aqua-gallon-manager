<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GallonDistribution
 *
 * @property int $id
 * @property int $employee_id
 * @property int $gallons_taken
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon $distributed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Employee $employee
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution query()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution whereDistributedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution whereGallonsTaken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonDistribution whereUpdatedAt($value)
 * @method static \Database\Factories\GallonDistributionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GallonDistribution extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'gallons_taken',
        'notes',
        'distributed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'distributed_at' => 'datetime',
        'gallons_taken' => 'integer',
    ];

    /**
     * Get the employee that received the gallon.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}