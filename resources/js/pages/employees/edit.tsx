import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputError } from '@/components/input-error';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    monthly_quota: number;
    current_quota: number;
    is_active: boolean;
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function EmployeesEdit({ employee }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        employee_id: employee.employee_id,
        name: employee.name,
        department: employee.department,
        monthly_quota: employee.monthly_quota,
        is_active: employee.is_active,
    });

    const departments = [
        'Human Resources',
        'Information Technology',
        'Finance',
        'Marketing',
        'Operations',
        'Sales',
        'Customer Service',
        'Quality Assurance',
        'Research & Development',
        'Administration',
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/employees/${employee.id}`);
    };

    return (
        <AppShell>
            <Head title={`Edit Employee: ${employee.name}`} />
            
            <div className="container mx-auto p-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-4">
                            <Button variant="outline" asChild>
                                <Link href={`/employees/${employee.id}`}>
                                    ← Back to Employee
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            ✏️ Edit Employee
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Update employee information and quota settings
                        </p>
                    </div>

                    {/* Current Status Card */}
                    <Card className="mb-8 bg-gray-50">
                        <CardHeader>
                            <CardTitle className="text-lg">Current Employee Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Current Quota</p>
                                    <p className="text-lg font-semibold text-blue-600">
                                        {employee.current_quota}/{employee.monthly_quota}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Used This Month</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {employee.monthly_quota - employee.current_quota}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                        employee.is_active 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {employee.is_active ? '✅ Active' : '❌ Inactive'}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Employee Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employee ID *
                                        </label>
                                        <Input
                                            type="text"
                                            value={data.employee_id}
                                            onChange={(e) => setData('employee_id', e.target.value)}
                                            placeholder="e.g., EMP001"
                                            className={errors.employee_id ? 'border-red-300' : ''}
                                        />
                                        <InputError message={errors.employee_id} className="mt-1" />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Unique identifier for the employee
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Monthly Quota *
                                        </label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={data.monthly_quota}
                                            onChange={(e) => setData('monthly_quota', parseInt(e.target.value) || 10)}
                                            className={errors.monthly_quota ? 'border-red-300' : ''}
                                        />
                                        <InputError message={errors.monthly_quota} className="mt-1" />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Number of gallons per month (1-100)
                                        </p>
                                        {data.monthly_quota !== employee.monthly_quota && (
                                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                                                ⚠️ Changing the monthly quota will not affect the current remaining quota
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <Input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter full name"
                                        className={errors.name ? 'border-red-300' : ''}
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Department *
                                    </label>
                                    <select
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.department ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.department} className="mt-1" />
                                </div>

                                <div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                            Employee is active
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Only active employees can receive gallon distributions
                                    </p>
                                    {!data.is_active && employee.is_active && (
                                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                                            ⚠️ Deactivating this employee will prevent them from receiving gallons
                                        </div>
                                    )}
                                </div>

                                {/* Changes Summary */}
                                {(data.employee_id !== employee.employee_id ||
                                  data.name !== employee.name ||
                                  data.department !== employee.department ||
                                  data.monthly_quota !== employee.monthly_quota ||
                                  data.is_active !== employee.is_active) && (
                                    <div className="border-t pt-6">
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">Changes Summary</h3>
                                        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
                                            {data.employee_id !== employee.employee_id && (
                                                <p>• Employee ID: <span className="font-medium">{employee.employee_id}</span> → <span className="font-medium">{data.employee_id}</span></p>
                                            )}
                                            {data.name !== employee.name && (
                                                <p>• Name: <span className="font-medium">{employee.name}</span> → <span className="font-medium">{data.name}</span></p>
                                            )}
                                            {data.department !== employee.department && (
                                                <p>• Department: <span className="font-medium">{employee.department}</span> → <span className="font-medium">{data.department}</span></p>
                                            )}
                                            {data.monthly_quota !== employee.monthly_quota && (
                                                <p>• Monthly Quota: <span className="font-medium">{employee.monthly_quota}</span> → <span className="font-medium">{data.monthly_quota}</span></p>
                                            )}
                                            {data.is_active !== employee.is_active && (
                                                <p>• Status: <span className="font-medium">{employee.is_active ? 'Active' : 'Inactive'}</span> → <span className="font-medium">{data.is_active ? 'Active' : 'Inactive'}</span></p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end space-x-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href={`/employees/${employee.id}`}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? '⏳ Updating...' : '💾 Update Employee'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}