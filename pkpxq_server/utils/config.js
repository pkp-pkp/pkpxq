const config = {
    database : {
        host : "127.0.0.1",
        user : "root",
        password : "abc123",
        database : "pkpxq"
    },
    secretKey : "A.A",
    tokenExpiredTime : 60 * 60 * 24,
    wxApp : {
        appid: 'wx135fdb26ac718d64',
        secret:'d4b61b8f67bd3e3dec530fdb5054d239'
    }
}

module.exports = {
    database : config.database,
    secretKey: config.secretKey,
    tokenExpiredTime: config.tokenExpiredTime,
    wxApp:config.wxApp
}
