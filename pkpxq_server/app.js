const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const session = require('./utils/session')
const history = require('connect-history-api-fallback')

//dotenv配置变量
const dotenv = require('dotenv')
dotenv.config({path: `.env.${process.env.NODE_ENV}`})

//中间件工具函数
const middleware = require('./utils/miiddleware')
const util_jwt = require('./utils/jwt')

const app = express()
const PORT = process.env.NODE_PORT || 8088

app.use((req, res, next) => {
    const protocol = req.protocol //获取协议名，如 http/https
    const hostname = req.hostname //获取主机名，如127.0.0.1
    const port = req.socket.localPort //获取端口号，如3000
    let uploadPath = `${protocol}://${hostname}`
    port !== 80 ? uploadPath += `:${port}` : '' //省略80端口
    req.serverPath = uploadPath
    next()
})

app.use(middleware.utils)
// 接受请求格式
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// 配置模板跨域
app.use(cors())
app.use(session())

// 配置模板静态文件
app.use('/', history({
    rewrites: [
        {
            from: /^\/api\/.*$/,
            to: function (context) {
                return context.parsedUrl.path
            }
        }
    ]
}))  // 前端解决history路由模式定向问题，过滤api路径，防止小程序请求出错
app.use(express.static(__dirname + "/public")) //设置静态文件目录
app.use('/uploads', express.static(__dirname + "/uploads")) //开放帖子

// app.use('/uploads/avatar',express.static(__dirname + "/uploads/avatar")) //开放头像
// app.use('/uploads/post',express.static(__dirname + "/uploads/post")) //开放帖子
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')
// 配置模板访问返回提示
app.use(morgan("dev"))

//校验
let white_path = [
    '/api/user/wxLogin', // 登录
    '/api/post/list',    // 帖子内容
    '/api/post/detail', // 帖子详情
    '/api/post/search', // 帖子搜索
    '/api/wx/getPhoneNumber', // 微信获取手机号
    '/api/post/comment', // 评论内容
    '/api/post/category',// 分类
    '/api/topic/1',      // 官方圈子
    '/api/app/home',     // 首页配置
    '/adminApi/captchaImage', // 验证码
    '/adminApi/admin/login',  // 登录
]
app.use(util_jwt.guard(white_path))
const User = require('./router/user')
const Admin = require('./router/admin')
// 路由的一级路径
// app.use('/', router)
app.use('/api', User)
app.use('/adminApi', Admin)


// 404页面一定要放在最后
app.use('*', function (req, res) {
    res.send({
        code: 400,
        msg: "404 , not found",
        data: ''
    })
})

app.use(middleware.error_401)
app.use(middleware.error_handle)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
