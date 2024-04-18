const express = require('express')
const router = express.Router()

const Category = require('./handler')

// 列表
router.get('/list',Category.list)
// 详情
router.get('/:cateId',Category.detail)
// 获取排除当前子项的分类内容
router.get('/exclude/:cateId',Category.getExclude)
// 新增
router.post('/',Category.add)
// 修改
router.put('/',Category.update)
// 删除
router.delete('/:cateId',Category.delete)

module.exports = router
