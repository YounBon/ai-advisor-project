import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from './components/layouts/StudentLayout';
import AcademicDashboard from './pages/student/AcademicDashboard';
import Login from './pages/Login'; // <--- Import component Login gốc của bạn

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Mặc định vào gốc -> Chạy màn hình Login */}
                <Route path="/" element={<Login />} />

                {/* 2. Tạo đường link rõ ràng cho logic Đăng xuất trả về */}
                <Route path="/login" element={<Login />} />

                {/* 3. Routes dành riêng cho Sinh viên dùng StudentLayout */}
                <Route path="/student" element={<StudentLayout />}>
                    {/* Khi truy cập /student -> tự chuyển hướng về /student/academic */}
                    <Route index element={<Navigate to="/student/academic" replace />} />
                    
                    {/* Trang Học tập nằm trong Outlet của StudentLayout */}
                    <Route path="academic" element={<AcademicDashboard />} />
                    
                    {/* Các trang giả định đang được xây dựng */}
                    <Route path="riskscore" element={<div className="p-8 text-center text-gray-500">Trang Cảnh báo (Đang xây dựng)</div>} />
                    <Route path="sentiment" element={<div className="p-8 text-center text-gray-500">Trang Cảm xúc (Đang xây dựng)</div>} />
                    <Route path="update" element={<div className="p-8 text-center text-gray-500">Trang Nhập liệu (Đang xây dựng)</div>} />
                    <Route path="feedback" element={<div className="p-8 text-center text-gray-500">Trang Phản hồi (Đang xây dựng)</div>} />
                    <Route path="chatbot" element={<div className="p-8 text-center text-gray-500">Trang Chatbot (Đang xây dựng)</div>} />
                    <Route path="profile" element={<div className="p-8 text-center text-gray-500">Trang Thông tin cá nhân (Đang xây dựng)</div>} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<div className="h-screen flex items-center justify-center text-2xl font-bold text-gray-400">404 - Không tìm thấy trang</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
