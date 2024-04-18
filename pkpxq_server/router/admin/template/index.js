const express = require('express')
const router = express.Router()

const Template = require('./handler')

// 列表
router.get('/list',Template.list)
// 详情
router.get('/:id',Template.detail)
// 新增
router.post('/',Template.add)
// 修改
router.put('/',Template.update)
// 删除
router.delete('/:ids',Template.delete)

module.exports = router
