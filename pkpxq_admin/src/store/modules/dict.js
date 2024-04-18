const state = {
  dict: [
    {
      key:'sys_normal_disable',
      value:[
        {
          "createBy": "admin",
          "createTime": "2023-04-23 16:13:26",
          "updateBy": null,
          "updateTime": null,
          "remark": "正常状态",
          "dictCode": 6,
          "dictSort": 1,
          "dictLabel": "正常",
          "dictValue": "0",
          "dictType": "sys_normal_disable",
          "cssClass": "",
          "listClass": "primary",
          "isDefault": "Y",
          "status": "0",
          "default": true
        },
        {
          "createBy": "admin",
          "createTime": "2023-04-23 16:13:26",
          "updateBy": null,
          "updateTime": null,
          "remark": "停用状态",
          "dictCode": 7,
          "dictSort": 2,
          "dictLabel": "停用",
          "dictValue": "1",
          "dictType": "sys_normal_disable",
          "cssClass": "",
          "listClass": "danger",
          "isDefault": "N",
          "status": "0",
          "default": false
        }
      ]
    },
    {
      key: 'sys_show_hide',
      value: [
        {
          "createBy": "admin",
          "createTime": "2023-04-23 16:13:26",
          "updateBy": null,
          "updateTime": null,
          "remark": "正常状态",
          "dictCode": 6,
          "dictSort": 1,
          "dictLabel": "正常",
          "dictValue": "0",
          "dictType": "sys_normal_disable",
          "cssClass": "",
          "listClass": "primary",
          "isDefault": "Y",
          "status": "0",
          "default": true
        },
        {
          "createBy": "admin",
          "createTime": "2023-04-23 16:13:26",
          "updateBy": null,
          "updateTime": null,
          "remark": "停用状态",
          "dictCode": 7,
          "dictSort": 2,
          "dictLabel": "停用",
          "dictValue": "1",
          "dictType": "sys_normal_disable",
          "cssClass": "",
          "listClass": "danger",
          "isDefault": "N",
          "status": "0",
          "default": false
        }]
    },
    {
      key:'post_type',
      value:[
        {
          dictLabel:"笔记",
          dictValue:"1"
        },
        {
          dictLabel:"日常",
          dictValue:"2"
        },
        {
          dictLabel:"视频",
          dictValue:"3"
        }
      ]
    }
  ]
}
const mutations = {
  SET_DICT: (state, {key, value}) => {
    if (key !== null && key !== "") {
      state.dict.push({
        key: key,
        value: value
      })
    }
  },
  REMOVE_DICT: (state, key) => {
    try {
      for (let i = 0; i < state.dict.length; i++) {
        if (state.dict[i].key == key) {
          state.dict.splice(i, 1)
          return true
        }
      }
    } catch (e) {
    }
  },
  CLEAN_DICT: (state) => {
    state.dict = new Array()
  }
}

const actions = {
  // 设置字典
  setDict({commit}, data) {
    commit('SET_DICT', data)
  },
  // 删除字典
  removeDict({commit}, key) {
    commit('REMOVE_DICT', key)
  },
  // 清空字典
  cleanDict({commit}) {
    commit('CLEAN_DICT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

