"use strict";
const common_vendor = require("../common/vendor.js");
const api_user = require("../api/user.js");
const api_topic = require("../api/topic.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => {
    return {
      token: common_vendor.index.getStorageSync("token"),
      userInfo: common_vendor.index.getStorageSync("userInfo"),
      isBan: false,
      topic_info: {},
      tempToken: null
    };
  },
  getters: {
    isLogin: (state) => {
      let {
        nickname,
        avatar
      } = state.userInfo;
      return !!nickname && !!avatar;
    },
    isTopicAdmin: (state) => {
      return state.topic_info.userId === state.userInfo.id;
    }
  },
  actions: {
    async getUserInfo() {
      if (!this.token)
        return;
      const res = await api_user._userInfo();
      if (res.code == 200) {
        this.userInfo = res.data;
      } else {
        this.logout();
      }
    },
    async getTopicInfo() {
      const res = await api_topic._getTopicInfo(1);
      this.topic_info = res.data;
    },
    login(v) {
      let {
        userInfo,
        token
      } = v;
      this.userInfo = userInfo;
      this.token = token;
      common_vendor.index.setStorageSync("userInfo", userInfo);
      common_vendor.index.setStorageSync("token", token);
    },
    logout() {
      this.$reset();
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.removeStorageSync("token");
    },
    setBan(v) {
      this.isBan = v;
      if (v) {
        common_vendor.index.reLaunch({
          url: "/pages/error/error?text=你已被封禁，请联系管理员"
        });
      }
    }
  }
});
exports.useUserStore = useUserStore;
