"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvCell_components_uvCell_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-cell",
  emits: ["click"],
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvCell_components_uvCell_props.props],
  computed: {
    titleTextStyle() {
      return this.$uv.addStyle(this.titleStyle);
    }
  },
  methods: {
    // 点击cell
    clickHandler(e) {
      if (this.disabled)
        return;
      this.$emit("click", {
        name: this.name
      });
      this.openPage();
      this.stop && this.preventEvent(e);
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  (_easycom_uv_icon2 + _easycom_uv_line2)();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_line = () => "../../../uv-line/components/uv-line/uv-line.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_line)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.icon
  }, _ctx.icon ? {
    b: common_vendor.p({
      name: _ctx.icon,
      ["custom-style"]: _ctx.iconStyle,
      size: _ctx.size === "large" ? 22 : 18
    })
  } : {}, {
    c: _ctx.title
  }, _ctx.title ? {
    d: common_vendor.t(_ctx.title),
    e: common_vendor.s($options.titleTextStyle),
    f: common_vendor.n(_ctx.disabled && "uv-cell--disabled"),
    g: common_vendor.n(_ctx.size === "large" && "uv-cell__title-text--large")
  } : {}, {
    h: _ctx.label
  }, _ctx.label ? {
    i: common_vendor.t(_ctx.label),
    j: common_vendor.n(_ctx.disabled && "uv-cell--disabled"),
    k: common_vendor.n(_ctx.size === "large" && "uv-cell__label--large")
  } : {}, {
    l: !_ctx.$uv.test.empty(_ctx.value)
  }, !_ctx.$uv.test.empty(_ctx.value) ? {
    m: common_vendor.t(_ctx.value),
    n: common_vendor.n(_ctx.disabled && "uv-cell--disabled"),
    o: common_vendor.n(_ctx.size === "large" && "uv-cell__value--large")
  } : {}, {
    p: _ctx.isLink
  }, _ctx.isLink ? {
    q: common_vendor.p({
      name: _ctx.rightIcon,
      ["custom-style"]: _ctx.rightIconStyle,
      color: _ctx.disabled ? "#c8c9cc" : "info",
      size: _ctx.size === "large" ? 18 : 16
    })
  } : {}, {
    r: common_vendor.n(`uv-cell__right-icon-wrap--${_ctx.arrowDirection}`),
    s: common_vendor.n(_ctx.center && "uv-cell--center"),
    t: common_vendor.n(_ctx.size === "large" && "uv-cell__body--large"),
    v: common_vendor.s(_ctx.cellStyle),
    w: _ctx.border
  }, _ctx.border ? {} : {}, {
    x: common_vendor.n(_ctx.customClass),
    y: common_vendor.s(_ctx.$uv.addStyle(_ctx.customStyle)),
    z: !_ctx.disabled && (_ctx.clickable || _ctx.isLink) ? "uv-cell--clickable" : "",
    A: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-565cfae0"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-cell/components/uv-cell/uv-cell.vue"]]);
wx.createComponent(Component);
