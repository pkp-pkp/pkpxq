"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_collapse_item = common_vendor.resolveComponent("uni-collapse-item");
  const _component_uni_collapse = common_vendor.resolveComponent("uni-collapse");
  (_component_uni_collapse_item + _component_uni_collapse)();
}
if (!Math) {
  (Login + Upload + Controller + Post)();
}
const Login = () => "./components/login.js";
const Upload = () => "./components/upload.js";
const Controller = () => "./components/controller.js";
const Post = () => "./components/post.js";
const _sfc_main = {
  __name: "api_test",
  setup(__props) {
    const value = common_vendor.ref(["post"]);
    const collapse = common_vendor.ref(null);
    const update = () => common_vendor.nextTick$1(() => collapse.value.resize());
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "login",
          title: "登录"
        }),
        b: common_vendor.p({
          name: "upload",
          title: "上传"
        }),
        c: common_vendor.o(update),
        d: common_vendor.p({
          name: "controller",
          title: "管理"
        }),
        e: common_vendor.p({
          name: "post",
          title: "帖子"
        }),
        f: common_vendor.o(update),
        g: common_vendor.sr(collapse, "481634e5-0", {
          "k": "collapse"
        }),
        h: common_vendor.o(($event) => value.value = $event),
        i: common_vendor.p({
          modelValue: value.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/pages/api_test/api_test.vue"]]);
wx.createPage(MiniProgramPage);
