const {basicPostInfo, incrementViewPost, postJsonParse} = require('../../../model/user/global_post_info')
const knex = require("../../../model/knex");
const {verToken} = require("../../../utils/jwt");
const {postCommentParent, postCommentInfo} = require("../../../model/user/global_post_comment");
const {filterNotNull, pageSearchTotal, pageSearch, sortByIn, filterField} = require('../../../utils')
const {getTopPostId} = require("../../../model/tool_topic");

class Post {
    static async getTopList(topic_id) {
    }

    async list(req, res) {

        let {
            page = 1,
            pageSize = 10,
            sortField = "createTime",
            sortOrder = "DESC",
            postId,
            tags,
            andTags,
            cateId,
            userId,
            topic_id = 1
        } = req.query
        let start = (page - 1) * pageSize


        let {id} = await verToken(req.headers)
        const params = filterNotNull({
            'p.postId':postId,
            'p.cateId':cateId,
            'p.userId':userId,
            'p.topic_id':topic_id,
        })
        let query = basicPostInfo(id)
            .orderBy(sortField,sortOrder)
            .where(params)
            .where(function () {
                if (tags && tags.length > 0) {
                    this.where(function () {
                        for (let i = 0; i < tags.length; i++) {
                            this.orWhereRaw(`JSON_CONTAINS(p.tags, '"${tags[i]}"')`);
                        }
                    });
                }
                if (andTags && andTags.length > 0) {
                    this.where(function () {
                        for (let i = 0; i < andTags.length; i++) {
                            this.whereRaw(`JSON_CONTAINS(p.tags, '"${andTags[i]}"')`)
                        }
                    });
                }
            })
        // 查询总数
        query.clone().count('p.postId as total').then(async results => {
            const total = results[0].total
            let data = []
            // 先查置顶 文章
            const topPostIdArr = await getTopPostId(topic_id) // 查指定的postId  5   0,10
            const top_data = await query.clone()
                .whereIn('postId', topPostIdArr)
                .limit(pageSize)
                .offset(start)
            data = data.concat(top_data) // 插入置顶内容
            if (top_data.length < pageSize) {
                // 如果从10开始查，若置顶2个已经是上一页了，所以还是10，反之置顶8，所以从2开始查
                const _limit = pageSize - top_data.length > 0 ? pageSize - top_data.length : 0
                const _offset = start - topPostIdArr.length > 0 ? start - topPostIdArr.length : 0

                const other_data = await query.clone()
                    .whereNotIn('postId', topPostIdArr)
                    .limit(_limit)
                    .offset(_offset)// 最低0
                data = data.concat(other_data)
            }
            let records = postJsonParse(data)

            sortByIn(records, topPostIdArr, 'postId')
            res.sc({
                records,
                total

            })
        })
        //
        // let [row] = await db.query('select * from post limit ?,?',[start,end])
        // row = row.map(item=>{
        //     item.tags = JSON.parse(item.tags)
        //     return item
        // })
        // res.sc(row)
    }

    async search(req, res) {
        const {keyword} = req.query
        if (!keyword) return res.cc('缺少参数！')

        const query = basicPostInfo().where('title', 'like', `%${keyword}%`)
            .orWhere('content', 'like', `%${keyword}%`)

        const total = await pageSearchTotal(query, 'postId')
        const records = postJsonParse(await pageSearch(query, req.query))
        res.sc({
            records,
            total
        })
    }

    async add(req, res) {
        const userId = req.auth.id
        const {
            cateId,
            title,
            content,
            cover_img,
            tags = [],
            type,
            media = []
        } = req.body

        const result = await knex('post').insert({
            userId,
            cateId,
            title,
            content,
            cover_img,
            tags: JSON.stringify(tags),
            type,
            media: JSON.stringify(media)
        })
        result ? res.cc('发布成功！', 200) : res.cc('发布失败！')
    }

    async updGet(req, res) {
        const userId = req.auth.id
        const {postId} = req.query
        // 判断是否为本人文章
        basicPostInfo(userId)
            .where({postId})
            .then(([row]) => {
                if (!row) {
                    return res.cc('暂无数据')
                }
                if (row.userInfo.id !== userId) {
                    return res.cc('无权限查询！')
                }
                row.tags = JSON.parse(row.tags)
                row.media = JSON.parse(row.media)
                res.sc(row)
            })
    }

