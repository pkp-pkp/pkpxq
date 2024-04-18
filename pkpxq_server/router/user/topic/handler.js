const knex = require("../../../model/knex");
const {hasOneEmpty, filterField, pageSearchTotal} = require("../../../utils");
const {isTopicAdmin} = require("../../../model/tool_topic");

class Topic {
    async a1(req, res) {
        const c = await knex('user').select('*')

        res.sc(c)
    }

    async detail(req, res) {
        const id = req.params.id
        if (!id) return res.cc('缺少参数')

        const result = await knex('topic')
            .select('id', 'userId', 'name', 'description', 'notice', 'back_img', 'status', 'createTime')
            .where({isDelete: 0, id}).first()

        if (!result) return res.cc('无此圈子')

        if (result.status === '1') {
            return res.cc('此圈子已被禁用')
        }
        res.sc(result)

    }

    async topAdd(req, res) {
        const {topic_id, postId} = req.body
        const isAdmin = await isTopicAdmin(topic_id, req.auth.id)
        if (!isAdmin) {
            return res.cc('无权操作')
        }

        if (hasOneEmpty({topic_id, postId})) {
            return res.cc('参数错误')
        }

        try {
            const total = pageSearchTotal(knex('topic_top').where({topic_id, postId}))
            if (total > 0) return res.cc('已经是置顶了')
            await knex('topic_top').insert({topic_id, postId})
            res.cc('置顶成功', 200)
        } catch (e) {
            res.cc('置顶失败')
        }
    }

    async topDelete(req, res) {
        const {topic_id, postId} = req.params
        const isAdmin = await isTopicAdmin(topic_id, req.auth.id)
        if (!isAdmin) {
            return res.cc('无权操作')
        }
        try {
            await knex('topic_top').where({topic_id, postId}).del()
            res.cc('取消置顶成功', 200)
        } catch (e) {
            res.cc('取消置顶失败')
        }
    }
}

module.exports = new Topic()
