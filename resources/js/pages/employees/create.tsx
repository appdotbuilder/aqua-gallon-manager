import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputError } from '@/components/input-error';

export default function EmployeesCreate() {
    const { data, setData, post, processing, errors } = useForm<{
        employee_id: string;
        name: string;
        department: string;
        monthly_quota: number;
        is_active: boolean;
    }>({
        employee_id: '',
        name: '',
        department: '',
        monthly_quota: 10,
        is_active: true,
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
        post('/employees');
    };

    return (
        <AppShell>
            <Head title="Add New Employee" />
            
            <div className="container mx-auto p-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-4">
                            <Link href="/employees">
                                <Button variant="outline">
                                    ← Back to Employees
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            ➕ Add New Employee
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Create a new employee profile for gallon distribution management
                        </p>
                    </div>

                    {/* Form */}
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
                                </div>

                                {/* Preview Card */}
                                <div className="border-t pt-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500">Employee ID</p>
                                                <p className="font-mono font-medium">
                                                    {data.employee_id || 'Not set'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Name</p>
                                                <p className="font-medium">
                                                    {data.name || 'Not set'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Department</p>
                                                <p>{data.department || 'Not selected'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Monthly Quota</p>
                                                <p className="font-medium">{data.monthly_quota} gallons</p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                data.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {data.is_active ? '✅ Active' : '❌ Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Link href="/employees">
                                        <Button
                                            type="button"
                                            variant="outline"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? '⏳ Creating...' : '💾 Create Employee'}
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