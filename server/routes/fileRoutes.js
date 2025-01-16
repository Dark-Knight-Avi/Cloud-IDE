const express = require('express');
const { getFileTree, getFileContent } = require('../controllers/fileController');

const router = express.Router();

router.get('/', getFileTree);
router.get('/content', getFileContent);

module.exports = router;
