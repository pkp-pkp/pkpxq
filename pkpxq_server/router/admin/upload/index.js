const express = require('express')
const router = express.Router()

const Upload = require('./handler')

// 列表
router.get('/list',Upload.list)
// 删除
router.delete('/:ids',Upload.delete)

module.exports = router
