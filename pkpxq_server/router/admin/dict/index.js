const express = require('express')
const router = express.Router()

const Dict = require('./handler')

// 列表
// router.get('/list',Dict.list)
router.get('/:type',Dict.detail)


module.exports = router
