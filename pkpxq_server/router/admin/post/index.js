const express = require('express')
const router = express.Router()

const Post = require('./handler')

// 列表
router.get('/list',Post.list)
// 详情
router.get('/:id',Post.detail)
router.put('/changeStatus',Post.changeStatus)

// 删除
router.delete('/:ids',Post.delete)

module.exports = router
