const path = require("path");
const fs = require('fs')
/**
 *
 * @param obj 对象
 * @returns {{}}
 */
const filterNotNull = function (obj) {
    const params = {}
    for (let key in obj) {
        if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
            params[key] = obj[key]
        }
    }
    return params
}
exports.filterNotNull = filterNotNull

const isEmpty = function (v) {
    return v === undefined || v === null || v === ''
}
exports.isEmpty = isEmpty;
exports.hasOneEmpty = function (obj){
    let _is = false
    for(let key in obj){
        if(isEmpty(obj[key])){
            _is = true
        }
    }
    return _is
}

function isEmptyObject(obj) {
    console.log(JSON.stringify(obj))
    return JSON.stringify(obj) === '{}'
}

exports.isEmptyObject = isEmptyObject

function isTimeRange(params) {
    return params && params.beginTime && params.endTime
}

exports.pageSearch = function (knex_method, query = {}, otherParams, otherLikeParams) {
    // 获取参数
    let {page = 1, pageSize = 10, sortField = "createTime", sortOrder = "DESC", createTimeRange} = query
    const start = (page - 1) * pageSize

    createTimeRange = JSON.parse(query.params || '{}')
    return knex_method
        .clone()
        .where(function () {
            isTimeRange(createTimeRange) && this.whereBetween('createTime', [createTimeRange.beginTime, createTimeRange.endTime])
            for (let key in otherParams) {
                const item = otherParams[key]
                !isEmpty(item) && this.where(key, item)
            }
            for (let key in otherLikeParams) {
                const item = otherLikeParams[key]
                !isEmpty(item) && this.where(key, 'like', `%${item}%`)
            }
        })
        .limit(pageSize)
        .offset(start)
        .orderBy(sortField, sortOrder)
}

exports.pageSearchTotal = async function (knex_method) {
    return (await knex_method.clone().count('*', {as: 'total'}).first()).total
}

exports.sortByIn = function(sortData,inArr=[],sortField='id'){
    return sortData.sort((a, b) => {
        const indexA = inArr.indexOf(a[sortField]);
        const indexB = inArr.indexOf(b[sortField]);
        if (indexA === -1 && indexB === -1) {
            return 0; // 如果两个元素的 id 都不在给定的数组中，则保持原有顺序
        } else if (indexA === -1) {
            return 1; // 如果 a 的 id 不在给定的数组中，则将 b 排在前面
        } else if (indexB === -1) {
            return -1; // 如果 b 的 id 不在给定的数组中，则将 a 排在前面
        } else {
            return indexA - indexB; // 根据在给定数组中的索引进行排序
        }
    });
}

exports.handleTree = function (data, id, parentId, children) {
    let config = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children'
    };

    var childrenListMap = {};
    var nodeIds = {};
    var tree = [];

    for (let d of data) {
        let parentId = d[config.parentId];
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = [];
        }
        nodeIds[d[config.id]] = d;
        childrenListMap[parentId].push(d);
    }

    for (let d of data) {
        let parentId = d[config.parentId];
        if (nodeIds[parentId] == null) {
            tree.push(d);
        }
    }

    for (let t of tree) {
        adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
        if (childrenListMap[o[config.id]] !== null) {
            o[config.childrenList] = childrenListMap[o[config.id]];
        }
        if (o[config.childrenList]) {
            for (let c of o[config.childrenList]) {
                adaptToChildrenList(c);
            }
        }
    }

    return tree;
}
exports.deleteNodeById = function (flatData, id, idKey = 'id', parentIdKey = 'parentId') {
    // 递归删除节点及其子节点
    function deleteNode(node) {
        flatData.forEach((item, index) => {
            if (item[parentIdKey] === node[idKey]) {
                // 递归删除子节点
                deleteNode(item);
                // 删除当前节点
                flatData.splice(index, 1);
            }
        });
    }

    // 查找要删除的节点，并递归删除其子节点
    flatData.forEach(node => {
        if (node[idKey] === id) {
            deleteNode(node);
            flatData.splice(flatData.indexOf(node), 1);
        }
    });

    return flatData;
}
// 校验其子节点的 status状态是否全为1
exports.checkIsStatus = function checkStatus(flatData, id, idKey = 'id', parentIdKey = 'parentId', statusKey = 'status') {
    let allChildrenStatus = true;

    // 递归检查节点及其子节点的状态
    function checkNodeStatus(node) {
        flatData.forEach(item => {
            if (item[parentIdKey] === node[idKey] && item[idKey] !== id) {
                if (item[statusKey] !== '1') {
                    allChildrenStatus = false;
                    return;
                }
                checkNodeStatus(item);
            }
        });
    }

    // 查找要检查的节点，并递归检查其子节点的状态
    flatData.forEach(node => {
        if (node[idKey] === id) {
            checkNodeStatus(node);
        }
    });

    return allChildrenStatus;
}


exports.filterField = function (field, body) {
    const params = {}
    field.forEach(key => params[key] = body[key])
    return filterNotNull(params)
}

exports.resolveUploadPath = function (file) {
    return path.join('/', file.destination, file.filename).replace(/\\/g, '/')
}

exports.deleteFiles = function (paths) {
    let count = 0
    paths.forEach(p => {
        try {
            fs.unlinkSync(path.join(__dirname, '../', p))
            count++
        } catch (error) {
            console.log(error, p, '删除文件失败')
        }
    })
    return count
}
