const knex = require('../knex')
const {isEmpty} = require("../../utils");
const _ = require("lodash");

const sysUserInfo = function () {
    return knex('sys_user').select(['id', 'username', 'nickname', 'avatar','status', 'isDelete','createBy','createTime','updateBy','updateTime','remark']).where({isDelete:0})
}
const sysRoleInfo = function (){
    return knex('sys_role').where({isDelete:0,status:0}).whereNot('roleId',1)
}
const sysUserRole = function () {
    return knex('sys_user_role')
        .leftJoin('sys_role', 'sys_user_role.roleId', 'sys_role.roleId')
        .where({'sys_role.isDelete':0,'sys_role.status':0})
}

const await_sysRoleMenu = async function (roleId_arr,status = []) {
    const menu_knex = knex('sys_menu').where(function (){
        !isEmpty(status[0]) && this.where({status:status[0]})
    })

    const isAdmin = roleId_arr.includes(1)

    const allMenuId = await menu_knex
        .select('menuId')
        .then(rows => {
            return rows.map(row => row.menuId)
        })

    // 管理员查全部id
    let menuId = []
    if (isAdmin) {
        menuId = allMenuId
    } else {
        menuId = await knex('sys_role_menu')
            .select('menuId')
            .where(function () {
                this.whereIn('roleId', roleId_arr)
            })
            .then(async rows => {
                // 过滤掉没有权限的id
                let r = rows.map(row => row.menuId)
                return r.filter(item => allMenuId.includes(item))
            })
    }

    // menu_type:M(目录，非权限)
    return () => knex('sys_menu').whereIn('menuId', [...new Set(menuId)]).orderBy('orderNum', 'asc')
}


module.exports = {
    sysUserInfo,
    sysRoleInfo,
    sysUserRole,
    await_sysRoleMenu,
}
