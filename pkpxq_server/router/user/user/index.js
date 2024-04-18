const express = require('express')

const router = express.Router()
const User = require('./handler')
const _upload = require("../../../utils/multer");


router.post('/wxLogin',User.wxLogin)
// router.post('/getId',User.getId)
router.post('/info',User.info)
router.post('/infoById',User.infoById)
router.post('/update',User.update)
router.post('/getPhone',User.getPhone)
router.post('/follow',User.follow)
router.get('/list/follow',User.listFollow)
router.get('/list/fans',User.listFans)
router.post('/avatar',_upload.single('avatar'),User.updateAvatar)

router.get('/list',User.list)


module.exports = router
