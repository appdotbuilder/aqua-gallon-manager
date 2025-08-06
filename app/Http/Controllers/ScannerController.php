<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScannerController extends Controller
{
    /**
     * Display the scanner interface.
     */
    public function index()
    {
        return Inertia::render('scanner', [
            'recentDistributions' => $this->getRecentDistributions()
        ]);
    }

    /**
     * Process scanned employee ID.
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
            'gallons' => 'integer|min:1|max:5',
        ]);

        $employee = Employee::where('employee_id', $request->employee_id)
            ->active()
            ->first();

        if (!$employee) {
            return Inertia::render('scanner', [
                'error' => 'Employee not found or inactive.',
                'recentDistributions' => $this->getRecentDistributions()
            ]);
        }

        $employee->checkAndResetQuota();

        $gallonsRequested = $request->gallons ?? 1;

        if (!$employee->canTakeGallon()) {
            return Inertia::render('scanner', [
                'error' => 'Employee has no remaining quota for this month.',
                'employee' => $employee,
                'recentDistributions' => $this->getRecentDistributions()
            ]);
        }

        if ($employee->current_quota < $gallonsRequested) {
            return Inertia::render('scanner', [
                'error' => "Employee only has {$employee->current_quota} gallon(s) remaining in quota.",
                'employee' => $employee,
                'recentDistributions' => $this->getRecentDistributions()
            ]);
        }

        $success = $employee->distributeGallon($gallonsRequested);

        if ($success) {
            $employee->refresh();
            return Inertia::render('scanner', [
                'success' => "Successfully distributed {$gallonsRequested} gallon(s) to {$employee->name}.",
                'employee' => $employee,
                'recentDistributions' => $this->getRecentDistributions()
            ]);
        }

        return Inertia::render('scanner', [
            'error' => 'Failed to distribute gallon. Please try again.',
            'employee' => $employee,
            'recentDistributions' => $this->getRecentDistributions()
        ]);
    }

    /**
     * Get recent distributions for display.
     */
    protected function getRecentDistributions()
    {
        return \App\Models\GallonDistribution::with('employee')
            ->latest('distributed_at')
            ->take(5)
            ->get();
    }
}