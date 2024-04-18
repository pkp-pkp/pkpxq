"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
const api_api = require("../../../api/api.js");
const utils_request = require("../../../utils/request.js");
require("../../../utils/config.js");
require("../../../stores/index.js");
require("../../../stores/app.js");
require("../../../stores/user.js");
require("../../../api/topic.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    let token = common_vendor.ref(common_vendor.index.getStorageSync("token"));
    const toLogin = async () => {
      await utils_request.getNewToken();
      token.value = common_vendor.index.getStorageSync("token");
    };
    const logout = () => {
      common_vendor.index.removeStorageSync("token");
      token.value = "";
      console.log(token);
    };
    const getUserInfo = async () => {
      const data = await api_user._userInfo();
      console.log(data);
    };
    const avatarUrl = common_vendor.ref("https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0");
    const nickName = common_vendor.ref("");
    const onChooseAvatar = async (e) => {
      const res = await api_api._uploadPath(e.detail.avatarUrl, "avatar");
      avatarUrl.value = res.data.path;
    };
    const onChooseName = (e) => {
      nickName.value = e.detail.value;
    };
    const saveInfo = async () => {
      const { code, msg } = await api_user._updateInfo({ avatar: avatarUrl.value, nickName: nickName.value });
      if (code === 200) {
        common_vendor.index.showToast({
          title: msg
        });
      }
    };
    const getPhone = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(token)
      }, !common_vendor.unref(token) ? {
        b: common_vendor.o(toLogin)
      } : {
        c: common_vendor.o(logout)
      }, {
        d: common_vendor.o(getUserInfo),
        e: common_vendor.o(getPhone),
        f: avatarUrl.value,
        g: common_vendor.o(onChooseAvatar),
        h: common_vendor.o(onChooseName),
        i: common_vendor.o(saveInfo)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6a0af47d"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/api_test/components/login.vue"]]);
wx.createComponent(Component);
