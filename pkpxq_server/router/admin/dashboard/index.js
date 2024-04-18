const express = require('express')
const router = express.Router()

const Dashboard = require('./handler')

// 列表
router.get('/list',Dashboard.list)
router.get('/:key',Dashboard.getData)
module.exports = router
