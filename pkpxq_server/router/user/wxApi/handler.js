const axios = require('axios')
const {wxApp} = require('../../../utils/config')
const WXBizDataCrypt = require('../../../utils/WXBizDataCrypt')

class WxApi {
    async getPhoneNumber(req, res) {
        let {iv, encryptedData,code} = req.body
        let {appid, secret} = wxApp

        let result = await axios({
            url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code",
            method: "GET"
        })
        try {
            let pc = new WXBizDataCrypt(appid, result.data.session_key)
            let data = pc.decryptData(encryptedData, iv)
            res.sc(data)
        } catch (err) {
            res.cc(err)
        }
    }
}


module.exports = new WxApi()
