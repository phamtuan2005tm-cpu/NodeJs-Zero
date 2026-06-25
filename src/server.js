require('dotenv').config();
const express = require('express'); // commonjs 
const app = express() // app express
const webRoutes = require('./routes/web');
app.use('/', webRoutes);
const configViewEngine = require('./config/viewEngine');
configViewEngine(app);

const port = process.env.PORT || 8888; 
const hostname = process.env.HOST_NAME;


const db = require('./config/database'); // Đã sửa lại đường dẫn trỏ đúng vào thư mục src/config/database.js
async function handleGetUsers() {
  try {
    // Dùng async/await hứng kết quả thẳng hàng
    const [rows, fields] = await db.query("SELECT * FROM users");
    
    console.log("📊 DỮ LIỆU TRONG BẢNG USERS CỦA TUẤN:");
    console.log(rows); // Sẽ in ra mảng chứa dữ liệu có tên 'tuấn' bạn vừa nạp bên DBeaver
  } catch (error) {
    console.error("❌ Lỗi khi lấy dữ liệu:", error.message);
  }
}

// Chạy thử hàm luôn khi server khởi động
handleGetUsers();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})