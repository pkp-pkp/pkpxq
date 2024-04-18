const express = require('express')
const router = express.Router()

const User = require('./handler')
const Post = require("../post/handler");

// 列表
router.get('/list',User.list)
// 详情
router.get('/:id',User.detail)
// 新增
router.post('/',User.add)
// 修改
router.put('/changeStatus',User.changeStatus)
// 修改
router.put('/',User.update)
// 删除
router.delete('/:ids',User.delete)

module.exports = router
