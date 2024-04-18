"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 宫格的name
    name: {
      type: [String, Number, null],
      default: null
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "transparent"
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.gridItem
  }
};
exports.props = props;
