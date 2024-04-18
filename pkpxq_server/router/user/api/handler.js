const path = require("path");
const knex = require('../../../model/knex')
const {resolveUploadPath} = require("../../../utils");

class Api {
    async upload(req, res) {
        let uploadPath = req.serverPath
        const simple = resolveUploadPath(req.file)
        uploadPath += simple

        let {id} = req.auth
        await knex('sys_upload').insert({userId: id, path: simple})
        res.sc({path: uploadPath, filePath: simple})
    }

}


module.exports = new Api()
