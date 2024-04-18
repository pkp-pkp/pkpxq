"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvText_components_uvText_value = require("./value.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvUiTools_libs_mixin_button = require("../../../uv-ui-tools/libs/mixin/button.js");
const uni_modules_uvUiTools_libs_mixin_openType = require("../../../uv-ui-tools/libs/mixin/openType.js");
const uni_modules_uvText_components_uvText_props = require("./props.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-text",
  emits: ["click"],
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvText_components_uvText_value.value, uni_modules_uvUiTools_libs_mixin_button.button, uni_modules_uvUiTools_libs_mixin_openType.openType, uni_modules_uvText_components_uvText_props.props],
  computed: {
    valueStyle() {
      const style = {
        textDecoration: this.decoration,
        fontWeight: this.bold ? "bold" : "normal",
        wordWrap: this.wordWrap,
        fontSize: this.$uv.addUnit(this.size)
      };
      !this.type && (style.color = this.color);
      this.isNvue && this.lines && (style.lines = this.lines);
      if (this.isNvue && this.mode != "price" && !this.prefixIcon && !this.suffixIcon) {
        style.flex = 1;
        style.textAlign = this.align === "left" ? "flex-start" : this.align === "center" ? "center" : "right";
      }
      this.lineHeight && (style.lineHeight = this.$uv.addUnit(this.lineHeight));
      !this.isNvue && this.block && (style.display = "block");
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    },
    isNvue() {
      let nvue = false;
      return nvue;
    },
    isMp() {
      let mp = false;
      mp = true;
      return mp;
    }
  },
  data() {
    return {};
  },
  methods: {
    clickHandler() {
      if (this.call && this.mode === "phone") {
        common_vendor.index.makePhoneCall({
          phoneNumber: this.text
        });
      }
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_link2 = common_vendor.resolveComponent("uv-link");
  (_easycom_uv_icon2 + _easycom_uv_link2)();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_link = () => "../../../uv-link/components/uv-link/uv-link.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_link)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.show
  }, _ctx.show ? common_vendor.e({
    b: _ctx.mode === "price"
  }, _ctx.mode === "price" ? {
    c: common_vendor.n(_ctx.type && `uv-text__value--${_ctx.type}`),
    d: common_vendor.s($options.valueStyle)
  } : {}, {
    e: _ctx.prefixIcon
  }, _ctx.prefixIcon ? {
    f: common_vendor.p({
      name: _ctx.prefixIcon,
      customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
    })
  } : {}, {
    g: _ctx.mode === "link"
  }, _ctx.mode === "link" ? {
    h: common_vendor.p({
      text: _ctx.value,
      href: _ctx.href,
      underLine: true
    })
  } : _ctx.openType && $options.isMp ? {
    j: common_vendor.t(_ctx.value),
    k: common_vendor.s($options.valueStyle),
    l: _ctx.openType,
    m: common_vendor.o((...args) => _ctx.onGetUserInfo && _ctx.onGetUserInfo(...args)),
    n: common_vendor.o((...args) => _ctx.onContact && _ctx.onContact(...args)),
    o: common_vendor.o((...args) => _ctx.onGetPhoneNumber && _ctx.onGetPhoneNumber(...args)),
    p: common_vendor.o((...args) => _ctx.onError && _ctx.onError(...args)),
    q: common_vendor.o((...args) => _ctx.onLaunchApp && _ctx.onLaunchApp(...args)),
    r: common_vendor.o((...args) => _ctx.onOpenSetting && _ctx.onOpenSetting(...args)),
    s: _ctx.lang,
    t: _ctx.sessionFrom,
    v: _ctx.sendMessageTitle,
    w: _ctx.sendMessagePath,
    x: _ctx.sendMessageImg,
    y: _ctx.showMessageCard,
    z: _ctx.appParameter
  } : {
    A: common_vendor.t(_ctx.value),
    B: common_vendor.s($options.valueStyle),
    C: common_vendor.n(_ctx.type && `uv-text__value--${_ctx.type}`),
    D: common_vendor.n(_ctx.lines && `uv-line-${_ctx.lines}`)
  }, {
    i: _ctx.openType && $options.isMp,
    E: _ctx.suffixIcon
  }, _ctx.suffixIcon ? {
    F: common_vendor.p({
      name: _ctx.suffixIcon,
      customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
    })
  } : {}, {
    G: _ctx.margin,
    H: _ctx.align === "left" ? "flex-start" : _ctx.align === "center" ? "center" : "flex-end",
    I: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8da47eb3"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-text/components/uv-text/uv-text.vue"]]);
wx.createComponent(Component);
