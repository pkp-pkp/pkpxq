const session = require('express-session')
const {secretKey,tokenExpiredTime} = require('./config')
const options = {
    secret: secretKey,   // secret  属性的值可以为任意字符串
    resave: false,            // 固定写法
    saveUninitialized: true, // 固定写法
    cookie: { maxAge: tokenExpiredTime },
    rolling: true,
    name:'uuid'
}

module.exports = ()=>session(options)
