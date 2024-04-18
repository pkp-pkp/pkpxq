const express = require('express')
const router = express.Router()

const Tag = require('./handler')

// 列表
router.get('/list',Tag.list)
// 详情
router.get('/:id',Tag.detail)
// 新增
router.post('/',Tag.add)
// 修改
router.put('/',Tag.update)
// 删除
router.delete('/:ids',Tag.delete)

module.exports = router
