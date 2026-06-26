const express = require('express');

const {getHomepage, getABC, getABCHTML, getStudent, handlePostCreateStudent, handleDeleteStudent, getUpdateStudent, handleUpdateStudent} = require('../controllers/homeController');
const router = express.Router();
router.get('/', getHomepage);
router.get('/abc', getABC);
router.get('/abc/html', getABCHTML);
router.get('/student', getStudent);
router.post('/create-student', handlePostCreateStudent);
router.post('/delete/:id', handleDeleteStudent );
router.get('/update-student/:id', getUpdateStudent);
router.post('/update-student/execute', handleUpdateStudent);
module.exports = router;