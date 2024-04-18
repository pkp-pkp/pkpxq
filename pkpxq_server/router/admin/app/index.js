const express = require('express')
const router = express.Router()

const App = require('./handler')


router.get('/list',App.getList)
router.put('/',App.update)


module.exports = router
