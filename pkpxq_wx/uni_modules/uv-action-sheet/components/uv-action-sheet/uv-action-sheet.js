"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvUiTools_libs_mixin_button = require("../../../uv-ui-tools/libs/mixin/button.js");
const uni_modules_uvUiTools_libs_mixin_openType = require("../../../uv-ui-tools/libs/mixin/openType.js");
const uni_modules_uvActionSheet_components_uvActionSheet_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-action-sheet",
  mixins: [uni_modules_uvUiTools_libs_mixin_openType.openType, uni_modules_uvUiTools_libs_mixin_button.button, uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvActionSheet_components_uvActionSheet_props.props],
  emits: ["close", "select"],
  computed: {
    // 操作项目的样式
    itemStyle() {
      return (index) => {
        let style = {};
        if (this.actions[index].color)
          style.color = this.actions[index].color;
        if (this.actions[index].fontSize)
          style.fontSize = this.$uv.addUnit(this.actions[index].fontSize);
        if (this.actions[index].disabled)
          style.color = "#c0c4cc";
        return style;
      };
    }
  },
  methods: {
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    popupChange(e) {
      if (!e.show)
        this.$emit("close");
    },
    // 点击取消按钮
    cancel() {
      this.close();
    },
    selectHandler(index) {
      const item = this.actions[index];
      if (item && !item.disabled && !item.loading) {
        this.$emit("select", item);
        if (this.closeOnClickAction) {
          this.close();
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_loading_icon2 = common_vendor.resolveComponent("uv-loading-icon");
  const _easycom_uv_gap2 = common_vendor.resolveComponent("uv-gap");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  (_easycom_uv_icon2 + _easycom_uv_line2 + _easycom_uv_loading_icon2 + _easycom_uv_gap2 + _easycom_uv_popup2)();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_line = () => "../../../uv-line/components/uv-line/uv-line.js";
const _easycom_uv_loading_icon = () => "../../../uv-loading-icon/components/uv-loading-icon/uv-loading-icon.js";
const _easycom_uv_gap = () => "../../../uv-gap/components/uv-gap/uv-gap.js";
const _easycom_uv_popup = () => "../../../uv-popup/components/uv-popup/uv-popup.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_line + _easycom_uv_loading_icon + _easycom_uv_gap + _easycom_uv_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.title
  }, _ctx.title ? {
    b: common_vendor.t(_ctx.title),
    c: common_vendor.p({
      name: "close",
      size: "17",
      color: "#c8c9cc",
      bold: true
    }),
    d: common_vendor.o((...args) => $options.cancel && $options.cancel(...args))
  } : {}, {
    e: _ctx.description
  }, _ctx.description ? {
    f: common_vendor.t(_ctx.description),
    g: common_vendor.s({
      marginTop: `${_ctx.title && _ctx.description ? 0 : "18px"}`
    })
  } : {}, {
    h: _ctx.description
  }, _ctx.description ? {} : {}, {
    i: common_vendor.f(_ctx.actions, (item, index, i0) => {
      return common_vendor.e({
        a: !item.loading
      }, !item.loading ? common_vendor.e({
        b: common_vendor.t(item.name),
        c: common_vendor.s($options.itemStyle(index)),
        d: item.subname
      }, item.subname ? {
        e: common_vendor.t(item.subname)
      } : {}) : {
        f: "39528ed0-3-" + i0 + ",39528ed0-0",
        g: common_vendor.p({
          ["custom-class"]: "van-action-sheet__loading",
          size: "18",
          mode: "circle"
        })
      }, {
        h: common_vendor.o(($event) => $options.selectHandler(index), index),
        i: !item.disabled && !item.loading ? "uv-action-sheet--hover" : "",
        j: item.openType,
        k: common_vendor.o((...args) => _ctx.onGetUserInfo && _ctx.onGetUserInfo(...args), index),
        l: common_vendor.o((...args) => _ctx.onContact && _ctx.onContact(...args), index),
        m: common_vendor.o((...args) => _ctx.onGetPhoneNumber && _ctx.onGetPhoneNumber(...args), index),
        n: common_vendor.o((...args) => _ctx.onError && _ctx.onError(...args), index),
        o: common_vendor.o((...args) => _ctx.onLaunchApp && _ctx.onLaunchApp(...args), index),
        p: common_vendor.o((...args) => _ctx.onOpenSetting && _ctx.onOpenSetting(...args), index),
        q: common_vendor.o(($event) => $options.selectHandler(index), index),
        r: !item.disabled && !item.loading ? "uv-action-sheet--hover" : "",
        s: index !== _ctx.actions.length - 1
      }, index !== _ctx.actions.length - 1 ? {
        t: "39528ed0-4-" + i0 + ",39528ed0-0"
      } : {}, {
        v: index
      });
    }),
    j: _ctx.lang,
    k: _ctx.sessionFrom,
    l: _ctx.sendMessageTitle,
    m: _ctx.sendMessagePath,
    n: _ctx.sendMessageImg,
    o: _ctx.showMessageCard,
    p: _ctx.appParameter,
    q: _ctx.cancelText
  }, _ctx.cancelText ? {
    r: common_vendor.p({
      bgColor: "#eaeaec",
      height: "6"
    })
  } : {}, {
    s: _ctx.cancelText
  }, _ctx.cancelText ? {
    t: common_vendor.t(_ctx.cancelText),
    v: common_vendor.o(() => {
    }),
    w: common_vendor.o((...args) => $options.cancel && $options.cancel(...args))
  } : {}, {
    x: common_vendor.sr("popup", "39528ed0-0"),
    y: common_vendor.o($options.popupChange),
    z: common_vendor.p({
      mode: "bottom",
      safeAreaInsetBottom: _ctx.safeAreaInsetBottom,
      round: _ctx.round,
      ["close-on-click-overlay"]: _ctx.closeOnClickOverlay
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-39528ed0"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.vue"]]);
wx.createComponent(Component);
