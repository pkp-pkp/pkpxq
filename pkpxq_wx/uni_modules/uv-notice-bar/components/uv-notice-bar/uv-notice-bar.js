"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvNoticeBar_components_uvNoticeBar_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-notice-bar",
  emits: ["click", "close", "change"],
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvNoticeBar_components_uvNoticeBar_props.props],
  data() {
    return {
      show: true
    };
  },
  methods: {
    // 点击通告栏
    click(index) {
      this.$emit("click", index);
      if (this.url && this.linkType) {
        this.openPage();
      }
    },
    // 点击关闭按钮
    close() {
      this.show = false;
      this.$emit("close");
    },
    // 竖向滚动时触发
    change(index) {
      this.$emit("change", index);
    }
  }
};
if (!Array) {
  const _easycom_uv_column_notice2 = common_vendor.resolveComponent("uv-column-notice");
  const _easycom_uv_row_notice2 = common_vendor.resolveComponent("uv-row-notice");
  (_easycom_uv_column_notice2 + _easycom_uv_row_notice2)();
}
const _easycom_uv_column_notice = () => "../uv-column-notice/uv-column-notice.js";
const _easycom_uv_row_notice = () => "../uv-row-notice/uv-row-notice.js";
if (!Math) {
  (_easycom_uv_column_notice + _easycom_uv_row_notice)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? common_vendor.e({
    b: _ctx.direction === "column" || _ctx.direction === "row" && _ctx.step
  }, _ctx.direction === "column" || _ctx.direction === "row" && _ctx.step ? {
    c: common_vendor.o($options.close),
    d: common_vendor.o($options.click),
    e: common_vendor.o($options.change),
    f: common_vendor.p({
      color: _ctx.color,
      bgColor: _ctx.bgColor,
      text: _ctx.text,
      mode: _ctx.mode,
      step: _ctx.step,
      icon: _ctx.icon,
      ["disable-touch"]: _ctx.disableTouch,
      ["disable-scroll"]: _ctx.disableScroll,
      fontSize: _ctx.fontSize,
      duration: _ctx.duration
    })
  } : {
    g: common_vendor.o($options.close),
    h: common_vendor.o($options.click),
    i: common_vendor.p({
      color: _ctx.color,
      bgColor: _ctx.bgColor,
      text: _ctx.text,
      mode: _ctx.mode,
      fontSize: _ctx.fontSize,
      speed: _ctx.speed,
      url: _ctx.url,
      linkType: _ctx.linkType,
      icon: _ctx.icon
    })
  }, {
    j: common_vendor.s({
      backgroundColor: _ctx.bgColor
    }),
    k: common_vendor.s(_ctx.$uv.addStyle(_ctx.customStyle))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ecf69ee0"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-notice-bar/components/uv-notice-bar/uv-notice-bar.vue"]]);
wx.createComponent(Component);
