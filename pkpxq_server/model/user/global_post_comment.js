const knex = require('../knex')
const {userRaf} = require('./global_user_info')

/**
 * 通过postId，查找一级评论id
 * */
const postCommentParent = function (postId, parentId = 0) {
    // 获取父评论
    return knex('post_comment as pc')
        .select('commentId')
        .where({'pc.postId': postId, 'pc.isDelete': 0, 'pc.parentId': parentId})
}
/**
 * 评论信息
 * */
const postCommentInfo = function (userId=null) {
    let field = [
        'pc.*',
        // 查 点赞表个数
        knex.raw('(SELECT COUNT(id) FROM post_comment_thumb AS pct WHERE pct.commentId = pc.commentId AND pct.status=1) AS thumbNum'),
        // 查 是否点赞
        knex.raw('IF((SELECT COUNT(id) FROM post_comment_thumb AS pct WHERE pct.commentId = pc.commentId AND pct.userId = ? AND pct.status=1)>0,1,0) AS hasThumb', [userId]),
        knex.raw('(SELECT COUNT(id) FROM follow WHERE follow.userId = ? AND follow.followeeId = user.id AND follow.status = 1) AS isFollow',[userId]),
        // 查 用户信息
        knex.raw(userRaf),
        // 查 回复的用户信息
        knex.raw('IF(replyUser.id IS NULL,NULL,JSON_OBJECT("id", replyUser.id, "username", replyUser.username, "mobile", replyUser.mobile, "sex", replyUser.sex, "age", replyUser.age, "nickname", replyUser.nickname, "avatar", replyUser.avatar,"brief",replyUser.brief,  "createTime", replyUser.createTime, "updateTime", replyUser.updateTime)) as to_user'),
    ]

    // followeeId!==undefined&&field.push(knex.raw('(SELECT COUNT(id) FROM follow WHERE follow.userId = ? AND follow.followeeId = user.id AND follow.status = 1) AS isFollow',[followeeId]))

    return knex
        .select(field)
        .from('post_comment as pc')
        .leftJoin('user', 'pc.userId', '=', 'user.id')
        .leftJoin('user as replyUser', function () {
            this.on('replyUser.id', '=', 'pc.reply_user_id')
        })
        .where({'pc.isDelete': 0,'user.isDelete':0,'user.status':0})
}
module.exports = {
    postCommentParent,
    postCommentInfo
}
