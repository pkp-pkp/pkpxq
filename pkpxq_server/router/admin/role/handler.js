const knex = require('../../../model/knex')
const {pageSearchTotal, pageSearch, filterField, filterNotNull, isEmptyObject} = require("../../../utils");
const {getTreeMenuByRoleId, updateRoleMenu} = require("../../../model/admin/global");
const _ = require("lodash");

const field = ['roleName', 'roleKey', 'roleSort', 'menuCheckStrictly', 'status','remark']

class Role {
    async list(req, res) {
        const {roleName,roleKey,status} = req.query
        req.query.createTimeRange = JSON.parse(req.query.params || '{}')
        const query = knex('sys_role')
            .select('*')
        const records = await pageSearch(query, req.query , {roleName,roleKey,status,isDelete:0})
        const total = await pageSearchTotal(query)
        res.sc({
            records,
            total
        })
    }
    async Info(req,res){
        const roleId = req.params.roleId
        const [result] = await knex('sys_role').select('*').where({isDelete:0,roleId})
        res.sc(result)
    }

    async add(req, res) {
        const params = filterField(field, req.body)
        params.createBy = req.auth.username
        const menuIds = req.body.menuIds

        try {
            const [insert_id] = await knex('sys_role').insert(params)

            // 插入权限菜单内容
            if (menuIds && menuIds.length !== 0) {
                const role_menus = menuIds.map(menuId => ({
                    roleId: insert_id,
                    menuId
                }))
                await knex('sys_role_menu').insert(role_menus)
            }

            res.cc('添加成功', 200)
        } catch (error) {
            res.cc('添加失败')
        }

    }

    async update(req,res){
        const {roleId,menuIds} = req.body
        const params = filterField(field, req.body)
        params.updateBy = req.auth.username
        try{
            if(roleId===1){
                return res.cc('禁止修改管理员的信息')
            }
            // 修改管理员信息
            await knex('sys_role').update(params).where({roleId})
            await updateRoleMenu(roleId,menuIds)
            // res.cc('修改成功',200)
            res.cc('修改成功',200)

        } catch (error) {
            res.cc('修改失败')
        }
    }
    async delete(req,res){
        const roleIds = req.params.roleIds ? req.params.roleIds.split(',') : []
        if (!roleIds.length) return res.cc('参数错误')

        try{
            await knex('sys_role').update({isDelete:1}).whereIn('roleId',roleIds)
            await knex('sys_role_menu').delete().whereIn('roleId',roleIds)
            res.cc('删除成功',200)
        } catch (error) {
            res.cc('删除失败')
        }
    }
}


module.exports = new Role()
