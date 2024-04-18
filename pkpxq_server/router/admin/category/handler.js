const knex = require('../../../model/knex')
const {pageSearch, pageSearchTotal, filterField, handleTree, deleteNodeById, checkIsStatus} = require("../../../utils");
const field = ['cateName','parentId','orderNum','status']

const base_query = ()=>knex('post_category').where({isDelete:0}).orderBy('orderNum','ASC')

class Category {
    async list(req,res){
        const {cateName,status} = req.query
        const result = await base_query().where(function (){
            cateName && this.where('cateName','like',`%${cateName}%`)
            status && this.where('status',status)
        })
        res.sc(result)
    }
    async detail(req,res){
        const cateId = req.params.cateId
        const query = await knex('post_category').select('*').where({isDelete:0,cateId})
        res.sc(query[0])
    }
    async getExclude(req,res){
        const {cateId} = req.params
        const result = await base_query()
        const filterResult = deleteNodeById(result,+cateId,'cateId')
        res.sc(filterResult)
    }
    async add(req,res){
        const params = filterField(field,req.body)
        try{
            await knex('post_category').insert(params)
            res.cc('添加成功',200)
        }catch (e) {
            res.cc('添加失败')
        }
    }

    async update(req,res){
        const cateId = req.body.cateId
        const params = filterField(field, req.body)
        try{
            const result = await base_query()
            if(params.status==='1'){
                // 判断是否所有子节点全为1 (禁用)
                const isAllStatusOne = checkIsStatus(result,cateId,'cateId')
                if(!isAllStatusOne){
                    return res.cc('无法修改这个节点的状态，请先将子类全部关闭')
                }
            }
            await knex('post_category').update(params).where({cateId})

            res.cc('修改成功',200)
        }catch (e) {
            res.cc('修改失败')
        }
    }

    async delete(req,res){
        const cateId = req.params.cateId
        if (!cateId) return res.cc('参数错误')

        try{
            await knex('post_category').where('cateId',cateId).update({isDelete:1})
            res.cc('删除成功',200)
        } catch (error) {
            res.cc('删除失败')
        }
    }
}


module.exports = new Category()
