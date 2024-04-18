const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 分类文件
        let uploadPath = 'uploads/'
        let fieldname = file.fieldname
        // 做通用处理
        if(fieldname==='file' && req.query.type){
            fieldname = req.query.type
        }


        if (fieldname === 'avatar') {
            uploadPath += 'avatar/'
        } else if (fieldname === 'post') {
            uploadPath += 'post/'
            // 判断文件夹是否存在，不存在则创建
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            if (req.auth && req.auth.id !== undefined) { //为每个用户添加一个文件夹存储图片
                uploadPath += req.auth.id + '/'
            }
        } else if (fieldname === 'video') {
            uploadPath += 'video/'
            // 判断文件夹是否存在，不存在则创建
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            if (req.auth && req.auth.id !== undefined) { //为每个用户添加一个文件夹存储图片
                uploadPath += req.auth.id + '/'
            }
        } else {
            uploadPath += 'other/'
        }
        // 判断文件夹是否存在，不存在则创建
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        // 解决中文乱码
        file.originalname = Buffer.from(file.originalname, 'binary').toString('utf-8')
        // 格式文件名
        const originalArr = file.originalname.split('.')
        const fileName = originalArr[0]
        let ext = originalArr[1] ? originalArr[1] : file.mimetype.split('/')[1] || ''

        let fullFileName = ext ? Date.now() + "-" + fileName + '.' + ext : Date.now() + "-" + fileName
        cb(null, fullFileName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // 限制文件大小
        const fileSizes = {
            'avatar': 1024 * 1024 * 2,
            'file': 1024 * 1024 * 10
        }
        // 验证文件大小
        if (fileSizes[file.originalname] && file.size > fileSizes[file.originalname]) {
            cb(new Error('文件大小超出范围'));
        } else if (file.size > 1024 * 1024 * 1) {
            cb(new Error('文件大小超出范围'));
        } else {
            cb(null, true)
        }
    }
})

module.exports = upload