    async upd(req, res) {
        const id = req.auth.id
        const {
            cateId,
            title,
            content,
            cover_img,
            tags,
            type,
            media,
            postId
        } = req.body
        if (!postId) {
            return res.cc('参数错误！')
        }

        // 判断是否为本人文章
        const {userId, postId: pId} = await knex('post').select('userId', 'postId').where({postId}).first()
        if (postId !== pId) return res.cc('无此文章')
        if (id !== userId) return res.cc('无权限编辑！')


        const field = filterNotNull({
            cateId,
            title,
            content,
            cover_img,
            tags,
            type,
            media
        })
        field.tags = JSON.stringify(field.tags)
        field.media = JSON.stringify(field.media)
        const result = await knex('post').update(field).where({postId})
        result ? res.cc('编辑成功！', 200) : res.cc('编辑失败！')
    }

    // 伪删除帖子
    async del(req, res) {
        const {postId} = req.body
        const userId = req.auth.id

        knex('post')
            .update({isDelete: 1})
            .where({postId, userId})
            .then(data => {
                data ? res.cc('删除成功', 200) : res.cc('删除失败')
            })
    }

    async category(req, res) {
        const {type = 'flat'} = req.query
        const row = await knex('post_category')
            .where({isDelete: 0, status: 0})
            .whereNot('parentId', 0)

        if (type === 'tree') {
            const cate_first = row.filter(item => item.cateId === 0)
            const parseToTree = function (list) {
                return list.map(parent => {
                    const children = row.filter(child => child.parentId === parent.cateId)
                    if (children.length) {
                        return {...parent, children: parseToTree(children)}
                    } else {
                        return {...parent}
                    }
                })
            }
            const tree_cate = parseToTree(cate_first)
            return res.sc(tree_cate[0].children)
        }


        if (type === 'flat') return res.sc(row.filter(item => item.cateId !== 0))
    }

    async comment(req, res) {
        const {id} = await verToken(req.headers)
        const {postId, type = 'flat', page = 1, pageSize = 10, sortField = 'thumbNum', sortOrder = 'DESC'} = req.query


        if (!postId) return res.cc('参数错误')
        const offset = (page - 1) * pageSize


        // 查询 --  基于父评论
        const firstComment = await postCommentInfo(id)
            .where({'pc.postId': postId, 'pc.isDelete': 0, 'pc.parentId': 0})
            .orderBy(sortField, sortOrder) // 根据其
            .orderBy('createTime', 'DESC') // 再根据时间
            .offset(offset)
            .limit(pageSize)
        // 获取父评论id 查 子评论
        const firstCommentArr = firstComment.map(item => item.commentId)


        const firstCommentTotal = (await postCommentParent(postId).count('pc.commentId as total').first()).total

        const stream = postCommentInfo(id)
            .where({'pc.isDelete': 0, 'pc.postId': postId})
            .whereIn('pc.parentId', firstCommentArr)  // 在子评论中接着查询
            .orderBy(sortField, sortOrder) // 根据其
            .orderBy('createTime', 'DESC') // 再根据时间
            .stream()
        let result = new Map()
        let countMap = new Map()

        // 遍历流 取每3条子评论
        for await (const row of stream) {
            // 对于每一行，我们计算ID的出现次数
            let count = countMap.get(row.parentId) || 0;
            countMap.set(row.parentId, count + 1);
            // 取每3条子评论
            if (count <= 3) {
                let d = result.get(row.parentId) || []
                d.push(row)
                result.set(row.parentId, d)
            }
        }
        firstComment.map(item => {
            // 存储 子评论
            item.children = result.get(item.commentId) || []
            // 存储 子评论实际总数
            item.childrenTotal = countMap.get(item.commentId) || 0
            return item
        })

        res.sc({
            records: firstComment,
            total: firstCommentTotal
        })
    }

    async commentChild(req, res) {
        const {id} = await verToken(req.headers)
        const {postId, parentId, page = 1, pageSize = 10, sortField = 'thumbNum', sortOrder = 'DESC'} = req.query

        if (!parentId) return res.cc('参数错误')
        const offset = (page - 1) * pageSize
        // 查询 --  基于父评论
        const comment = await postCommentInfo(id)
            .where({'pc.postId': postId, 'pc.isDelete': 0, 'pc.parentId': 0})
            .orderBy(sortField, sortOrder) // 根据其
            .orderBy('createTime', 'DESC') // 再根据时间
            .offset(offset)
            .limit(pageSize)

        const commentCount = (await postCommentParent(postId, parentId).count('pc.commentId as total').first()).total

        res.sc({
            records: comment,
            total: commentCount
        })
    }

