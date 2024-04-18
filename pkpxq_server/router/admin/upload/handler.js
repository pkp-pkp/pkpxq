const knex = require('../../../model/knex')
const {pageSearch, pageSearchTotal, filterField} = require("../../../utils");
class Template {
    async list(req,res){
        const query = knex('sys_upload')
            .select('*')
            .where({'isDelete':0})
        const records = await pageSearch(query,req.query)
        const total = await pageSearchTotal(query)

        res.sc({records,total})
    }
    async delete(req,res){
        const ids = req.params.ids ? req.params.ids.split(',') : []
        if (!ids.length) return res.cc('参数错误')

        try{
            await knex('sys_upload').update({isDelete:1}).whereIn('id',ids)
            res.cc('删除成功',200)
        } catch (error) {
            res.cc('删除失败')
        }
    }
}


module.exports = new Template()
