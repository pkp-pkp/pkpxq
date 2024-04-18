const knex = require('./knex')

async function addUser(userId, topic_id) {
    if (!userId || !topic_id) return

    const results = await knex('topic_user').select().where({userId, topic_id})
    if (results.length > 0) {
        return
    }
    await knex('topic_user').insert({
        userId,
        topic_id
    });
}

// 获取圈子指定的帖子id
async function getTopPostId(topic_id = 1) {
    return await knex('topic_top').where({topic_id}).orderBy('id','desc').then(rows => rows.map(item => item.postId))
}

// 判断当前操作的是否是圈子管理
async function isTopicAdmin(topic_id, id) {
    const result = await knex('topic').where({id: topic_id}).first()
    const result2 = await knex('topic_user').where({topic_id, userId: id})
    return !!((result && result.userId === id) || (result2.length > 0));
}

module.exports = {
    addUser,
    getTopPostId,
    isTopicAdmin
}
