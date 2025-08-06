import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    monthly_quota: number;
    current_quota: number;
    is_active: boolean;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface EmployeesData {
    data: Employee[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    employees: EmployeesData;
    [key: string]: unknown;
}

export default function EmployeesIndex({ employees }: Props) {
    const handleDelete = (employee: Employee) => {
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
            router.delete(`/employees/${employee.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppShell>
            <Head title="Employee Management" />
            
            <div className="container mx-auto p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                👥 Employee Management
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage employee information and gallon quotas
                            </p>
                        </div>
                        <Button asChild>
                            <Link href="/employees/create">
                                ➕ Add New Employee
                            </Link>
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <span className="text-blue-600 text-lg">👥</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Employees</p>
                                        <p className="text-2xl font-bold text-gray-900">{employees.total}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <span className="text-green-600 text-lg">✅</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Active</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {employees.data.filter(emp => emp.is_active).length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-yellow-100 rounded-full">
                                        <span className="text-yellow-600 text-lg">💧</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Quota</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {employees.data.reduce((sum, emp) => sum + emp.monthly_quota, 0)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-red-100 rounded-full">
                                        <span className="text-red-600 text-lg">📊</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Remaining</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {employees.data.reduce((sum, emp) => sum + emp.current_quota, 0)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Employee Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Employee List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {employees.data.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No employees found.</p>
                                    <Button asChild>
                                        <Link href="/employees/create">
                                            Add Your First Employee
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-4">Employee ID</th>
                                                <th className="text-left py-3 px-4">Name</th>
                                                <th className="text-left py-3 px-4">Department</th>
                                                <th className="text-left py-3 px-4">Quota Status</th>
                                                <th className="text-left py-3 px-4">Status</th>
                                                <th className="text-left py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.data.map((employee) => (
                                                <tr key={employee.id} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 px-4">
                                                        <span className="font-mono font-medium">
                                                            {employee.employee_id}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {employee.name}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                            {employee.department}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm text-gray-600">
                                                                {employee.current_quota}/{employee.monthly_quota}
                                                            </span>
                                                            <div className="w-16 bg-gray-200 rounded-full h-2">
                                                                <div 
                                                                    className={`h-2 rounded-full ${
                                                                        employee.current_quota > employee.monthly_quota * 0.5 
                                                                            ? 'bg-green-600' 
                                                                            : employee.current_quota > employee.monthly_quota * 0.2 
                                                                                ? 'bg-yellow-600' 
                                                                                : 'bg-red-600'
                                                                    }`}
                                                                    style={{ 
                                                                        width: `${(employee.current_quota / employee.monthly_quota) * 100}%` 
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                            employee.is_active 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {employee.is_active ? '✅ Active' : '❌ Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                asChild
                                                            >
                                                                <Link href={`/employees/${employee.id}`}>
                                                                    👁️ View
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                asChild
                                                            >
                                                                <Link href={`/employees/${employee.id}/edit`}>
                                                                    ✏️ Edit
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleDelete(employee)}
                                                            >
                                                                🗑️ Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination */}
                            {employees.last_page > 1 && (
                                <div className="mt-6 flex items-center justify-center space-x-1">
                                    {employees.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => {
                                                if (link.url) {
                                                    router.get(link.url);
                                                }
                                            }}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}