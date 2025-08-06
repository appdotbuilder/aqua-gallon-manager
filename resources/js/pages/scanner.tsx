import React, { useState, useRef, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    monthly_quota: number;
    current_quota: number;
    is_active: boolean;
}

interface Distribution {
    id: number;
    gallons_taken: number;
    distributed_at: string;
    employee: Employee;
}

interface Props {
    employee?: Employee;
    error?: string;
    success?: string;
    recentDistributions: Distribution[];
    [key: string]: unknown;
}

export default function Scanner({ employee, error, success, recentDistributions }: Props) {
    const [employeeId, setEmployeeId] = useState('');
    const [gallons, setGallons] = useState(1);
    const [isScanning, setIsScanning] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus on input when page loads
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        // Clear input after successful scan
        if (success) {
            setEmployeeId('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [success]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!employeeId.trim()) return;

        setIsScanning(true);
        router.post('/scanner', 
            { 
                employee_id: employeeId.trim(),
                gallons: gallons 
            }, 
            {
                preserveState: false,
                preserveScroll: true,
                onFinish: () => setIsScanning(false)
            }
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isScanning) {
            handleSubmit(e);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppShell>
            <Head title="Scanner - Gallon Distribution" />
            
            <div className="container mx-auto p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            📱 Gallon Distribution Scanner
                        </h1>
                        <p className="text-gray-600">
                            Scan employee ID cards to distribute gallons and track quotas
                        </p>
                    </div>

                    {/* Scanner Interface */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Scanning Form */}
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">🔍</span>
                                    Scan Employee ID
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employee ID
                                        </label>
                                        <Input
                                            ref={inputRef}
                                            type="text"
                                            value={employeeId}
                                            onChange={(e) => setEmployeeId(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Scan or type employee ID..."
                                            className="text-lg"
                                            disabled={isScanning}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Gallons
                                        </label>
                                        <select
                                            value={gallons}
                                            onChange={(e) => setGallons(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            disabled={isScanning}
                                        >
                                            <option value={1}>1 Gallon</option>
                                            <option value={2}>2 Gallons</option>
                                            <option value={3}>3 Gallons</option>
                                            <option value={4}>4 Gallons</option>
                                            <option value={5}>5 Gallons</option>
                                        </select>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full" 
                                        disabled={isScanning || !employeeId.trim()}
                                    >
                                        {isScanning ? '🔄 Processing...' : '✅ Distribute Gallon'}
                                    </Button>
                                </form>

                                {/* Status Messages */}
                                {error && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-red-700 text-sm">❌ {error}</p>
                                    </div>
                                )}

                                {success && (
                                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                        <p className="text-green-700 text-sm">✅ {success}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Employee Information */}
                        {employee && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <span className="mr-2">👤</span>
                                        Employee Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Employee ID</p>
                                                <p className="text-lg font-semibold">{employee.employee_id}</p>
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

                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Name</p>
                                            <p className="text-lg font-semibold">{employee.name}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Department</p>
                                            <p className="text-lg">{employee.department}</p>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Monthly Quota</p>
                                                    <p className="text-lg font-semibold">{employee.monthly_quota}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Remaining</p>
                                                    <p className={`text-lg font-semibold ${
                                                        employee.current_quota > 5 
                                                            ? 'text-green-600' 
                                                            : employee.current_quota > 2 
                                                                ? 'text-yellow-600' 
                                                                : 'text-red-600'
                                                    }`}>
                                                        {employee.current_quota}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quota Progress Bar */}
                                            <div className="mt-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm font-medium text-gray-700">Quota Usage</span>
                                                    <span className="text-sm text-gray-500">
                                                        {employee.monthly_quota - employee.current_quota}/{employee.monthly_quota}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div 
                                                        className={`h-2.5 rounded-full ${
                                                            employee.current_quota > 5 
                                                                ? 'bg-green-600' 
                                                                : employee.current_quota > 2 
                                                                    ? 'bg-yellow-600' 
                                                                    : 'bg-red-600'
                                                        }`}
                                                        style={{ 
                                                            width: `${((employee.monthly_quota - employee.current_quota) / employee.monthly_quota) * 100}%` 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Recent Distributions */}
                    {recentDistributions && recentDistributions.length > 0 && (
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📊</span>
                                    Recent Distributions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Employee</th>
                                                <th className="text-left py-2">Department</th>
                                                <th className="text-left py-2">Gallons</th>
                                                <th className="text-left py-2">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentDistributions.map((distribution) => (
                                                <tr key={distribution.id} className="border-b">
                                                    <td className="py-2 font-medium">
                                                        {distribution.employee.name}
                                                        <div className="text-xs text-gray-500">
                                                            ID: {distribution.employee.employee_id}
                                                        </div>
                                                    </td>
                                                    <td className="py-2">{distribution.employee.department}</td>
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
                            </CardContent>
                        </Card>
                    )}

                    {/* Instructions */}
                    <Card className="mt-8 bg-blue-50">
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-blue-900 mb-2">📋 Scanner Instructions</h3>
                            <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Place employee ID card near the Arduino barcode scanner</li>
                                <li>• The system will automatically populate the Employee ID field</li>
                                <li>• Select the number of gallons to distribute (1-5)</li>
                                <li>• Click "Distribute Gallon" or press Enter to process</li>
                                <li>• Employee quota will be automatically updated</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}