const express = require('express')

const router = express.Router()

const api = require('./api')
const admin = require('./admin')
const menu = require('./menu')
const role = require('./role')
const cache = require('./cache')
const upload = require('./upload')
const post = require('./post')
const category = require('./category')
const user = require('./user')
const download = require('./download')
const dashboard = require('./dashboard')
const tag = require('./tag')
const dict = require('./dict')
const app = require('./app')

function authFn(req,res,next){
    if(req.auth ===undefined){
        return next()
    }
    if(req.auth.identity !=='admin') return res.cc('身份验证失败',401)
    next()
}
router.use(authFn)

router.use('/',api)
router.use('/admin',admin)
router.use('/menu',menu)
router.use('/role',role)
router.use('/cache',cache)
router.use('/upload',upload)
router.use('/post',post)
router.use('/category',category)
router.use('/user',user)
router.use('/download',download)
router.use('/dashboard',dashboard)
router.use('/tag',tag)
router.use('/dict',dict)
router.use('/app',app)


module.exports = router
