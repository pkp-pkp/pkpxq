const express = require('express')

const router = express.Router()

const Post = require('./handler')
router.get('/list',Post.list)
router.get('/detail',Post.detail)
router.get('/search',Post.search)
router.post('/add',Post.add)
router.post('/upd',Post.upd)
router.get('/upd/get',Post.updGet)
router.post('/del',Post.del)

router.get('/favour',Post.favour)
router.post('/favour/add',Post.favourAdd)

router.get('/category',Post.category)

router.get('/comment',Post.comment)
router.get('/comment/child',Post.commentChild)
router.post('/comment/add',Post.commentAdd)
router.post('/comment/del',Post.commentDel)

router.get('/thumb',Post.thumb)
router.post('/thumb/add',Post.thumbAdd)

router.post('/comment/thumb',Post.commentThumb)
// 标签
router.get('/tag/list',Post.tagList)


module.exports = router