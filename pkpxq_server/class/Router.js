const _ = require('lodash/string')

class Router {
    constructor(menu) {
        this.menu = menu
        this.router = {}
    }

    getRouteName() {
        return _.capitalize(this.menu.path)
    }

    getComponent() {
        let component = this.menu.component
        if (!component) {
            component = ''
        }
        return component ? component : 'Layout'
    }


    valueOf() {
        const {menuType} = this.menu

        if (menuType === 'M') {
            // 目录
            this.router = {
                name: this.getRouteName(),
                path: '/' + this.menu.path,
                component: this.getComponent(),
                alwaysShow: true,
                hidden: this.menu.visible === 1,
                redirect: 'noRedirect',
                meta: {
                    title: this.menu.menuName,
                    icon: this.menu.icon
                },
                menuId: this.menu.menuId,
                parentId: this.menu.parentId
            }
        }
        if (menuType === 'F') {
            // 按钮：接口请求的权限，不显示路由

        }
        if (menuType === 'C') {
            // 菜单
            this.router = {
                name: this.getRouteName(),
                path: this.menu.path,
                component: this.getComponent(),
                hidden: this.menu.visible === 1,
                meta: {
                    title: this.menu.menuName,
                    icon: this.menu.icon,
                    noCache: !!this.menu.isCache
                },
                menuId: this.menu.menuId,
                parentId: this.menu.parentId
            }
        }
        return this.router
    }
}


class buildMenus {
    constructor(menus) {
        this.menus = menus
    }

    static convertToTree(data, parentId) {
        const tree = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].parentId === parentId) {
                const node = data[i];
                const children = buildMenus.convertToTree(data, data[i].menuId) // 递归处理子节点
                if (children.length > 0) node.children = children
                delete node.parentId
                delete node.menuId
                tree.push(node);
            }
        }
        return tree;
    }

    // 获取路由列表
    routerList() {
        let router_vm = []
        this.menus.forEach(menu => {
            let router = new Router(menu).valueOf()
            router_vm.push(router)
        })
        return buildMenus.convertToTree(router_vm, 0)
    }

}

module.exports = {
    buildMenus
}
