const db = require('../config/database'); 
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const getHomepage =  (req, res) => {
    res.send('Hello World! Im tuan')
}
const getABC = (req, res) => {
    res.send('Check route!')
}
const getABCHTML = (req, res) => {
    res.render('sample.ejs');
}

const getStudent = async (req, res) => {
    try {
        const [rows, field] = await db.query("SELECT * FROM students");
        res.render('student.ejs', {listStudent : rows});
    } catch (err) {
        console.error("❌ Lỗi khi lấy dữ liệu:", err.message);
        return res.send("Hệ thống lớp học đang bận, thầy Tuấn vui lòng quay lại sau!"); 
    }
}

const handlePostCreateStudent = async (req, res) => {
    try {
        const name = req.body.studentName; 
        const email = req.body.studentEmail;
        const city = req.body.studentCity;

        if(!name || !email) {
            return res.send("Vui lòng nhập đầy đủ thông tin !");
        }

        await db.query("INSERT INTO students (name, email, city) VALUES (?,?,?)",
            [name,email,city]
        );

        return res.redirect('/student');
    } catch (err) {
        console.error("❌ Lỗi khi lấy dữ liệu:", err.message);
        return res.send("Hệ thống thêm học sinh đang bận, thầy Tuấn vui lòng quay lại sau!")
    }
}
const handleDeleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        await db.query("DELETE FROM students WHERE id = ?", [studentId]);
        return res.redirect('/student');
    } catch (err) {
        console.error("Lỗi bạn ơi, ", err.message);
        return res.send("Hệ thống tạm thời bị lỗi chưa thể thực hiện xóa học sinh được");
    }
}
const getUpdateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const [rows, fields] = await db.query("SELECT * FROM students WHERE id = ?", [studentId]);
        const student = rows[0];

        return res.render('updates.ejs', {studentData : student})
    } catch (err) {
        console.error("Bẩm báo có lỗi hiển thị trang!!!", err.message);
        return res.send("Hệ thống tạm thời bảo trì xin quay lại sau !")
    }
}

const handleUpdateStudent = async (req, res) => {
    try {
        const id = req.body.studentId;
        const name = req.body.studentName;
        const email = req.body.studentEmail;
        const city = req.body.studentCity;

        await db.query("UPDATE students SET name=?,email=?, city=? WHERE id = ?", [name, email, city, id]);

        return res.redirect('/student');
    } catch (err) {
        console.error("Bẩm báo có lỗi cập nhật!!!", err.message);
        return res.send("Hệ thống tạm thời bảo trì xin quay lại sau !")
    }
}

const getLoginPage = async (req, res) => {
   res.render('loginPage.ejs');
}

const getRegisterPage = async (req, res) => {
    res.render('registerPage.ejs');
}
const handleRegister = async (req, res) => {
    try {
        const email = req.body.userEmail;
        const password = req.body.userPassword;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render('register.ejs', { 
                errors: errors.array(),
                oldData: req.body 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query("INSERT INTO users (user_email, password) VALUES (?,?)",
            [email, hashedPassword]
        );
        res.redirect('/login');
    } catch (err) {
        console.error("Bẩm báo có lỗi cập nhật!!!", err.message);
        return res.send("Hệ thống tạm thời bảo trì xin quay lại sau !")
    }
}

const handleLogin = async (req, res) => {
    try {
        const email = req.body.userEmail;
        const password = req.body.userPassword;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('loginPage.ejs', {
                errorMessage: errors.array()[0].msg,
                oldData: req.body // 🌟 ĐÃ SỬA: Gom sạch vào oldData để EJS không bị lú biến
            });
        }

        // 2. TÌM USER TRONG DATABASE
        const [rows] = await db.query("SELECT * FROM users WHERE user_email = ?", [email]);
        if (rows.length === 0) {
            return res.render('loginPage.ejs', {
                errorMessage: "Tài khoản không tồn tại trên hệ thống!",
                oldData: req.body // 🌟 ĐÃ SỬA: Đồng bộ ném vào oldData
            });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.redirect('/student');
        } else {
            return res.render('loginPage.ejs', {
                errorMessage: "Mật khẩu không chính xác!",
                oldData: req.body // 🌟 ĐÃ SỬA: Đồng bộ ném vào oldData
            });
        }
    } catch (err) {
        console.error("❌ Lỗi đăng nhập:", err.message);
        return res.render('loginPage.ejs', { 
            errorMessage: "Hệ thống đăng nhập đang bận!",
            oldData: req.body 
        });
    }
}


module.exports = {
    getHomepage, 
    getABC, 
    getABCHTML, 
    getStudent, 
    handlePostCreateStudent,
    handleDeleteStudent, 
    getUpdateStudent, 
    handleUpdateStudent,
    getLoginPage,
    getRegisterPage, 
    handleRegister, 
    handleLogin
}

