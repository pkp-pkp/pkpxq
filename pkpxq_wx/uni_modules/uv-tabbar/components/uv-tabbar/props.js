"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 当前匹配项的name
    value: {
      type: [String, Number, null],
      default: null
    },
    // 是否为iPhoneX留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    // 是否显示上方边框
    border: {
      type: Boolean,
      default: true
    },
    // 元素层级z-index
    zIndex: {
      type: [String, Number],
      default: 9
    },
    // 选中标签的颜色
    activeColor: {
      type: String,
      default: "#1989fa"
    },
    // 未选中标签的颜色
    inactiveColor: {
      type: String,
      default: "#7d7e80"
    },
    // 是否固定在底部
    fixed: {
      type: Boolean,
      default: true
    },
    // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
    placeholder: {
      type: Boolean,
      default: true
    },
    // 图标大小
    iconSize: {
      type: [String, Number],
      default: 20
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.tabbar
  }
};
exports.props = props;
