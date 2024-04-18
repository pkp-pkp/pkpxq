const {setToken, verToken} = require('../../../utils/jwt')
const request = require('request')
const {wxApp} = require("../../../utils/config");
const knex = require("../../../model/knex");
const {basicUserInfo} = require('../../../model/user/global_user_info')
const {pageSearch, pageSearchTotal, resolveUploadPath} = require("../../../utils");
const {addUser} = require('../../../model/tool_topic')
const {uploadLog} = require("../../../model/user/global");

class User {
    static async fastReg(openid) {
        if(!openid) return false

        const [row] = await knex('user').select('id').where({openid})
        if (row) return row.id
        const [insert_id] = await knex('user').insert({openid})
        await addUser(insert_id,1) //圈子添加用户
        return insert_id
    }

    async wxLogin(req, res) {
        const {code} = req.body
        if (!code) return res.cc('登录失败，没有code')
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxApp.appid}&secret=${wxApp.secret}&js_code=${code}&grant_type=authorization_code`
        request(
            url,
            async function (err, response, data) {
                // 获取微信返回的 openid,session_key的值
                const {openid, session_key} = JSON.parse(data)
                if (!openid) return res.cc('登录失败,code错误')
                const user_id = await User.fastReg(openid)

                let token = await setToken({id: user_id, code,identity:'user'})
                const [userInfo] = await basicUserInfo(null,[]).where({openid})
                if(!userInfo || userInfo.status==='1'){
                    return res.cc('你已被封禁，请联系管理员',403)
                }
                // 未注册给临时token
                if(!userInfo.avatar || !userInfo.nickname){
                    res.sc({tempToken: 'Bearer ' + token}, '未注册，获取临时token',401)
                    return
                }

                res.sc({token: 'Bearer ' + token, userInfo}, '登录成功！')
            }
        )
    }


    async info(req, res) {
        const {id} = req.auth
        const [data] = await basicUserInfo().where({id})

        if(!data || data.status==='1'){
            return res.cc('你已被封禁，请联系管理员',401)
        }
        res.sc(data)
    }

    async infoById(req, res) {

        let {id} = await verToken(req.headers) // 当前用户id，查是否关注了下面查询的用户
        const {id: userId} = req.body
        const [data] = await basicUserInfo(id,[]).where({id: userId})
        if(!data) {
            return res.cc('查不到这个用户')
        }
        if(data.status==='1'){
            return res.cc('该用户被封禁',403)
        }
        res.sc(data)
    }


    async update(req, res) {
        const {id} = req.auth
        const {nickname, avatar, mobile, age, sex,brief} = req.body
        const effectRow = await knex('user').update({nickname, avatar, mobile, age, sex,brief}).where({'user.id': id})
        const [userInfo] = await basicUserInfo().where({id})
        res.sc(userInfo, effectRow ? '修改成功' : '修改失败')
    }

    async updateAvatar(req,res){
        try {
            const path = resolveUploadPath(req.file)
            await uploadLog(req.auth.id, path)
            await knex('user').update({'avatar': path}).where({id: req.auth.id})
            res.sc({filePath:path},'修改成功', 200)
        } catch (error) {
            res.cc('修改失败')
        }
    }
    async upload(req, res) {
        let uploadPath = req.serverPath
        const simple = resolveUploadPath(req.file)
        uploadPath += simple


        await uploadLog(req.auth.id, simple)
        res.sc({path: uploadPath, filePath: simple})
    }
    async getPhone(req, res) {
        const {id} = req.auth
        const [data] = await basicUserInfo().where({id})
        res.sc(data)
    }

    /**
     * @api {post} /user/follow 关注
     * @apiBody { Number } followeeId 关注的人Id
     *
     * @apiAuth { Number } id 用户ID
     * @apiUse Authorization
     */
    async follow(req, res) {
        // 获取收藏者ID，和被收藏的帖子ID
        const userId = req.auth.id
        const {followeeId} = req.body
        // 不能关注自己
        if (userId === +followeeId) return res.cc('不能关注自己')

        // 查询当前状态
        const data = await knex('follow').select('status').where({userId, followeeId}).first()
        if (data === undefined) {
            // 插入
            const affectRow = await knex('follow')
                .insert({userId, followeeId})

            res.sc(affectRow ? 1 : 0)
        } else {
            // 修改
            const updateStatus = data.status === 0 ? 1 : 0
            const affectRow = await knex('follow')
                .update({status: updateStatus})
                .where({userId, followeeId})

            res.sc(affectRow ? updateStatus : 0)
        }
    }
    // 查询用户
    async list(req,res){
        const id = req.auth.id
        const {keyword} = req.query
        const query = basicUserInfo(id)
            .where('nickname','like',`%${keyword}%`)
        const records = await pageSearch(query,req.query)
        const total = await pageSearchTotal(query)

        res.sc({
            records,total
        })
    }

    // 查询关注列表
    async listFollow(req, res) {
        const {userId} = req.query

        // 查询id
        let followeeIdArr = await knex('follow').select('followeeId').where({userId,status:1}).then(data => data.map(item => item.followeeId))
        // 查询用户信息 包含被禁用的
        const query = basicUserInfo(userId,[]).whereIn('id', followeeIdArr)

        const total = await pageSearchTotal(query, 'id')
        const records = await pageSearch( query,req.query)

        res.sc({
            total,
            records
        })
    }

    // 查询粉丝列表
    async listFans(req, res) {
        const {userId} = req.query

        // 查询id
        let followeeIdArr = await knex('follow').select('userId').where({followeeId: userId}).then(data => data.map(item => item.userId))
        // 查询用户信息 包含被禁用
        const query = basicUserInfo(userId,[]).whereIn('id', followeeIdArr)

        const total = await pageSearchTotal(query, 'id')
        const records = await pageSearch(query,req.query)

        res.sc({
            total,
            records
        })
    }


}
module.exports = new User()
