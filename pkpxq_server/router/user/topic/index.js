const express = require('express')

const router = express.Router()
const Topic = require('./handler')

// 查圈子信息
router.get('/:id',Topic.detail)
// 置顶
router.post('/top',Topic.topAdd)

// 删除置顶
router.delete('/top/:topic_id/:postId',Topic.topDelete)

module.exports = router
