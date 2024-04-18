const knex = require('../../../model/knex')
const {getMenu, getMenuLastIdByType, getTreeMenu, getTreeMenuByRoleId} = require("../../../model/admin/global");
const {filterNotNull, filterField} = require("../../../utils");


/**
 * 辅助函数：递归查询并删除子元素
 * 删除指定menuId及其子元素
 */
async function deleteMenuAndChildren(menuId) {
    async function deleteChildren(menuId) {
        // 查询所有子元素的menuId
        const children = await knex('sys_menu')
            .select('menuId')
            .where('parentId', menuId);

        // 递归删除子元素
        for (const child of children) {
            await deleteChildren(child.menuId);
            await knex('sys_menu')
                .where('menuId', child.menuId)
                .delete();
        }
    }

    await deleteChildren(menuId);

    // 删除指定menuId自身
    await knex('sys_menu')
        .where('menuId', menuId)
        .delete()
}

const field = ['menuName', 'parentId', 'orderNum', 'path', 'component', 'query', 'isCache', 'menuType', 'visible', 'status', 'perms', 'icon', 'remark']

class Menu {
    async list(req, res) {
        const {menuName = '', status} = req.query
        let id = req.auth.id
        const menu = await getMenu(id, [],{status}, {menuName: `%${menuName}%`})
        res.sc(menu)
    }

    async treeSelect(req, res) {
        let id = req.auth.id
        const treeMenu = await getTreeMenu(id)
        res.sc(treeMenu)
    }

    async roleMenuTreeselect(req, res) {
        let id = req.auth.id
        let roleId = req.params.roleId

        const treeMenu = await getTreeMenu(id)
        const checkedKeys = await getTreeMenuByRoleId(roleId)
        // checkedKeys
        res.sc({menus:treeMenu,checkedKeys})
    }

    async add(req, res) {
        let menuType = req.body.menuType
        const params = filterField(field, req.body)

        const menuId = await getMenuLastIdByType(menuType)
        let {username} = req.auth
        const [insert_id] = await knex('sys_menu').insert({...params, createBy: username, menuId: menuId + 1})

        insert_id ? res.cc('添加成功', 200) : res.cc('添加失败', 400)
    }

    async update(req, res) {
        const menuId = req.body.menuId
        const params = filterField(field, req.body)
        if(params.parentId==menuId){
            return res.cc('父级菜单不能选择自己')
        }
        let {username} = req.auth
        const result = await knex('sys_menu').update({...params, updateBy: username}).where({menuId})
        result ? res.cc('编辑成功', 200) : res.cc('编辑失败')
    }

    async delete(req, res) {
        let menuId = req.params.menuId
        deleteMenuAndChildren(menuId).then(() => {
            res.cc('删除成功', 200)
        }).catch(error => {
            res.cc('删除失败', 400)
        })
    }
}


module.exports = new Menu()
