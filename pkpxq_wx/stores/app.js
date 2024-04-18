"use strict";
const common_vendor = require("../common/vendor.js");
const useAppStore = common_vendor.defineStore("app", {
  state: () => {
    return {
      // 用户解决，main页面，跳转到编辑页面后返回数据没有自动刷新
      reload: {
        home: false,
        myself: false
      }
    };
  }
});
exports.useAppStore = useAppStore;
