import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Distribution {
    id: number;
    gallons_taken: number;
    notes: string | null;
    distributed_at: string;
}

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    monthly_quota: number;
    current_quota: number;
    is_active: boolean;
    quota_reset_date: string;
    created_at: string;
    updated_at: string;
    distributions: Distribution[];
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function EmployeesShow({ employee }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
            router.delete(`/employees/${employee.id}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const usedQuota = employee.monthly_quota - employee.current_quota;
    const quotaPercentage = (usedQuota / employee.monthly_quota) * 100;

    return (
        <AppShell>
            <Head title={`Employee: ${employee.name}`} />
            
            <div className="container mx-auto p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-4">
                            <Button variant="outline" asChild>
                                <Link href="/employees">
                                    ← Back to Employees
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    👤 {employee.name}
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Employee ID: <span className="font-mono font-medium">{employee.employee_id}</span>
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant="outline" asChild>
                                    <Link href={`/employees/${employee.id}/edit`}>
                                        ✏️ Edit
                                    </Link>
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    🗑️ Delete
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Employee Information Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📋</span>
                                    Employee Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Employee ID</p>
                                        <p className="text-lg font-mono font-semibold">{employee.employee_id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                                        <p className="text-lg font-semibold">{employee.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Department</p>
                                        <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            {employee.department}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Status</p>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
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

                        {/* Quota Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">💧</span>
                                    Gallon Quota Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Monthly Quota</p>
                                            <p className="text-2xl font-bold text-blue-600">{employee.monthly_quota}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Remaining</p>
                                            <p className={`text-2xl font-bold ${
                                                employee.current_quota > employee.monthly_quota * 0.5 
                                                    ? 'text-green-600' 
                                                    : employee.current_quota > employee.monthly_quota * 0.2 
                                                        ? 'text-yellow-600' 
                                                        : 'text-red-600'
                                            }`}>
                                                {employee.current_quota}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Used</p>
                                            <p className="text-2xl font-bold text-gray-800">{usedQuota}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Usage %</p>
                                            <p className="text-2xl font-bold text-gray-800">{quotaPercentage.toFixed(1)}%</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">Quota Usage</span>
                                            <span className="text-sm text-gray-500">
                                                {usedQuota}/{employee.monthly_quota}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div 
                                                className={`h-4 rounded-full transition-all ${
                                                    employee.current_quota > employee.monthly_quota * 0.5 
                                                        ? 'bg-green-600' 
                                                        : employee.current_quota > employee.monthly_quota * 0.2 
                                                            ? 'bg-yellow-600' 
                                                            : 'bg-red-600'
                                                }`}
                                                style={{ width: `${quotaPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Last Reset</p>
                                        <p className="text-sm text-gray-700">
                                            {formatDate(employee.quota_reset_date)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Distribution History */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <span className="mr-2">📊</span>
                                Recent Distribution History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {employee.distributions && employee.distributions.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3">Date & Time</th>
                                                <th className="text-left py-3">Gallons Taken</th>
                                                <th className="text-left py-3">Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employee.distributions.map((distribution) => (
                                                <tr key={distribution.id} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 text-gray-700">
                                                        {formatDate(distribution.distributed_at)}
                                                    </td>
                                                    <td className="py-3">
                                                        <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                            {distribution.gallons_taken} gallon{distribution.gallons_taken > 1 ? 's' : ''}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-gray-600">
                                                        {distribution.notes || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-4xl mb-4">📭</div>
                                    <p className="text-gray-500 text-lg mb-2">No distribution history</p>
                                    <p className="text-gray-400 text-sm">
                                        This employee hasn't received any gallon distributions yet.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="mt-8 bg-blue-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-1">🚀 Quick Actions</h3>
                                    <p className="text-blue-700 text-sm">
                                        Need to distribute gallons to this employee?
                                    </p>
                                </div>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                    <Link href="/scanner">
                                        📱 Go to Scanner
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timestamps */}
                    <div className="mt-6 text-xs text-gray-500 space-y-1">
                        <p>Created: {formatDate(employee.created_at)}</p>
                        <p>Last Updated: {formatDate(employee.updated_at)}</p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}