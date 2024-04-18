const knex = require('../../../model/knex')
const {pageSearch, pageSearchTotal, filterField} = require("../../../utils");
const field = ['name','tagList','status']
class Tag {
    async list(req,res){
        const {status } = req.query
        const query = knex('tag').select('*').where({isDelete:0})
        const records = await pageSearch(query,req.query,{status})
        const total = await pageSearchTotal(query)

        res.sc({records,total})
    }
    async detail(req,res){
        const id = req.params.id
        const query = await knex('tag')
            .select('*')
            .where({isDelete:0,id})
            .then(rows=>rows.map(item=>{
                item.tagJson = JSON.parse(item.tagList)
                return item
            }))
        res.sc(query[0] || [])
    }

    async add(req,res){
        const id = req.body.id
        const params = filterField(field,req.body)

        try{
            await knex('tag').insert(params)
            res.cc('添加成功',200)
        }catch (e) {
            res.cc('添加失败')
        }
    }

    async update(req,res){
        const id = req.body.id
        const params = filterField(field, req.body)
        try{
            await knex('tag').update(params).where({id})

            res.cc('修改成功',200)
        }catch (e) {
            res.cc('修改失败')
        }
    }

    async delete(req,res){
        const ids = req.params.ids ? req.params.ids.split(',') : []
        if (!ids.length) return res.cc('参数错误')

        try{
            await knex('tag').update({isDelete:1}).whereIn('id',ids)
            res.cc('删除成功',200)
        } catch (error) {
            res.cc('删除失败')
        }
    }
}


module.exports = new Tag()
