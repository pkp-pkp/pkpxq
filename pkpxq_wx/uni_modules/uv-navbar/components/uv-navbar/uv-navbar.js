"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvNavbar_components_uvNavbar_props = require("./props.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-navbar",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvNavbar_components_uvNavbar_props.props],
  data() {
    return {};
  },
  computed: {
    getBgColor() {
      const style = {};
      if (this.bgColor) {
        if (this.bgColor.indexOf("gradient") > -1) {
          style.backgroundImage = this.bgColor;
        } else if (this.isImg) {
          style.background = "transparent";
        } else {
          style.background = this.bgColor;
        }
      }
      return style;
    },
    getStatusbgColor() {
      if (this.bgColor) {
        if (this.isImg) {
          return "transparent";
        } else {
          return this.bgColor;
        }
      }
    },
    // 判断传入的bgColor属性，是否图片路径，只要带有"/"均认为是图片形式
    isImg() {
      const isBase64 = this.bgColor.indexOf("data:") > -1 && this.bgColor.indexOf("base64") > -1;
      return this.bgColor.indexOf("/") !== -1 || isBase64;
    },
    bgImgStyle() {
      const style = {};
      if (this.safeAreaInsetTop) {
        style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight + 44, "px");
      } else {
        style.height = "44px";
      }
      return style;
    }
  },
  methods: {
    // 点击左侧区域
    leftClick() {
      this.$emit("leftClick");
      if (this.autoBack) {
        common_vendor.index.navigateBack();
      }
    },
    // 点击右侧区域
    rightClick() {
      this.$emit("rightClick");
    }
  }
};
if (!Array) {
  const _easycom_uv_status_bar2 = common_vendor.resolveComponent("uv-status-bar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  (_easycom_uv_status_bar2 + _easycom_uv_icon2)();
}
const _easycom_uv_status_bar = () => "../../../uv-status-bar/components/uv-status-bar/uv-status-bar.js";
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  (_easycom_uv_status_bar + _easycom_uv_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.fixed && _ctx.placeholder
  }, _ctx.fixed && _ctx.placeholder ? {
    b: _ctx.$uv.addUnit(_ctx.$uv.getPx(_ctx.height) + _ctx.$uv.sys().statusBarHeight, "px")
  } : {}, {
    c: $options.isImg
  }, $options.isImg ? {
    d: _ctx.bgColor,
    e: _ctx.imgMode,
    f: common_vendor.s($options.bgImgStyle)
  } : {}, {
    g: _ctx.safeAreaInsetTop
  }, _ctx.safeAreaInsetTop ? {
    h: common_vendor.p({
      bgColor: $options.getStatusbgColor
    })
  } : {}, {
    i: _ctx.leftIcon
  }, _ctx.leftIcon ? {
    j: common_vendor.p({
      name: _ctx.leftIcon,
      size: _ctx.leftIconSize,
      color: _ctx.leftIconColor
    })
  } : {}, {
    k: _ctx.leftText
  }, _ctx.leftText ? {
    l: common_vendor.t(_ctx.leftText),
    m: _ctx.leftIconColor
  } : {}, {
    n: common_vendor.o((...args) => $options.leftClick && $options.leftClick(...args)),
    o: common_vendor.t(_ctx.title),
    p: common_vendor.s({
      width: _ctx.$uv.addUnit(_ctx.titleWidth),
      flex: "0 1 auto"
    }),
    q: common_vendor.s(_ctx.$uv.addStyle(_ctx.titleStyle)),
    r: _ctx.rightIcon
  }, _ctx.rightIcon ? {
    s: common_vendor.p({
      name: _ctx.rightIcon,
      size: "20"
    })
  } : {}, {
    t: _ctx.rightText
  }, _ctx.rightText ? {
    v: common_vendor.t(_ctx.rightText)
  } : {}, {
    w: common_vendor.o((...args) => $options.rightClick && $options.rightClick(...args)),
    x: common_vendor.n(_ctx.border && "uv-border-bottom"),
    y: common_vendor.s({
      height: _ctx.$uv.addUnit(_ctx.height)
    }),
    z: common_vendor.s($options.getBgColor),
    A: common_vendor.n(_ctx.fixed && "uv-navbar--fixed")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-16f3e502"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-navbar/components/uv-navbar/uv-navbar.vue"]]);
wx.createComponent(Component);
