const express = require('express');

const {getHomepage, getABC, getABCHTML} = require('../controllers/homeController');
const router = express.Router();
router.get('/', getHomepage);
router.get('/abc', getABC);
router.get('/abc/html', getABCHTML);

module.exports = router;