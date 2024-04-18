const jwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt')

const {tokenExpiredTime} = require('./config')

//秘钥
const {secretKey: signkey} = require('./config')


//生成token
const setToken = function (data) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(data, signkey, {expiresIn: tokenExpiredTime});
        resolve(token);
    })
}
//验证token
const verToken = function (headers) {
    let token = ''
    if (headers instanceof String) {
        token = headers
    }
    if (headers instanceof Object) {
        const {authorization} = headers
        token = authorization
    }
    if(token){
        token = token.split(' ')[1]
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, signkey, (error, decoded) => {
            if (error) {
                resolve({})
            }
            resolve(decoded)
        });
    })
}
const guard = function (path = [], isRevoked) {
    return expressjwt({secret: signkey, algorithms: ['HS256'], isRevoked}).unless({path})
}
module.exports = {
    setToken,
    verToken,
    guard
}
