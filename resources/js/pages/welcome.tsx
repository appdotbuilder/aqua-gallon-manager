import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="PT Aqua - Gallon Distribution System" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                <div className="container mx-auto px-6 py-12">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-blue-600 p-4 rounded-full mr-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                💧 PT Aqua Distribution System
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Advanced name card scanning system for efficient gallon distribution management. 
                            Track employee quotas, scan ID cards, and manage distribution seamlessly.
                        </p>
                    </div>

                    {/* Main Features */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Name Card Scanning</h3>
                                <p className="text-gray-600">
                                    Instantly scan employee name cards to display their information and current gallon quota
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quota Management</h3>
                                <p className="text-gray-600">
                                    Track monthly gallon quotas (10 per employee) with automatic monthly reset functionality
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⚙️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Panel</h3>
                                <p className="text-gray-600">
                                    Complete employee management with add, edit, delete functionality and quota control
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔌</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Arduino Integration</h3>
                                <p className="text-gray-600">
                                    Direct barcode sensor integration for seamless data capture from scanning devices
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
                                <p className="text-gray-600">
                                    Live distribution tracking with employee information display and quota monitoring
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Access</h3>
                                <p className="text-gray-600">
                                    User authentication and role-based access control for admin and scanning operations
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Demo Interface Preview */}
                    <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                            📋 System Interface Preview
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-4xl">📱</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Scanner Interface</h3>
                                <p className="text-gray-600 text-sm">
                                    Real-time employee scanning with quota display and distribution tracking
                                </p>
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-4xl">👥</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Employee Management</h3>
                                <p className="text-gray-600 text-sm">
                                    Complete CRUD operations for employee data and quota management
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        {auth.user ? (
                            <div className="space-y-4">
                                <p className="text-lg text-gray-700">
                                    Welcome back, <strong>{auth.user.name}</strong>! 👋
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button 
                                        asChild
                                        size="lg" 
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                                    >
                                        <Link href="/scanner">
                                            🔍 Start Scanning
                                        </Link>
                                    </Button>
                                    <Button 
                                        asChild
                                        size="lg" 
                                        variant="outline"
                                        className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                                    >
                                        <Link href="/employees">
                                            👥 Manage Employees
                                        </Link>
                                    </Button>
                                    <Button 
                                        asChild
                                        size="lg" 
                                        variant="outline"
                                        className="border-gray-600 text-gray-600 hover:bg-gray-50 px-8 py-3 text-lg"
                                    >
                                        <Link href="/dashboard">
                                            📊 Dashboard
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-lg text-gray-700">
                                    Ready to streamline your gallon distribution process?
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button 
                                        asChild
                                        size="lg" 
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                                    >
                                        <Link href="/login">
                                            🔑 Login to System
                                        </Link>
                                    </Button>
                                    <Button 
                                        asChild
                                        size="lg" 
                                        variant="outline"
                                        className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                                    >
                                        <Link href="/register">
                                            📝 Create Account
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
                        <p>© 2024 PT Aqua. Advanced gallon distribution management system.</p>
                    </footer>
                </div>
            </div>
        </>
    );
}