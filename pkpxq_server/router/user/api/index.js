const express = require('express')
const router = express.Router()
const _upload = require('../../../utils/multer')
const Api = require('./handler')

router.post('/upload',_upload.single('file'),Api.upload)

module.exports = router
