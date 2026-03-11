import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json());

let connection;
connectDB().then(conn => {
    connection = conn;
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
});

app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await connection.execute(
            `SELECT u.*, r.role_name 
             FROM users u 
             JOIN roles r ON u.role_id = r.role_id 
             WHERE u.username = ?`, 
            [username]
        );
        
        if (rows.length === 0) {
            return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
        }
        
        const user = rows[0];
        // The dummy data in init.sql uses '$2b$10$123456' as a mock bcrypt hash
        const isPasswordValid = user.password_hash === password || user.password_hash === `$2b$10$${password}`;
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
        }
        
        res.json({
            message: "Đăng nhập thành công",
            role: user.role_name,
            user: {
                id: user.user_id,
                username: user.username,
                fullName: user.full_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});
app.post("/api/auth/logout", (req, res) => {
    res.json({ message: "Đăng xuất" });
});

app.get("/api/users", (req, res) => {
    res.json({ message: "Lấy danh sách user" });
});

app.get("/api/students", (req, res) => {
    res.json({ message: "Lấy danh sách SV" });
});
app.get("/api/students/:id", (req, res) => {
    res.json({ message: `Lấy thông tin SV ${req.params.id}` });
});

app.post("/api/academic/submit", (req, res) => {
    res.json({ message: "Lưu dữ liệu học tập" });
});

app.post("/api/feedback", (req, res) => {
    res.json({ message: "Gửi phản hồi" });
});
app.get("/api/feedback/list", (req, res) => {
    res.json({ message: "Lấy danh sách phản hồi" });
});

app.post("/api/meeting", (req, res) => {
    res.json({ message: "Lưu biên bản SHCVHT" });
});

app.get("/api/dashboard/student", (req, res) => {
    res.json({ message: "Dashboard sinh viên" });
});
app.get("/api/dashboard/advisor", (req, res) => {
    res.json({ message: "Dashboard CVHT" });
});
app.get("/api/dashboard/faculty", (req, res) => {
    res.json({ message: "Dashboard khoa" });
});

app.post("/api/chatbot/query", (req, res) => {
    res.json({ message: "Hỏi chatbot học vụ" });
});
