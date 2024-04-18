const express = require('express')
const router = express.Router()
const WxApi = require('./handler')
const {wxApp} = require("../../../utils/config");

router.post('/getPhoneNumber',WxApi.getPhoneNumber)

module.exports = router
