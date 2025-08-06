import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';

interface Props {
    employees?: {
        total: number;
        active: number;
        totalQuota: number;
        remainingQuota: number;
    };
    recentDistributions?: Array<{
        id: number;
        employee: {
            name: string;
            employee_id: string;
        };
        gallons_taken: number;
        distributed_at: string;
    }>;
    [key: string]: unknown;
}

export default function Dashboard({ employees, recentDistributions }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppShell>
            <Head title="Dashboard - PT Aqua Distribution" />
            
            <div className="container mx-auto p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            📊 Distribution Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Overview of gallon distribution system and employee management
                        </p>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">📱</div>
                                    <h3 className="font-semibold text-blue-900 mb-2">Start Scanning</h3>
                                    <p className="text-blue-700 text-sm mb-4">
                                        Scan employee cards and distribute gallons
                                    </p>
                                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                                        <Link href="/scanner">Open Scanner</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-green-200">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">👥</div>
                                    <h3 className="font-semibold text-green-900 mb-2">Manage Employees</h3>
                                    <p className="text-green-700 text-sm mb-4">
                                        Add, edit, and manage employee records
                                    </p>
                                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                                        <Link href="/employees">Manage Employees</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-50 border-purple-200">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">⚙️</div>
                                    <h3 className="font-semibold text-purple-900 mb-2">System Settings</h3>
                                    <p className="text-purple-700 text-sm mb-4">
                                        Configure application preferences
                                    </p>
                                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                                        <Link href="/settings">Settings</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Statistics */}
                    {employees && (
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
                                            <p className="text-sm font-medium text-gray-600">Active Employees</p>
                                            <p className="text-2xl font-bold text-gray-900">{employees.active}</p>
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
                                            <p className="text-sm font-medium text-gray-600">Total Monthly Quota</p>
                                            <p className="text-2xl font-bold text-gray-900">{employees.totalQuota}</p>
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
                                            <p className="text-sm font-medium text-gray-600">Remaining Quota</p>
                                            <p className="text-2xl font-bold text-gray-900">{employees.remainingQuota}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Recent Activity */}
                    {recentDistributions && recentDistributions.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">🕒</span>
                                    Recent Distributions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Employee</th>
                                                <th className="text-left py-2">Employee ID</th>
                                                <th className="text-left py-2">Gallons</th>
                                                <th className="text-left py-2">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentDistributions.map((distribution) => (
                                                <tr key={distribution.id} className="border-b">
                                                    <td className="py-2 font-medium">
                                                        {distribution.employee.name}
                                                    </td>
                                                    <td className="py-2 font-mono text-sm">
                                                        {distribution.employee.employee_id}
                                                    </td>
                                                    <td className="py-2">
                                                        <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                            {distribution.gallons_taken}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 text-gray-600">
                                                        {formatDate(distribution.distributed_at)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="mt-4 text-center">
                                    <Button variant="outline" asChild>
                                        <Link href="/scanner">
                                            View All Activity
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* System Status */}
                    <Card className="mt-8 bg-gray-50">
                        <CardContent className="pt-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🟢</div>
                                    <h3 className="font-semibold text-gray-900 mb-1">System Status</h3>
                                    <p className="text-green-600 text-sm font-medium">All Systems Operational</p>
                                </div>

                                <div className="text-center">
                                    <div className="text-2xl mb-2">🔌</div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Arduino Integration</h3>
                                    <p className="text-blue-600 text-sm font-medium">Ready for Barcode Scanning</p>
                                </div>

                                <div className="text-center">
                                    <div className="text-2xl mb-2">📅</div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Monthly Reset</h3>
                                    <p className="text-gray-600 text-sm font-medium">Next: {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}
