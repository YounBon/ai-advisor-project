import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { BookOpen, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const AcademicDashboard = () => {
    // Mock Data for Line Chart (GPA)
    const gpaData = [
        { semester: 'Kỳ 1', gpa: 2.8, current: 2.8 },
        { semester: 'Kỳ 2', gpa: 2.9, current: 3.0 },
        { semester: 'Kỳ 3', gpa: 2.7, current: 2.4 },
        { semester: 'Kỳ 4', gpa: 2.5, current: 2.1 },
        { semester: 'Kỳ 5', gpa: 2.9, current: 3.4 },
        { semester: 'Kỳ 6', gpa: 3.2, current: 3.8 },
    ];

    // Mock Data for Pie Chart (Credits)
    const creditsData = [
        { name: 'Đạt', value: 80, color: '#10B981' }, // emerald-500
        { name: 'Hỏng', value: 4, color: '#EF4444' }, // red-500
        { name: 'Đang học', value: 12, color: '#F59E0B' }, // amber-500
    ];

    const totalCreditsProg = 120;
    const currentTotal = creditsData.reduce((acc, curr) => acc + curr.value, 0);
    const completedCredits = creditsData.find((x) => x.name === 'Đạt')?.value ?? 0;
    const programProgressPct = totalCreditsProg > 0 ? (completedCredits / totalCreditsProg) * 100 : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Tiến độ Học tập</h1>
                <span className="text-sm font-medium text-gray-500 border bg-white px-3 py-1 rounded-full shadow-sm">
                    Kỳ hiện tại: Học kỳ 6 (Năm 3)
                </span>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-blue-50 rounded-full mb-3">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">3.20</div>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        GPA Tích Lũy
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-emerald-500"></div>
                    <div className="p-3 bg-emerald-50 rounded-full mb-3">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        {completedCredits} <span className="text-lg text-gray-400">/ {totalCreditsProg}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Tín chỉ đã đạt
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-red-500"></div>
                    <div className="p-3 bg-red-50 rounded-full mb-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Tín chỉ hỏng (Nợ)
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-amber-500"></div>
                    <div className="p-3 bg-amber-50 rounded-full mb-3">
                        <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Tín chỉ đang học
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* GPA Line Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Tiến trình học toàn khóa</h2>
                        <p className="text-sm text-gray-500">Biến thiên điểm trung bình chung tích lũy (Hệ 4.0)</p>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={gpaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis 
                                    dataKey="semester" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#6B7280', fontSize: 12 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    domain={[0, 4]} 
                                    ticks={[0, 1, 2, 3, 4]} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                {/* Baseline 2.0 Cảnh báo */}
                                <ReferenceLine y={2.0} stroke="#EF4444" strokeDasharray="4 4" label={{ position: 'top', value: 'Ngưỡng Cảnh Báo (2.0)', fill: '#EF4444', fontSize: 12 }} />
                                
                                <Line 
                                    type="monotone" 
                                    name="GPA Tích Lũy" 
                                    dataKey="gpa" 
                                    stroke="#4F46E5" 
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                                <Line 
                                    type="monotone" 
                                    name="GPA Học Kỳ" 
                                    dataKey="current" 
                                    stroke="#93C5FD" 
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                    dot={{ r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Credits Donut Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Tỷ lệ hoàn thành</h2>
                        <p className="text-sm text-gray-500">Trên tổng {currentTotal} tín chỉ đã đăng ký</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={creditsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {creditsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => [`${value} tín chỉ`, 'Số lượng']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Tiến độ chương trình tổng thể */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500 font-medium">Tiến độ ra trường</span>
                            <span className="text-emerald-600 font-bold">{Math.round(programProgressPct)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${programProgressPct}%` }}></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AcademicDashboard;