    // 工具函数，查点赞表和收藏表中 根据用户id查询帖子
    static async tool_post_thumb_or_favour(req, res, table_name) {
        const {userId} = req.query
        const {page = 1, pageSize = 10} = req.query
        const offset = (page - 1) * pageSize

        if (userId === undefined) {
            return res.cc('参数错误')
        }

        const query = knex(table_name)
            .where({userId, status: 1})

        const total = (await query.clone().count('postId as total').first()).total

        const postIdArr = await query
            .select('postId')
            .orderBy('createTime', 'DESC')
            .offset(offset)
            .limit(pageSize)
            .then(data => data.map(item => item.postId))

        let records = await basicPostInfo(userId, [])
            .whereIn('postId', postIdArr)
            .then(row => postJsonParse(row))

        res.sc({records, total})
    }


    // 点赞

    async thumb(req, res) {
        await Post.tool_post_thumb_or_favour(req, res, 'post_thumb')
    }

    async thumbAdd(req, res) {
        const userId = req.auth.id
        const {postId} = req.body
        const data = await knex('post_thumb').select('status').where({userId, postId}).first()
        if (data === undefined) {
            // 插入
            const affectRow = await knex('post_thumb')
                .insert({userId, postId})

            res.sc(affectRow ? 1 : 0)
        } else {
            // 修改
            const updateStatus = data.status === 0 ? 1 : 0
            const affectRow = await knex('post_thumb')
                .update({status: updateStatus})
                .where({userId, postId})

            res.sc(affectRow ? updateStatus : 0)
        }
    }


    // 评论点赞
    async commentThumb(req, res) {
        const userId = req.auth.id
        const {commentId} = req.body
        const data = await knex('post_comment_thumb').select('status').where({userId, commentId}).first()
        if (data === undefined) {
            // 插入
            const affectRow = await knex('post_comment_thumb')
                .insert({userId, commentId})

            res.sc(affectRow ? 1 : 0)
        } else {
            // 修改
            const updateStatus = data.status === 0 ? 1 : 0
            const affectRow = await knex('post_comment_thumb')
                .update({status: updateStatus})
                .where({userId, commentId})

            res.sc(affectRow ? updateStatus : 0)
        }
    }

    // 帖子详情
    async detail(req, res) {
        const {postId} = req.query
        let {id} = await verToken(req.headers)
        const isOk = await incrementViewPost(postId)
        if (!isOk) {
            console.log('Error：帖子详情添加阅读量失败')
        }
        basicPostInfo(id)
            .where({postId})
            .then(([row]) => {
                if (!row) {
                    return res.cc('帖子消失啦！')
                }
                row.tags = JSON.parse(row.tags)
                row.media = JSON.parse(row.media)
                res.sc(row)
            })
    }


    // 收藏的帖子
    async favour(req, res) {
        await Post.tool_post_thumb_or_favour(req, res, 'post_favour')
    }

    // 收藏帖子
    async favourAdd(req, res) {
        const userId = req.auth.id
        const {postId} = req.body
        // 查询当前状态
        const data = await knex('post_favour').select('status').where({userId, postId}).first()
        if (data === undefined) {
            // 插入
            const affectRow = await knex('post_favour')
                .insert({userId, postId})

            res.sc(affectRow ? 1 : 0)
        } else {
            // 修改
            const updateStatus = data.status === 0 ? 1 : 0
            const affectRow = await knex('post_favour')
                .update({status: updateStatus})
                .where({userId, postId})

            res.sc(affectRow ? updateStatus : 0)
        }
    }

    // 评论添加
    async commentAdd(req, res) {
        const userId = req.auth.id
        const {postId, content, parentId, reply_user_id, reply_comment_id} = req.body

        const results = await knex('post_comment')
            .insert({userId, postId, content, parentId, reply_user_id, reply_comment_id})

        results ? res.cc('评论成功', 200) : res.cc('评论失败')
    }

    // 伪：评论删除
    async commentDel(req, res) {
        const userId = req.auth.id
        const {commentId} = req.body
        knex('post_comment')
            .update({isDelete: 1})
            .where({commentId, userId})
            .then(data => {
                data ? res.cc('删除成功', 200) : res.cc('删除失败', 201)
            })
    }

    // 标签
    async tagList(req, res) {
        const results = await knex('tag').where({isDelete: 0})
        let records = {}
        let arr = []
        results.map(item => {
            const tags = JSON.parse(item.tagList)
            records[item.name] = tags
            arr = arr.concat(tags)
        })

        res.sc({tags: records, all: arr})
    }
}


module.exports = new Post()
