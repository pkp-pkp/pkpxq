const express = require('express')
const router = express.Router()
const Admin = require('./handler')
const _upload = require("../../../utils/multer");

router.post('/login',Admin.login)
router.post('/logout',Admin.logout)
router.get('/getInfo',Admin.getInfo)
router.get('/getRouters',Admin.getRouters)

// 用户管理
router.get('/user/list',Admin.userList)
router.get('/user',Admin.user)
router.post('/user',Admin.userAdd)
router.put('/user',Admin.userUpdate)
router.delete('/user/:ids',Admin.userDelete)
router.get('/user/:id',Admin.userById)
// 重置密码
router.put('/user/resetPwd',Admin.userResetPwd)

// 自身信息
router.get('/profile',Admin.profile)
router.put('/profile',Admin.profileUpdate)
router.put('/profile/updatePwd',Admin.profileUpdatePwd)
router.post('/profile/avatar',_upload.single('avatar'),Admin.profileUpdateAvatar)




module.exports = router
