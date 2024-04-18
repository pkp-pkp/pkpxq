const knex = require('../../../model/knex')
const {pageSearch, pageSearchTotal, filterField} = require("../../../utils");
const field = []
class Template {
    async list(req,res){
        const query = knex(表名).select('*').where({isDelete:0})
        const records = await pageSearch(query,req.query)
        const total = await pageSearchTotal(query)

        res.sc({records,total})
    }
    async detail(req,res){
        const id = req.params.id
        const query = await knex(表名).select('*').where({isDelete:0,id})
        res.sc(query[0])
    }

    async add(req,res){
        const id = req.body.id
        const params = filterField(field,req.body)
        params.createBy = req.auth.username

        try{
            await knex(表名).insert(params)
            res.cc('添加成功',200)
        }catch (e) {
            res.cc('添加失败')
        }
    }

    async update(req,res){
        const id = req.body.id
        const params = filterField(field, req.body)
        params.updateBy = req.auth.username
        try{
            await knex(表名).update(params).where({id})

            res.cc('修改成功',200)
        }catch (e) {
            res.cc('修改失败')
        }
    }

    async delete(req,res){
        const ids = req.params.ids ? req.params.ids.split(',') : []
        if (!ids.length) return res.cc('参数错误')

        try{
            await knex(表名).update({isDelete:1}).whereIn('id',ids)
            res.cc('删除成功',200)
        } catch (error) {
            res.cc('删除失败')
        }
    }
}


module.exports = new Template()
