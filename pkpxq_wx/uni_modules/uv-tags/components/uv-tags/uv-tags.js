"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvTags_components_uvTags_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-tags",
  emits: ["click", "close"],
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvTags_components_uvTags_props.props],
  computed: {
    style() {
      const style = {};
      if (this.bgColor) {
        style.backgroundColor = this.bgColor;
      }
      if (this.color) {
        style.color = this.color;
      }
      if (this.borderColor) {
        style.borderColor = this.borderColor;
      }
      return style;
    },
    // nvue下，文本颜色无法继承父元素
    textColor() {
      const style = {};
      if (this.color) {
        style.color = this.color;
      }
      return style;
    },
    imgStyle() {
      const width = this.size === "large" ? "17px" : this.size === "medium" ? "15px" : "13px";
      return {
        width,
        height: width
      };
    },
    // 文本的样式
    closeSize() {
      const size = this.size === "large" ? 15 : this.size === "medium" ? 13 : 12;
      return size;
    },
    // 图标大小
    iconSize() {
      const size = this.size === "large" ? 21 : this.size === "medium" ? 19 : 16;
      return size;
    },
    // 图标颜色
    elIconColor() {
      return this.iconColor ? this.iconColor : this.plain ? this.type : "#ffffff";
    }
  },
  methods: {
    // 点击关闭按钮
    closeHandler() {
      this.$emit("close", this.name);
    },
    // 点击标签
    clickHandler() {
      this.$emit("click", this.name);
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_transition2 = common_vendor.resolveComponent("uv-transition");
  (_easycom_uv_icon2 + _easycom_uv_transition2)();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_transition = () => "../../../uv-transition/components/uv-transition/uv-transition.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.icon
  }, _ctx.icon ? common_vendor.e({
    b: _ctx.$uv.test.image(_ctx.icon)
  }, _ctx.$uv.test.image(_ctx.icon) ? {
    c: _ctx.icon,
    d: common_vendor.s($options.imgStyle)
  } : {
    e: common_vendor.p({
      color: $options.elIconColor,
      name: _ctx.icon,
      size: $options.iconSize
    })
  }) : {}, {
    f: common_vendor.t(_ctx.text),
    g: common_vendor.s($options.textColor),
    h: common_vendor.n(`uv-tags__text--${_ctx.type}`),
    i: common_vendor.n(_ctx.plain && `uv-tags__text--${_ctx.type}--plain`),
    j: common_vendor.n(`uv-tags__text--${_ctx.size}`),
    k: _ctx.closable && _ctx.closePlace == "right"
  }, _ctx.closable && _ctx.closePlace == "right" ? {
    l: common_vendor.p({
      name: "close",
      size: $options.closeSize,
      color: "#ffffff"
    }),
    m: common_vendor.n(`uv-tags__close--${_ctx.size}`),
    n: common_vendor.n(`uv-tags__close--${_ctx.closePlace}`),
    o: common_vendor.o((...args) => $options.closeHandler && $options.closeHandler(...args)),
    p: _ctx.closeColor
  } : {}, {
    q: common_vendor.n(`uv-tags--${_ctx.shape}`),
    r: common_vendor.n(!_ctx.plain && `uv-tags--${_ctx.type}`),
    s: common_vendor.n(_ctx.plain && `uv-tags--${_ctx.type}--plain`),
    t: common_vendor.n(`uv-tags--${_ctx.size}`),
    v: common_vendor.n(`uv-tags--${_ctx.size}--${_ctx.closePlace}`),
    w: common_vendor.n(_ctx.plain && _ctx.plainFill && `uv-tags--${_ctx.type}--plain--fill`),
    x: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args)),
    y: common_vendor.s({
      marginRight: _ctx.closable && _ctx.closePlace == "right-top" ? "10px" : 0,
      marginTop: _ctx.closable && _ctx.closePlace == "right-top" ? "10px" : 0
    }),
    z: common_vendor.s($options.style),
    A: common_vendor.s(_ctx.$uv.addStyle(_ctx.customStyle)),
    B: _ctx.closable && _ctx.closePlace == "right-top"
  }, _ctx.closable && _ctx.closePlace == "right-top" ? {
    C: common_vendor.p({
      name: "close",
      size: $options.closeSize,
      color: "#ffffff"
    }),
    D: common_vendor.n(`uv-tags__close--${_ctx.size}`),
    E: common_vendor.n(`uv-tags__close--${_ctx.closePlace}`),
    F: common_vendor.o((...args) => $options.closeHandler && $options.closeHandler(...args)),
    G: _ctx.closeColor
  } : {}, {
    H: common_vendor.p({
      mode: "fade",
      show: _ctx.show,
      ["cell-child"]: _ctx.cellChild
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b10c8d02"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-tags/components/uv-tags/uv-tags.vue"]]);
wx.createComponent(Component);
