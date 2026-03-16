import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const StudentLayout = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Học tập', path: '/student/academic' },
        { name: 'Cảnh báo', path: '/student/riskscore' },
        { name: 'Cảm xúc', path: '/student/sentiment' },
        { name: 'Cập nhật', path: '/student/update' },
        { name: 'Phản hồi', path: '/student/feedback' },
        { name: 'Chatbot', path: '/student/chatbot' },
        { name: 'Thông tin', path: '/student/profile' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Topbar */}
            <header className="bg-white shadow border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <div className="flex-shrink-0 font-bold text-xl text-indigo-600">
                            AI-ADVISOR
                        </div>
                        {/* Navigation */}
                        <nav className="hidden md:flex space-x-4">
                            {navItems.map((item) => {
                                const isActive = location.pathname.includes(item.path);
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                    {/* User Menu & Logout */}
                    <div className="flex items-center space-x-6">
                        {/* Notifications */}
                        <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* Avatar */}
                        <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
                            <div className="flex items-center space-x-2 cursor-pointer group">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold group-hover:bg-indigo-200 transition-colors">
                                    SV
                                </div>
                                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Sinh viên</span>
                            </div>

                            {/* Logout Action */}
                            <button className="flex items-center space-x-1 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1.5 rounded-md transition-colors"
                                onClick={() => {
                                    // Xóa token (sau này) và điều hướng
                                    window.location.href = '/';
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-sm text-gray-500">
                    <div>
                        Copyright &copy; 2026 C2SE.52 Team - International School (DTU). All rights reserved.
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-900">Hỗ trợ kỹ thuật</a>
                        <a href="#" className="hover:text-gray-900">Điều khoản</a>
                        <a href="#" className="hover:text-gray-900">Bảo mật</a>
                        <span className="text-gray-400">v1.0.0</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StudentLayout;
