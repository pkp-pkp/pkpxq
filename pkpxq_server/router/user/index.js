const express = require('express')

const router = express.Router()

const api = require('./api')
const user = require('./user')
const post = require('./post')
const wxApi = require('./wxApi')
const topic = require('./topic')
const app = require('./app')


function authFn(req,res,next){
    if(req.auth ===undefined){
        return next()
    }
    if(req.auth.identity !=='user') return res.cc('身份验证失败',401)
    next()
}
router.use(authFn)

router.use('/', api)
router.use('/user', user)
router.use('/post', post)
router.use('/wx', wxApi)
router.use('/topic', topic)
router.use('/app', app)


/**
 * 404一定要放在最后
 */


module.exports = router
