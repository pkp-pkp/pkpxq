const knex = require('../../../model/knex')
const {setToken} = require("../../../utils/jwt");
const bcrypt = require('bcryptjs');
const {sysUserInfo, sysUserRole, sysRoleInfo} = require("../../../model/admin/global_sys_user");
const salt = bcrypt.genSaltSync(10)
const {buildMenus} = require("../../../class/Router");
const {getPermission, getMenu, getRole, updateRoleMenu, uploadLog} = require("../../../model/admin/global");
const {pageSearchTotal, pageSearch, filterField, resolveUploadPath} = require("../../../utils");


class Admin {
    login(req, res) {
        const {code, username, password} = req.body
        if (code !== req.session.code) return res.cc('验证码错误')
        try {
            knex('sys_user').where({username, isDelete: 0}).first().then(async user => {
                if (!user) return res.cc('用户不存在')
                if (!bcrypt.compareSync(password, user.password)) return res.cc('密码错误')
                if (user.status != '0') return res.cc('用户已被禁用，请联系管理员')

                let token = await setToken({id: user.id, username, identity: 'admin'})
                res.sc({token}, '登录成功', 200)
            })
        } catch (err) {
            res.cc('登录失败')
        }
    }

    logout(req, res) {
        res.cc('注销成功', 200)
    }

    async getInfo(req, res) {
        let id = req.auth.id
        // 查用户信息
        const [user] = await sysUserInfo().where({id})

        const permissions = await getPermission(id)
        const {roleKey: roles} = await getRole(id)
        res.sc({
            roles,
            user,
            permissions: permissions
        })
    }

    async getRouters(req, res) {
        let id = req.auth.id
        const menus = await getMenu(id,[0])
        // 获取路由列表
        const routers = new buildMenus(menus).routerList()
        res.sc(routers)
    }

    async userList(req, res) {
        const query = sysUserInfo()
        const {username, status} = req.query
        req.query.createTimeRange = JSON.parse(req.query.params || '{}')
        const records = await pageSearch(query, req.query, {username, status})
        const total = await pageSearchTotal(query)
        res.sc({
            records,
            total
        })
    }

    // 新增用户内表单需要的内容
    async user(req, res) {
        const roles = await sysRoleInfo()
        res.sc({
            roles
        })
    }

    // 编辑用户内表单的内容
    async userById(req, res) {
        const id = req.params.id
        const user = await sysUserInfo().where({id}).first()
        const allRoles = await knex('sys_role')
            .select('*').where({isDelete: 0,status:0})
        const roleIds = await sysUserRole().where({'sys_user_role.userId': id}).then(rows=>rows.map(item=>item.roleId))
        res.sc({
            user,
            roles:allRoles,
            roleIds
        })
    }

    // 添加用户
    async userAdd(req, res) {
        const field = ['nickname', 'password', 'status', 'username', 'createBy']
        const roleIds = req.body.roleIds
        req.body.password = bcrypt.hashSync(req.body.password, salt)
        req.body.createBy = req.auth.username
        const params = filterField(field, req.body)

        try {
            const [insert_id] = await knex('sys_user').insert(params)
            if (roleIds && roleIds.length > 0) {
                const insert_params = roleIds.map(roleId => ({
                    userId: insert_id,
                    roleId
                }))
                await knex('sys_user_role').insert(insert_params)
            }

            res.cc('添加成功', 200)
        } catch (error) {
            res.cc('添加失败')
        }
    }

    async userUpdate(req, res) {
        const field = ['nickname', 'status', 'remark', 'updateBy']
        req.body.updateBy = req.auth.username
        const {roleIds, id} = req.body
        const params = filterField(field, req.body)
        try {
            if(id===1){
                return res.cc('禁止修改管理员的信息')
            }
            // 修改用户信息
            await knex('sys_user').update(params).where({id})
            // 修改用户角色

            if (roleIds && roleIds.length > 0) {
                const insert_params = roleIds.map(roleId => ({userId:id, roleId}))
                await knex('sys_user_role').where({userId:id}).del()
                await knex('sys_user_role').insert(insert_params)
            }

            res.cc('修改成功', 200)
        } catch (error) {
            res.cc('修改失败')
        }
    }

    async userDelete(req, res) {
        const ids = req.params.ids ? req.params.ids.split(',') : []
        if (!ids.length) return res.cc('参数错误')

        const result = await knex('sys_user').update({isDelete: 1}).whereIn('id',ids)

        result ? res.cc('删除成功', 200) : res.cc('删除失败')
    }

    async userResetPwd(req, res) {
        const {id, password} = req.body
        if (!id || !password) return res.cc('参数错误')

        const result = await knex('sys_user').update({password: bcrypt.hashSync(password, salt)}).where({id})
        result ? res.cc('重置成功', 200) : res.cc('重置失败')
    }

    // 管理员自身信息
    async profile(req, res) {
        let id = req.auth.id
        // 查用户信息
        const [user] = await sysUserInfo().where({id})

        const {roleName} = await getRole(id)
        res.sc({
            roleNames: roleName,
            user,
        })
    }

    async profileUpdate(req, res) {
        let field = ['nickname', 'updateBy']
        req.body.updateBy = req.auth.username
        const params = filterField(field, req.body)
        try {
            await knex('sys_user').update(params).where({id: req.auth.id})
            res.cc('修改成功', 200)
        } catch (error) {
            res.cc('修改失败')
        }
    }

    async profileUpdatePwd(req, res) {
        const {oldPassword, newPassword} = req.body
        if (!oldPassword || !newPassword) return res.cc('参数错误')
        // 校验旧密码
        const user = await knex('sys_user').where({id: req.auth.id}).first()
        if (!bcrypt.compareSync(oldPassword, user.password)) return res.cc('旧密码错误')
        // 修改密码
        const result = await knex('sys_user').update({password: bcrypt.hashSync(newPassword, salt)}).where({id: req.auth.id})
        result ? res.cc('修改成功', 200) : res.cc('修改失败')
    }

    async profileUpdateAvatar(req, res) {
        try {
            const path = resolveUploadPath(req.file)
            await uploadLog(req.auth.id, path)
            await knex('sys_user').update({'avatar': path}).where({id: req.auth.id})
            res.cc('修改成功', 200)
        } catch (error) {
            res.cc('修改失败')
        }
    }
}


module.exports = new Admin()
