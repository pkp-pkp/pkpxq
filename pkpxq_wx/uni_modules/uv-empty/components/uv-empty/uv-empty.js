"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvEmpty_components_uvEmpty_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-empty",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvEmpty_components_uvEmpty_props.props],
  data() {
    return {
      icons: {
        car: "购物车为空",
        page: "页面不存在",
        search: "没有搜索结果",
        address: "没有收货地址",
        "wifi-off": "没有WiFi",
        order: "订单为空",
        coupon: "没有优惠券",
        favor: "暂无收藏",
        permission: "无权限",
        history: "无历史记录",
        news: "无新闻列表",
        message: "消息列表为空",
        list: "列表为空",
        data: "数据为空",
        comment: "暂无评论"
      }
    };
  },
  computed: {
    // 组件样式
    emptyStyle() {
      const style = {};
      style.marginTop = this.$uv.addUnit(this.marginTop);
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    },
    // 文本样式
    textStyle() {
      const style = {};
      style.color = this.textColor;
      style.fontSize = this.$uv.addUnit(this.textSize);
      return style;
    },
    // 判断icon是否图片路径
    isImg() {
      const isBase64 = this.icon.indexOf("data:") > -1 && this.icon.indexOf("base64") > -1;
      return this.icon.indexOf("/") !== -1 || isBase64;
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  _easycom_uv_icon2();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  _easycom_uv_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.show
  }, _ctx.show ? common_vendor.e({
    b: !$options.isImg
  }, !$options.isImg ? {
    c: common_vendor.p({
      name: _ctx.mode === "message" ? "chat" : `empty-${_ctx.mode}`,
      size: _ctx.iconSize,
      color: _ctx.iconColor,
      ["margin-top"]: "14"
    })
  } : {
    d: _ctx.$uv.addUnit(_ctx.width),
    e: _ctx.$uv.addUnit(_ctx.height),
    f: _ctx.icon
  }, {
    g: common_vendor.t(_ctx.text ? _ctx.text : $data.icons[_ctx.mode]),
    h: common_vendor.s($options.textStyle),
    i: common_vendor.s($options.emptyStyle)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6efcec67"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-empty/components/uv-empty/uv-empty.vue"]]);
wx.createComponent(Component);
