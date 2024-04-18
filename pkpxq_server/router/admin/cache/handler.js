const knex = require('../../../model/knex')
const {deleteFiles} = require("../../../utils");

const cache = [
    {cacheName: 'sys_upload', remark: '文件上传', cacheKey: 'id'},
    {cacheName: 'sys_role', remark: '系统角色', cacheKey: 'roleId'},
    {cacheName: 'post', remark: '帖子列表', cacheKey: 'postId'},
    {cacheName: 'post_category', remark: '帖子分类', cacheKey: 'cateId'},
    {cacheName: 'post_comment', remark: '帖子评论', cacheKey: 'commentId'},
    {cacheName: 'tag', remark: '帖子标签', cacheKey: 'id'},
    {cacheName: 'user', remark: '用户', cacheKey: 'id'},
    {cacheName: 'sys_user', remark: '管理员用户', cacheKey: 'id'}
]

class Cache {
    async getNames(req, res) {
        // 定义表中缓存数据（包含isDelete字段的表）
        res.sc(cache)
    }

    async getKeys(req, res) {
        const cacheName = req.params.cacheName
        const index = cache.findIndex(item => item.cacheName === cacheName)
        if (index === -1) return res.cc('不存在此缓存key')
        const cacheKey = cache[index].cacheKey


        const result = await knex(cacheName)
            .where({isDelete: 1})
            .select(cacheKey)
            .then(rows=>rows.map(item=>item[cacheKey]))
        res.sc(result)
    }

    async getValue(req,res){
        const {cacheName,key} = req.params //
        const index = cache.findIndex(item => item.cacheName === cacheName)
        if (index === -1) return res.cc('不存在此缓存key')
        const cacheKey = cache[index].cacheKey

        const result = await knex(cacheName).where({isDelete:1,[cacheKey]:key}).first()
        res.sc({
            cacheName,
            cacheKey,
            cacheValue:result,
            remark:cache[index].remark
        })
    }
    async clearCacheName(req,res){
        const {cacheName} = req.params
        const index = cache.findIndex(item => item.cacheName === cacheName)
        if (index === -1) return res.cc('不存在此缓存key')

        try{
            if(cacheName ==='sys_upload'){
                // 进行文件删除
                const paths = await knex('sys_upload')
                    .select('path')
                    .where({isDelete:1})
                    .then(rows=>rows.map(row=>row.path))
                const delCount = deleteFiles(paths)

                if(delCount!==paths.length) throw new Error('删除的文件不匹配')
            }

            await knex(cacheName).where({isDelete:1}).del()
            res.sc('清除成功',200)
        }catch (e) {
            res.cc('清除失败')
        }


    }
    async clearCacheKey(req,res){
        const {key,cacheName} = req.params
        const index = cache.findIndex(item => item.cacheName === cacheName)
        if (index === -1) return res.cc('不存在此缓存key')
        const cacheKey = cache[index].cacheKey

        try{
            if(cacheName ==='sys_upload'){
                // 进行文件删除
                const paths = await knex('sys_upload')
                    .select('path')
                    .where({isDelete:1,[cacheKey]:key})
                    .then(rows=>rows.map(row=>row.path))
                const delCount = deleteFiles(paths)

                if(delCount!==paths.length) throw new Error('删除的文件不匹配')
            }

            await knex(cacheName).where({isDelete:1,[cacheKey]:key}).del()
            res.sc('清除成功',200)
        }catch (e){
            res.cc('清除失败')
        }
    }
}


module.exports = new Cache()
