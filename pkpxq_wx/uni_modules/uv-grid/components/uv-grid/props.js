"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 分成几列
    col: {
      type: [String, Number],
      default: 3
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    // 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
    align: {
      type: String,
      default: "left"
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.grid
  }
};
exports.props = props;
