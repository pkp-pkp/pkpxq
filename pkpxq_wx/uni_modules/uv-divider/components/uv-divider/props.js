"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 是否虚线
    dashed: {
      type: Boolean,
      default: false
    },
    // 是否细线
    hairline: {
      type: Boolean,
      default: true
    },
    // 是否以点替代文字，优先于text字段起作用
    dot: {
      type: Boolean,
      default: false
    },
    // 内容文本的位置，left-左边，center-中间，right-右边
    textPosition: {
      type: String,
      default: "center"
    },
    // 文本内容
    text: {
      type: [String, Number],
      default: ""
    },
    // 文本大小
    textSize: {
      type: [String, Number],
      default: 14
    },
    // 文本颜色
    textColor: {
      type: String,
      default: "#909399"
    },
    // 线条颜色
    lineColor: {
      type: String,
      default: "#dcdfe6"
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.divider
  }
};
exports.props = props;
