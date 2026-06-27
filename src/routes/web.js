const express = require('express');
const { body } = require('express-validator');
const {getHomepage, getABC, getABCHTML, getStudent, handlePostCreateStudent, handleDeleteStudent, getUpdateStudent, handleUpdateStudent, getLoginPage, getRegisterPage, handleRegister, handleLogin} = require('../controllers/homeController');
const router = express.Router();
router.get('/', getHomepage);
router.get('/abc', getABC);
router.get('/abc/html', getABCHTML);
router.get('/student', getStudent);
router.post('/create-student', handlePostCreateStudent);
router.post('/delete/:id', handleDeleteStudent );
router.get('/update-student/:id', getUpdateStudent);
router.post('/update-student/execute', handleUpdateStudent);

router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.post('/register', [
    body('userEmail').isEmail().withMessage('Email không đúng định dạng rồi thầy Tuấn ơi!'),
    body('userPassword').isLength({ min: 6 }).withMessage('Mật khẩu ngắn quá, phải từ 6 ký tự trở lên bạn ơi!')
], handleRegister);
router.post('/login', [ // 🌟 2. Đã thêm đường POST xử lý đăng nhập chuẩn chỉ
    body('userEmail').isEmail().withMessage('Vui lòng nhập đúng định dạng Email để đăng nhập!')
], handleLogin);

module.exports = router;