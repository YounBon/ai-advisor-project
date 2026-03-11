import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
    username: z.string().min(3, "Tên đăng nhập tối thiểu 3 ký tự"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type LoginForm = z.infer<typeof loginSchema>;


export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        setErrorMsg("");
        try {
            // Gọi backend đăng nhập
            const res = await axios.post("/api/auth/login", data);
            // Giả lập role từ response
            // Backend cần trả về { role: "Student" | "Advisor" | "Faculty" }
            const role = res.data.role || "Student"; // Nếu backend chưa trả về role, mặc định Student
            if (role === "Student") {
                navigate("/dashboard/student");
            } else if (role === "Advisor") {
                navigate("/dashboard/advisor");
            } else if (role === "Faculty") {
                navigate("/dashboard/faculty");
            } else {
                setErrorMsg("Role không hợp lệ");
            }
        } catch (err: any) {
            setErrorMsg(err.response?.data?.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">AI-ADVISOR</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
                        <input
                            type="text"
                            {...register("username")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                            autoComplete="username"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    {errorMsg && <div className="text-red-600 text-sm text-center">{errorMsg}</div>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
}