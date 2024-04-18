"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 背景颜色（默认transparent）
    bgColor: {
      type: String,
      default: "transparent"
    },
    // 分割槽高度，单位px（默认20）
    height: {
      type: [String, Number],
      default: 20
    },
    // 与上一个组件的距离
    marginTop: {
      type: [String, Number],
      default: 0
    },
    // 与下一个组件的距离
    marginBottom: {
      type: [String, Number],
      default: 0
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.gap
  }
};
exports.props = props;
