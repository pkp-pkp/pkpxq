"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 分组标题
    title: {
      type: String,
      default: ""
    },
    // 是否显示外边框
    border: {
      type: Boolean,
      default: true
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.cellGroup
  }
};
exports.props = props;
