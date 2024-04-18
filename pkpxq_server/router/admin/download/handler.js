const knex = require('../../../model/knex')
const path = require("path");
const fs = require('fs')
class Download {
    file(req,res){
        try {
            const {filePath} = req.query
            if(!filePath){
                res.cc('缺少参数')
            }
            const fullPath = path.join(__dirname,'../../../',filePath)
            if(fs.existsSync(fullPath)){
                res.download(fullPath)
            }else{
                res.cc('文件不存在')
            }
        }catch (e) {
            res.cc('网络错误')
        }
    }
}


module.exports = new Download()
