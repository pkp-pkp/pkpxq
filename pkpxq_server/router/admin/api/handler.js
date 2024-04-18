const path = require("path");
const knex = require('../../../model/knex')
const svgCaptcha = require('svg-captcha');
const {uploadLog} = require('../../../model/admin/global')
const {resolveUploadPath} = require("../../../utils");

class Api {
    async upload(req, res) {
        try{
            const path = resolveUploadPath(req.file)
            await uploadLog(req.auth.id, path)
            res.sc({filePath: path})
        }catch (e) {
            res.cc('上传失败')
        }

    }

    async captchaImage(req, res, next) {
        try {
            //验证码配置api
            let options = {
                //线条数
                noise: Math.floor(Math.random() * 5),
                color: true,
                fontSize: 55,
                width: 90,
                height: 38,
            }
            let captcha = svgCaptcha.createMathExpr(options)
            let svgImg = captcha.data
            //存储到session
            req.session.code = captcha.text
            res.sc({svgImg}, '获取验证码成功', 200);
        } catch (err) {
            next(err)
        }
    }
}


module.exports = new Api()
