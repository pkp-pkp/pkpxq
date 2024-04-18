"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_useShare = require("../../utils/useShare.js");
if (!Array) {
  const _component_uni_collapse_item = common_vendor.resolveComponent("uni-collapse-item");
  const _component_uni_collapse = common_vendor.resolveComponent("uni-collapse");
  (_component_uni_collapse_item + _component_uni_collapse)();
}
if (!Math) {
  (Phone + Share)();
}
const Phone = () => "./components/Phone.js";
const Share = () => "./components/Share.js";
const _sfc_main = {
  __name: "wx_api",
  setup(__props) {
    const value = common_vendor.ref(["share"]);
    utils_useShare.useShare();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "phone",
          title: "手机号"
        }),
        b: common_vendor.p({
          name: "share",
          title: "分享"
        }),
        c: common_vendor.sr("collapse", "5f5a8e45-0"),
        d: common_vendor.o(($event) => value.value = $event),
        e: common_vendor.p({
          modelValue: value.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/pages/wx_api/wx_api.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
