# AI-ADVISOR Project

Hệ thống tư vấn học tập thông minh AI-ADVISOR. Dự án được chia làm 2 phần chính: Frontend sử dụng React (Vite) + TailwindCSS và Backend sử dụng Node.js (Express), cơ sở dữ liệu MySQL.

## Yêu cầu môi trường (Prerequisites)

Để chạy được dự án này trên máy cá nhân (Local), bạn cần cài đặt các phần mềm sau:
1. **Node.js**: Phiên bản 18.x trở lên (Khuyến nghị dùng bản LTS).
2. **MySQL Server**: Phiên bản 8.x trở lên.

---

## Hướng dẫn cài đặt và khởi chạy dự án

### Bước 1: Thiết lập Cơ sở dữ liệu (Database)

1. Mở công cụ quản lý MySQL của bạn (như MySQL Workbench, phpMyAdmin, DBeaver, XAMPP, v.v.).
2. Chạy toàn bộ mã SQL có trong file khởi tạo database:
    `backend/database/init.sql`
3. Script trên sẽ tự động:
   - Xoá DB cũ (nếu có) và tạo mới database tên là `ai_advisor`.
   - Tạo các bảng (tables) cần thiết theo thiết kế schema.
   - Thêm sẵn (insert) dữ liệu mẫu cơ bản, bao gồm các tài khoản đăng nhập để test.

### Bước 2: Thiết lập Backend (Server API)

1. Mở Terminal mới và di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```
2. Cài đặt các thư viện phụ thuộc (Node modules):
   ```bash
   npm install
   ```
3. Cấu hình biến môi trường kết nối Database:
   - Trong thư mục `backend`, kiểm tra xem đã có file `.env` chưa. Nếu chưa có, hãy copy từ file `.env.example` hoặc tự tạo mới.
   - Thay đổi các thông số kết nối MySQL cho khớp với môi trường máy của bạn. Ví dụ:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=123456
     DB_NAME=ai_advisor
     ```
4. Khởi chạy Server:
   ```bash
   npm run dev
   ```
   *Quá trình thành công khi console hiển thị dòng chữ: `Server running on port 5000` và `Connected to MySQL`.*

### Bước 3: Thiết lập Frontend (Giao diện người dùng)

1. Mở một Terminal **mới** (vẫn giữ terminal backend đang chạy) và di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```
2. Cài đặt toàn bộ các thư viện giao diện (bao gồm React, TailwindCSS, React-Router, Axios,... đã được khai báo sẵn trong `package.json`):
   ```bash
   npm install
   ```
3. Khởi chạy Frontend:
   ```bash
   npm run dev
   ```

---

## Cách kiểm tra ứng dụng

Sau khi hoàn tất cả 3 bước (Database đã nạp, Backend chạy port 5000, Frontend chạy port 5173), bạn hãy mở trình duyệt web lên và truy cập:
**http://localhost:5173**

### Danh sách tài khoản thử nghiệm (Test Accounts)

Tất cả tài khoản đều dùng chung **Mật khẩu là: `123456`**

| Tên đăng nhập (Username) | Phân quyền (Role)         | Mục đích test                 |
| :----------------------- | :------------------------ | :---------------------------- |
| `student`                | Sinh viên                 | Trải nghiệm luồng Sinh Viên   |
| `advisor`                | Cố vấn học tập (CVHT)     | Trải nghiệm luồng Cố Vấn      |
| `faculty`                | Khoa / Ban chủ nhiệm Khoa | Trải nghiệm luồng Quản lý Khoa|
