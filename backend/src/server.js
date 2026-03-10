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

app.post("/api/auth/login", (req, res) => {
    res.json({ message: "Đăng nhập hệ thống" });
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
