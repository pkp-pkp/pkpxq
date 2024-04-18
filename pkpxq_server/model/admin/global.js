const {await_sysRoleMenu, sysUserRole} = require('./global_sys_user');
const knex = require("../knex");
const {handleTree} = require("../../utils");
const _ = require("lodash");

async function getRole(id) {
    // 查用户角色
    const userRows = await sysUserRole().select(['sys_role.roleKey', 'sys_user_role.roleId','sys_role.roleName']).where({'sys_user_role.userId': id})
    let roleKey = []
    let roleId = []
    let roleName = []
    userRows.forEach(item=>{
        roleKey.push(item.roleKey)
        roleId.push(item.roleId)
        roleName.push(item.roleName)
    })
    return {
        roleKey,
        roleId,
        roleName
    }
}

async function getPermission(id) {
    let {roleId} = await getRole(id)
    let isAdmin = roleId.includes(1)

    if (isAdmin) {
        return ['*:*:*']
    } else {
        const sysRoleMenu = await await_sysRoleMenu(roleId)
        // menu_type:M(目录，非权限)
        const menus = await sysRoleMenu().whereNot({menuType: 'M'})
        return menus.map(item => item.perms)
    }
}

async function getMenu(id,menu_status=[],whereParams,whereLike){
    let {roleId} = await getRole(id)
    const sysRoleMenu = await await_sysRoleMenu(roleId,menu_status)
    return sysRoleMenu().where(function () {
        if(whereParams){
            for(let key in whereParams){
                if(whereParams[key]!==undefined){
                    this.where(key,whereParams[key])
                }
            }
        }
        if(whereLike){
            for(let key in whereLike){
                if(whereLike[key]!==undefined) {
                    this.where(key,'like', whereLike[key])
                }
            }
        }
    });
}

async function getTreeMenu(id){
    let {roleId} = await getRole(id)
    const sysRoleMenu = await await_sysRoleMenu(roleId)
    const treeMenu = await sysRoleMenu().then(rows=>rows.map(row=>{
        return {
            id:row.menuId,
            parentId:row.parentId,
            label:row.menuName
        }
    }))
    return handleTree(treeMenu)
}

async function getTreeMenuByRoleId(roleId){
    return await knex('sys_role_menu')
        .select('menuId')
        .where({roleId})
        .then(rows => {
            return rows.map(row => row.menuId)
        })
}

async function getMenuLastIdByType(menuType){
    const {menuId} = await knex('sys_menu')
        .select('menuId')
        .where({menuType})
        .orderBy('menuId','desc')
        .limit(1)
        .first()
    return menuId
}

// 修改某个roleId下的菜单内容
async function updateRoleMenu(roleId, menuIds){
    return await knex.transaction(async(trx)=>{
        // 修改权限
        // 查已存在的
        const checkedKeys = await getTreeMenuByRoleId(roleId)

        // a-b = 要删除的内容
        const a_b = _.difference(checkedKeys,menuIds)
        // b-a = 要插入的内容
        const b_a = _.difference(menuIds,checkedKeys)
        await trx('sys_role_menu').whereIn('menuId',a_b).del()

        if(b_a.length>0){
            const insert_params = b_a.map(menuId=>({
                roleId,
                menuId
            }))
            // 插入缺少的记录
            await trx('sys_role_menu').insert(insert_params)
        }
    })
}

async function uploadLog(id,path){
    await knex('sys_upload').insert({adminId:id,path})
}
async function deleteAndChildren(id,tableName,idKey,parentKey) {
    async function deleteChildren(id,tableName,idKey='id',parentKey='parentId') {
        // 查询所有子元素的menuId
        const children = await knex(tableName)
            .select(idKey)
            .where(parentKey, id);

        // 递归删除子元素
        for (const child of children) {
            await deleteChildren(child[id]);
            await knex(tableName)
                .where(idKey, child[id])
                .delete();
        }
    }

    await deleteChildren(id,tableName,idKey,parentKey);

    // 删除指定menuId自身
    await knex(tableName)
        .where(idKey, id)
        .delete()
}

module.exports = {
    getRole,
    getPermission,
    getMenu,
    getTreeMenu,
    getTreeMenuByRoleId,
    getMenuLastIdByType,
    updateRoleMenu,
    uploadLog
}
