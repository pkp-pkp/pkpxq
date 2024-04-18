"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvDivider_components_uvDivider_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-divider",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvDivider_components_uvDivider_props.props],
  emits: ["click"],
  computed: {
    textStyle() {
      const style = {};
      style.fontSize = this.$uv.addUnit(this.textSize);
      style.color = this.textColor;
      return style;
    },
    // 左边线条的的样式
    leftLineStyle() {
      const style = {};
      if (this.textPosition === "left") {
        style.width = "80rpx";
      } else {
        style.flex = 1;
      }
      return style;
    },
    // 右边线条的的样式
    rightLineStyle() {
      const style = {};
      if (this.textPosition === "right") {
        style.width = "80rpx";
      } else {
        style.flex = 1;
      }
      return style;
    }
  },
  methods: {
    // divider组件被点击时触发
    click() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  _easycom_uv_line2();
}
const _easycom_uv_line = () => "../../../uv-line/components/uv-line/uv-line.js";
if (!Math) {
  _easycom_uv_line();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      color: _ctx.lineColor,
      customStyle: $options.leftLineStyle,
      hairline: _ctx.hairline,
      dashed: _ctx.dashed
    }),
    b: _ctx.dot
  }, _ctx.dot ? {} : _ctx.text ? {
    d: common_vendor.t(_ctx.text),
    e: common_vendor.s($options.textStyle)
  } : {}, {
    c: _ctx.text,
    f: common_vendor.p({
      color: _ctx.lineColor,
      customStyle: $options.rightLineStyle,
      hairline: _ctx.hairline,
      dashed: _ctx.dashed
    }),
    g: common_vendor.s(_ctx.$uv.addStyle(_ctx.customStyle)),
    h: common_vendor.o((...args) => $options.click && $options.click(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-222d1a38"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-divider/components/uv-divider/uv-divider.vue"]]);
wx.createComponent(Component);
