const knex = require('../../../model/knex')
const {pageSearch, pageSearchTotal, filterField} = require("../../../utils");
const field = []
const select_field  = ['id','openid','username','mobile','sex','age','nickname','avatar','brief','terminal','createTime','updateTime','status']
const base_query = ()=> knex('user').select(select_field).where({isDelete:0})
class User {
    async list(req,res){
        const {id,sex,status,username,nickname,mobile,terminal} = req.query
        const query = base_query()
        const records = await pageSearch(query,req.query,{id,sex,status,username,terminal},{nickname,mobile})
        const total = await pageSearchTotal(query)

        res.sc({records,total})
    }
    async detail(req,res){
        const id = req.params.id
        const query = await base_query().where({id})
        res.sc(query[0])
    }

    async add(req,res){
        const id = req.body.id
        const params = filterField(field,req.body)
        params.createBy = req.auth.username

        try{
            await knex('user').insert(params)
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
            await knex('user').update(params).where({id})

            res.cc('修改成功',200)
        }catch (e) {
            res.cc('修改失败')
        }
    }

    async changeStatus(req,res){
        const {userId,status} = req.body
        try{
            await knex('user').update({status}).where({id:userId})
            res.sc('修改成功',200)
        }catch (e) {
            res.cc('修改失败')
        }
    }

    async delete(req,res){
        const ids = req.params.ids ? req.params.ids.split(',') : []
        if (!ids.length) return res.cc('参数错误')

        try{
            await knex('user').update({isDelete:1}).whereIn('id',ids)
            res.cc('删除成功',200)
        } catch (error) {
            res.cc('删除失败')
        }
    }
}


module.exports = new User()
