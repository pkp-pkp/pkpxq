const knex = require('../knex')
const {userRaf} = require('./global_user_info')
const {isEmpty} = require("../../utils");

/**
 * 基础用户信息
 * @param userId 用户的Id，用户判断是否点赞
 * @param statusArr 数组：[用户状态，帖子状态]
 * @param topic_id 圈子id
 * @returns {*}
 */
function basicPostInfo(userId = null, statusArr = [0, 0], topic_id = 1) {
    return knex.select([
        'p.postId',
        'p.cateId',
        'p.title',
        'p.content',
        'p.cover_img',
        'p.viewNum',
        'p.createTime',
        'p.updateTime',
        'p.tags',     // 添加 p.tags 字段
        'pc.cateName',
        'p.type',
        'p.media',
        'p.topic_id',
        // 查 点赞表个数
        knex.raw('(SELECT COUNT(*) FROM post_thumb AS pt WHERE pt.postId = p.postId AND pt.status=1) AS thumbNum'),
        // 查 收藏的个数
        knex.raw('(SELECT COUNT(*) FROM post_favour AS pf WHERE pf.postId = p.postId AND pf.status=1) AS favourNum'),
        // 查 评论的个数
        knex.raw('(SELECT COUNT(*) FROM post_comment AS pco WHERE pco.postId = p.postId AND pco.isDelete=0) AS commentNum'),
        // 查 是否点赞
        knex.raw('IF((SELECT COUNT(*) FROM post_thumb AS pt WHERE pt.postId = p.postId AND pt.userId = ? AND pt.status=1)>0,1,0) AS hasThumb', [userId]),
        // 查 是否收藏
        knex.raw('IF((SELECT COUNT(*) FROM post_favour AS pf WHERE pf.postId = p.postId AND pf.userId = ? AND pf.status=1)>0,1,0) AS hasFavour', [userId]),
        // 用户信息
        knex.raw(userRaf),
        // 是否关注了 某个人
        knex.raw('(SELECT COUNT(*) FROM follow WHERE follow.userId = ? AND follow.followeeId = user.id AND follow.status = 1) AS isFollow', [userId]),
        // 查 是否被置顶
        knex.raw('IF((SELECT COUNT(id) FROM topic_top WHERE topic_top.postId = p.postId AND topic_top.topic_id = ?)>0,1,0) AS isTop', [topic_id])
    ])
        .from('post as p')
        // 用户
        .leftJoin('user', 'p.userId', '=', 'user.id')
        // 分类
        .leftJoin('post_category as pc', 'p.cateId', '=', 'pc.cateId')
        .where({'p.isDelete': 0, 'user.isDelete': 0})
        .andWhere(function () {
            if (!isEmpty(statusArr[0])) {
                this.where('user.status', statusArr[0])
            }
            if (!isEmpty(statusArr[1])) {
                this.where({'p.status': statusArr[1]})
            }
        })

}

// 给指定 postId文章添加 1的阅读数
const incrementViewPost = async function (postId) {
    const data = await knex('post').select('viewNum').where({postId}).first()
    if (data) {
        await knex('post').update({viewNum: data.viewNum + 1}).where({postId})
        return true
    }
    return false
}

// 处理 post数据中 需要转换的json字符串
const postJsonParse = function (rows) {
    return rows.map(row => {
        row.tags = JSON.parse(row.tags)
        row.media = JSON.parse(row.media)
        return row
    })
}
module.exports = {
    basicPostInfo,
    incrementViewPost,
    postJsonParse
}
