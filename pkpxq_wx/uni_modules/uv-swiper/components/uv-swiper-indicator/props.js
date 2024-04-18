"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 轮播的长度
    length: {
      type: [String, Number],
      default: 0
    },
    // 当前处于活动状态的轮播的索引
    current: {
      type: [String, Number],
      default: 0
    },
    // 指示器非激活颜色
    indicatorActiveColor: {
      type: String,
      default: ""
    },
    // 指示器的激活颜色
    indicatorInactiveColor: {
      type: String,
      default: ""
    },
    // 指示器模式，line-线型，dot-点型
    indicatorMode: {
      type: String,
      default: ""
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.swiperIndicator
  }
};
exports.props = props;
