const express = require('express')
const router = express.Router()

const App = require('./handler')


router.get('/home',App.home)


module.exports = router
