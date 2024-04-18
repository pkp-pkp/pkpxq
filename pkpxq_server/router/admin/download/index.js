const express = require('express')
const router = express.Router()

const Download = require('./handler')

// 根据 path 下载资源
router.get('/file',Download.file)

module.exports = router
