const knex = require('../knex')
const {isEmpty} = require("../../utils");

/**
 * 基础用户信息
 * @returns {*}
 */
function basicUserInfo(followeeId=null,statusArr=[0]) {
    const field = [
        'user.id',
        knex.raw("CONCAT(LEFT(user.mobile, 3), '****', RIGHT(user.mobile, 4)) AS mobile"),
        'user.sex',
        'user.age',
        'user.nickname',
        'user.avatar',
        "user.brief",
        'user.createTime',
        'user.updateTime',
        'user.status',
        // 关注人数
        knex.raw('(SELECT COUNT(id) FROM follow WHERE follow.userId = user.id AND follow.status = 1) AS followeeNum'),
        // 粉丝人数
        knex.raw('(SELECT COUNT(id) FROM follow WHERE follow.followeeId = user.id AND follow.status = 1) AS followerNum'),
        // 帖子数量
        knex.raw('(SELECT COUNT(postId) FROM post WHERE post.userId = user.id AND post.isDelete = 0) AS postNum'),
        // 收藏的帖子数量
        knex.raw('(SELECT COUNT(id) FROM post_favour AS pf WHERE pf.userId = user.id AND pf.status=1) AS favourNum'),

    ]
    !isEmpty(followeeId) && field.push(knex.raw('(SELECT COUNT(id) FROM follow WHERE follow.userId = ? AND follow.followeeId = user.id AND follow.status = 1) AS isFollow', [followeeId]),)
    !isEmpty(followeeId) && field.push(knex.raw('(SELECT COUNT(id) FROM follow WHERE follow.followeeId = ? AND follow.userId = user.id AND follow.status = 1) AS isFans', [followeeId]),)
    return knex('user')
        .select(field)
        .where({isDelete:0})
        .andWhere(function (){
            if(!isEmpty(statusArr[0])){
                this.where('user.status',statusArr[0])
            }
        })
}

const userRaf = 'JSON_OBJECT("id", user.id, "username", user.username, "mobile", user.mobile, "sex", user.sex, "age", user.age, "nickname", user.nickname, "avatar", user.avatar,"brief",user.brief, "createTime", user.createTime, "updateTime", user.updateTime) as userInfo'
module.exports = {
    basicUserInfo,
    userRaf
}
