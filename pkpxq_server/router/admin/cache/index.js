const express = require('express')
const router = express.Router()

const Cache = require('./handler')

router.get('/getNames',Cache.getNames)
router.get('/getKeys/:cacheName',Cache.getKeys)
router.get('/getValue/:cacheName/:key',Cache.getValue)
router.delete('/clearCacheName/:cacheName',Cache.clearCacheName)
router.delete('/clearCacheKey/:cacheName/:key',Cache.clearCacheKey)

module.exports = router
