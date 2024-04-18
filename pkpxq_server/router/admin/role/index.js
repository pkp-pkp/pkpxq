const express = require('express')
const router = express.Router()

const Role = require('./handler')

router.get('/list',Role.list)
router.get('/:roleId',Role.Info)
router.post('/',Role.add)
router.put('/',Role.update)
router.delete('/:roleIds',Role.delete)

module.exports = router
