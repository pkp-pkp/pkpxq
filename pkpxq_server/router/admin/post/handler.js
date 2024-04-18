const knex = require('../../../model/knex')
const {pageSearch, pageSearchTotal, filterField} = require("../../../utils");
const field = []
class Post {
    async list(req,res){
        const {userId,type,cateId,title} = req.query

        const query = knex('post').select('*').where({isDelete:0})
        const records = await pageSearch(query,req.query,{userId,cateId,type},{title})
        const total = await pageSearchTotal(query)

        res.sc({records,total})
    }
    async detail(req,res){
        const postId = req.params.id
        const query = await knex('post').select('*').where({isDelete:0,postId})
        res.sc(query[0])
    }


    async changeStatus(req,res){
        const {postId,status} = req.body
        try{
            await knex('post').update({status}).where({postId})
            res.sc('修改成功',200)
        }catch (e) {
            res.cc('修改失败')
        }
    }

    async delete(req,res){
        const ids = req.params.ids ? req.params.ids.split(',') : []
        if (!ids.length) return res.cc('参数错误')
        try{
            await knex('post').update({isDelete:1}).whereIn('postId',ids)
            res.cc('删除成功',200)
        } catch (error) {
            res.cc('删除失败')
        }
    }
}


module.exports = new Post()
