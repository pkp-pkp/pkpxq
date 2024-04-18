"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const api_user = require("../../api/user.js");
const api_api = require("../../api/api.js");
const stores_user = require("../../stores/user.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_cell2 = common_vendor.resolveComponent("uv-cell");
  const _easycom_uv_cell_group2 = common_vendor.resolveComponent("uv-cell-group");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_image2 + _easycom_uv_cell2 + _easycom_uv_cell_group2 + _easycom_uv_button2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_cell = () => "../../uni_modules/uv-cell/components/uv-cell/uv-cell.js";
const _easycom_uv_cell_group = () => "../../uni_modules/uv-cell/components/uv-cell-group/uv-cell-group.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_cell + _easycom_uv_cell_group + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const store = stores_user.useUserStore();
    common_vendor.ref(null);
    const form = common_vendor.ref({
      avatar: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
      nickname: ""
    });
    common_vendor.onLoad(async () => {
      await store.getUserInfo();
      if (store.isLogin) {
        common_vendor.index.showToast({
          title: "请直接登录",
          icon: "error"
        });
        common_vendor.index.redirectTo({
          url: "/pages/main/main?pageCur=myself"
        });
      }
    });
    const onChooseAvatar = (e) => {
      form.value.avatar = e.detail.avatarUrl;
    };
    const onChangeNickName = async (e) => {
      form.value.nickname = e.detail.value;
    };
    const getPhoneNumber = async (e) => {
      let phone = "";
      if (e.errMsg != "getPhoneNumber:ok") {
        common_vendor.index.showToast({
          title: "请授权手机号登录哦",
          icon: "none"
        });
        return;
      }
      let code = await utils_request.getCode();
      let { encryptedData, iv } = e;
      let res = await api_user._getPhoneNumber({ encryptedData, iv, code });
      if (res.code === 200) {
        phone = res.data.phoneNumber;
      }
      let res_upload = await api_api._uploadPath(form.value.avatar, "avatar");
      form.value.avatar = res_upload.data.filePath;
      let res_update = await api_user._updateInfo({
        ...form.value,
        mobile: phone
      });
      if (res_update.code === 200) {
        store.login({ userInfo: res_update.data, token: store.token });
        common_vendor.index.navigateBack();
        common_vendor.index.showToast({
          title: "登录成功！"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: form.value.avatar,
          shape: "circle",
          width: "55px",
          height: "55px",
          mode: "scaleToFill"
        }),
        b: common_vendor.o(onChooseAvatar),
        c: common_vendor.p({
          title: "社交头像",
          isLink: true
        }),
        d: common_vendor.o(onChangeNickName),
        e: form.value.nickname,
        f: common_vendor.o(($event) => form.value.nickname = $event.detail.value),
        g: common_vendor.p({
          title: "用户昵称",
          isLink: true
        }),
        h: common_vendor.o(getPhoneNumber),
        i: common_vendor.p({
          type: "primary",
          text: "授权手机号并登录",
          ["open-type"]: "getPhoneNumber"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
