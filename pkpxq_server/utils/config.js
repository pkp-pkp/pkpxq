const config = {
    database : {
        host : "127.0.0.1",
        user : "输入你的数据库用户名",
        password : "输入你的数据库密码",
        database : "输入你的数据库名"
    },
    secretKey : "A.A",
    tokenExpiredTime : 60 * 60 * 24,
    wxApp : {
        appid: '小程序appid',
        secret:'小程序密钥'
    }
}

module.exports = {
    database : config.database,
    secretKey: config.secretKey,
    tokenExpiredTime: config.tokenExpiredTime,
    wxApp:config.wxApp
}
