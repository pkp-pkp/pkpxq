const express = require('express')
const router = express.Router()
const Menu = require('./handler')

router.get('/list',Menu.list)
router.get('/treeselect',Menu.treeSelect)
router.get('/roleMenuTreeselect/:roleId',Menu.roleMenuTreeselect)

// 新增菜单
router.post('/',Menu.add)
// 编辑菜单
router.put('/',Menu.update)
// 删除菜单
router.delete('/:menuId',Menu.delete)

module.exports = router
